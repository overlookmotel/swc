//! Plugin support.
//!
//! We need to replace operations related to thread-local variables in
//! `swc_common`.
#![allow(unused)]

use core::{alloc::Layout, ptr::NonNull};
use std::{any::type_name, mem, str};

use anyhow::Error;
use bytecheck::CheckBytes;
use rkyv::{ser::Serializer, with::AsBox, Archive, ArchiveUnsized, Deserialize, Serialize};
use swc_atoms::{JsWord, JsWordStaticSet};

use crate::{syntax_pos::Mark, SyntaxContext};

pub trait WrappedSerializer {
    fn is_js_serializer(&self) -> bool;

    // TODO: Make this return a Result
    fn serialize_string(&mut self, word: &JsWord) -> u32;

    fn get_string_collection(&self) -> StringCollection;
}

pub struct StandardSerializer<S> {
    inner: S,
}

impl<S> StandardSerializer<S> {
    fn into_inner(self) -> S {
        self.inner
    }
}

impl<S> WrappedSerializer for StandardSerializer<S> {
    fn is_js_serializer(&self) -> bool {
        false
    }

    fn serialize_string(&mut self, word: &JsWord) -> u32 {
        unreachable!("serialize_string() on StandardSerializer")
    }

    fn get_string_collection(&self) -> StringCollection {
        unreachable!("get_string_collection() on StandardSerializer")
    }
}

impl<S: rkyv::Fallible> rkyv::Fallible for StandardSerializer<S> {
    type Error = S::Error;
}

impl<S: rkyv::ser::Serializer> rkyv::ser::Serializer for StandardSerializer<S> {
    #[inline]
    fn pos(&self) -> usize {
        self.inner.pos()
    }

    #[inline]
    fn write(&mut self, bytes: &[u8]) -> Result<(), S::Error> {
        self.inner.write(bytes)
    }

    #[inline]
    fn pad(&mut self, padding: usize) -> Result<(), Self::Error> {
        self.inner.pad(padding)
    }

    #[inline]
    fn align(&mut self, align: usize) -> Result<usize, Self::Error> {
        self.inner.align(align)
    }

    #[inline]
    fn align_for<T>(&mut self) -> Result<usize, Self::Error> {
        self.inner.align_for::<T>()
    }

    #[inline]
    unsafe fn resolve_aligned<T: Archive + ?Sized>(
        &mut self,
        value: &T,
        resolver: T::Resolver,
    ) -> Result<usize, Self::Error> {
        self.inner.resolve_aligned::<T>(value, resolver)
    }

    #[inline]
    unsafe fn resolve_unsized_aligned<T: ArchiveUnsized + ?Sized>(
        &mut self,
        value: &T,
        to: usize,
        metadata_resolver: T::MetadataResolver,
    ) -> Result<usize, Self::Error> {
        self.inner
            .resolve_unsized_aligned(value, to, metadata_resolver)
    }
}

impl<S: rkyv::ser::ScratchSpace> rkyv::ser::ScratchSpace for StandardSerializer<S> {
    #[inline]
    unsafe fn push_scratch(&mut self, layout: Layout) -> Result<NonNull<[u8]>, Self::Error> {
        self.inner.push_scratch(layout)
    }

    #[inline]
    unsafe fn pop_scratch(&mut self, ptr: NonNull<u8>, layout: Layout) -> Result<(), Self::Error> {
        self.inner.pop_scratch(ptr, layout)
    }
}

impl<S: rkyv::ser::SharedSerializeRegistry> rkyv::ser::SharedSerializeRegistry
    for StandardSerializer<S>
{
    #[inline]
    fn get_shared_ptr(&self, value: *const u8) -> Option<usize> {
        self.inner.get_shared_ptr(value)
    }

    #[inline]
    fn add_shared_ptr(&mut self, value: *const u8, pos: usize) -> Result<(), Self::Error> {
        self.inner.add_shared_ptr(value, pos)
    }
}

impl<S: Default> Default for StandardSerializer<S> {
    fn default() -> Self {
        Self {
            inner: S::default(),
        }
    }
}

// TODO Optimize for quoted strings - can return a flag for quotation
// and avoid encoding `x` and `'x'` separately.
// This will be really common - every string literal.

const STATIC_SLOT_EMPTY: u32 = u32::MAX;
const STATIC_SHIFT_BITS: usize = 32;
const DYNAMIC_TAG: u8 = 0b_00;
const INLINE_TAG: u8 = 0b_01; // len in upper nybble
const STATIC_TAG: u8 = 0b_10;
const TAG_MASK: u64 = 0b_11;
const LEN_OFFSET: u64 = 4;
const LEN_MASK: u64 = 0xf0;

const NB_DYNAMIC_BUCKETS: usize = 1 << 12; // 4096
const DYNAMIC_BUCKET_MASK: u32 = (1 << 12) - 1;

#[derive(Clone)]
struct LookupEntry {
    string: Box<str>,
    hash: u32,
    id: u32,
    next_in_bucket: Option<Box<LookupEntry>>,
}

#[derive(Archive, Deserialize, Serialize, Default)]
#[archive_attr(repr(C))]
pub struct StringCollection {
    buff: Vec<u16>,
    lengths: Vec<u32>,
}

pub struct StringCollectorSerializer<S> {
    inner: S,
    buff: Vec<u16>,
    lengths: Vec<u32>,
    static_lookup: Vec<u32>,
    dynamic_lookup: Vec<Option<Box<LookupEntry>>>,
    single_byte_lookup: Vec<u32>,
    next_id: u32,
}

impl<S> StringCollectorSerializer<S> {
    fn into_inner(self) -> S {
        self.inner
    }

    // TODO: Make this return a Result
    fn lookup_or_insert_string(&mut self, word: &JsWord) -> u32 {
        // Get hash and string
        let hash = word.get_hash();
        let bucket_index = (hash & DYNAMIC_BUCKET_MASK) as usize;
        let string: &str = word;

        // Look up if string encountered already. Return id if so.
        let mut ptr: Option<&mut Box<LookupEntry>> = self.dynamic_lookup[bucket_index].as_mut();
        while let Some(lookup_entry) = ptr.take() {
            if lookup_entry.hash == hash && *lookup_entry.string == *string {
                return lookup_entry.id;
            }
            ptr = lookup_entry.next_in_bucket.as_mut();
        }

        // Create new string in collector
        let id = self.insert_string(word as &str);

        // Add string to lookup table
        let string = string.to_owned();
        let lookup_entry = Box::new(LookupEntry {
            string: string.into_boxed_str(),
            hash,
            id,
            next_in_bucket: self.dynamic_lookup[bucket_index].take(),
        });
        self.dynamic_lookup[bucket_index] = Some(lookup_entry);

        id
    }

    // TODO: Make this return a Result
    fn insert_string(&mut self, string: &str) -> u32 {
        let mut len = 0;
        for c in string.encode_utf16() {
            self.buff.push(c);
            len += 1;
        }
        self.lengths.push(len);

        let id = self.next_id;
        assert!(id != STATIC_SLOT_EMPTY);
        self.next_id += 1;
        id
    }
}

impl<S: Default> Default for StringCollectorSerializer<S> {
    fn default() -> Self {
        use string_cache::StaticAtomSet;
        let num_static_strings = JsWordStaticSet::get().atoms.len();

        Self {
            inner: S::default(),
            buff: Vec::new(),
            lengths: Vec::new(),
            static_lookup: vec![STATIC_SLOT_EMPTY; num_static_strings],
            dynamic_lookup: vec![None; NB_DYNAMIC_BUCKETS],
            single_byte_lookup: vec![STATIC_SLOT_EMPTY; 256],
            next_id: 0,
        }
    }
}

impl<S> WrappedSerializer for StringCollectorSerializer<S> {
    fn is_js_serializer(&self) -> bool {
        true
    }

    fn serialize_string(&mut self, word: &JsWord) -> u32 {
        let data = word.unsafe_data();
        match (data & TAG_MASK) as u8 {
            STATIC_TAG => {
                let static_index: usize = (data >> STATIC_SHIFT_BITS).try_into().unwrap();

                let mut id = self.static_lookup[static_index];
                if id == STATIC_SLOT_EMPTY {
                    id = self.insert_string(word as &str);
                    self.static_lookup[static_index] = id;
                }
                id
            }
            DYNAMIC_TAG => self.lookup_or_insert_string(word),
            INLINE_TAG => {
                let len = (data & LEN_MASK) >> LEN_OFFSET;
                if (len == 1) {
                    // Fast path for single-byte strings.
                    // Single-byte strings in UTF8 are always an ASCII character.
                    let char_code = if cfg!(target_endian = "little") {
                        ((data & 0xff00) >> 8) as u8
                    } else {
                        (data & 0xff) as u8
                    };

                    let mut id = self.single_byte_lookup[char_code as usize];
                    if id == STATIC_SLOT_EMPTY {
                        self.buff.push(char_code as u16);
                        self.lengths.push(1);

                        id = self.next_id;
                        assert!(id != STATIC_SLOT_EMPTY);
                        self.single_byte_lookup[char_code as usize] = id;
                        self.next_id += 1;
                    }
                    id
                } else {
                    // TODO Use separate lookup table for inline strings
                    self.lookup_or_insert_string(word)
                }
            }
            _ => unreachable!("unexpected JsWord tag"),
        }
    }

    fn get_string_collection(&self) -> StringCollection {
        // TODO Avoid cloning
        StringCollection {
            buff: self.buff.clone(),
            lengths: self.lengths.clone(),
        }
    }
}

impl<S: rkyv::Fallible> rkyv::Fallible for StringCollectorSerializer<S> {
    type Error = S::Error;
}

impl<S: rkyv::ser::Serializer> rkyv::ser::Serializer for StringCollectorSerializer<S> {
    #[inline]
    fn pos(&self) -> usize {
        self.inner.pos()
    }

    #[inline]
    fn write(&mut self, bytes: &[u8]) -> Result<(), S::Error> {
        self.inner.write(bytes)
    }

    #[inline]
    fn pad(&mut self, padding: usize) -> Result<(), Self::Error> {
        self.inner.pad(padding)
    }

    #[inline]
    fn align(&mut self, align: usize) -> Result<usize, Self::Error> {
        self.inner.align(align)
    }

    #[inline]
    fn align_for<T>(&mut self) -> Result<usize, Self::Error> {
        self.inner.align_for::<T>()
    }

    #[inline]
    unsafe fn resolve_aligned<T: Archive + ?Sized>(
        &mut self,
        value: &T,
        resolver: T::Resolver,
    ) -> Result<usize, Self::Error> {
        self.inner.resolve_aligned::<T>(value, resolver)
    }

    #[inline]
    unsafe fn resolve_unsized_aligned<T: ArchiveUnsized + ?Sized>(
        &mut self,
        value: &T,
        to: usize,
        metadata_resolver: T::MetadataResolver,
    ) -> Result<usize, Self::Error> {
        self.inner
            .resolve_unsized_aligned(value, to, metadata_resolver)
    }
}

impl<S: rkyv::ser::ScratchSpace> rkyv::ser::ScratchSpace for StringCollectorSerializer<S> {
    #[inline]
    unsafe fn push_scratch(&mut self, layout: Layout) -> Result<NonNull<[u8]>, Self::Error> {
        self.inner.push_scratch(layout)
    }

    #[inline]
    unsafe fn pop_scratch(&mut self, ptr: NonNull<u8>, layout: Layout) -> Result<(), Self::Error> {
        self.inner.pop_scratch(ptr, layout)
    }
}

impl<S: rkyv::ser::SharedSerializeRegistry> rkyv::ser::SharedSerializeRegistry
    for StringCollectorSerializer<S>
{
    #[inline]
    fn get_shared_ptr(&self, value: *const u8) -> Option<usize> {
        self.inner.get_shared_ptr(value)
    }

    #[inline]
    fn add_shared_ptr(&mut self, value: *const u8, pos: usize) -> Result<(), Self::Error> {
        self.inner.add_shared_ptr(value, pos)
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
#[non_exhaustive]
#[cfg_attr(
    feature = "plugin-base",
    derive(rkyv::Archive, rkyv::Serialize, rkyv::Deserialize)
)]
#[cfg_attr(
    feature = "plugin-base",
    archive_attr(repr(u32), derive(bytecheck::CheckBytes))
)]
/// Enum for possible errors while running transform via plugin.
/// This error indicates internal operation failure either in plugin_runner
/// or plugin_macro. Plugin's transform fn itself does not allow to return
/// error - instead it should use provided `handler` to emit corresponding error
/// to the host.
pub enum PluginError {
    /// Occurs when failed to convert size passed from host / guest into usize
    /// or similar for the conversion. This is an internal error rasied via
    /// plugin_macro, normally plugin author should not raise this manually.
    SizeInteropFailure(String),
    /// Occurs when failed to reconstruct a struct from `Serialized`.
    Deserialize(String),
    /// Occurs when failed to serialize a struct into `Serialized`.
    /// Unlike deserialize error, this error cannot forward any context for the
    /// raw bytes: when serialize failed, there's nothing we can pass between
    /// runtime.
    Serialize(String),
}

/// Wraps internal representation of serialized data for exchanging data between
/// plugin to the host. Consumers should not rely on specific details of byte
/// format struct contains: it is strict implementation detail which can
/// change anytime.
pub struct PluginSerializedBytes {
    pub(crate) field: rkyv::AlignedVec,
}

#[cfg(feature = "plugin-base")]
impl PluginSerializedBytes {
    /**
     * Constructs an instance from already serialized byte
     * slices.
     */
    pub fn from_slice(bytes: &[u8]) -> PluginSerializedBytes {
        let mut field = rkyv::AlignedVec::new();
        field.extend_from_slice(bytes);
        PluginSerializedBytes { field }
    }

    /**
     * Constructs an instance from versioned struct by serializing it.
     *
     * This is sort of mimic TryFrom behavior, since we can't use generic
     * to implement TryFrom trait
     */
    pub fn try_serialize<W>(t: &VersionedSerializable<W>) -> Result<Self, Error>
    where
        W: rkyv::Serialize<
            StandardSerializer<
                rkyv::ser::serializers::CompositeSerializer<
                    rkyv::ser::serializers::AlignedSerializer<rkyv::AlignedVec>,
                    rkyv::ser::serializers::FallbackScratch<
                        rkyv::ser::serializers::HeapScratch<512_usize>,
                        rkyv::ser::serializers::AllocScratch,
                    >,
                    rkyv::ser::serializers::SharedSerializeMap,
                >,
            >,
        >,
    {
        let mut serializer =
            StandardSerializer::<rkyv::ser::serializers::AllocSerializer<512>>::default();
        serializer.serialize_value(t).map_err(|err| match err {
            rkyv::ser::serializers::CompositeSerializerError::SerializerError(e) => e.into(),
            rkyv::ser::serializers::CompositeSerializerError::ScratchSpaceError(e) => {
                Error::msg("AllocScratchError")
            }
            rkyv::ser::serializers::CompositeSerializerError::SharedError(e) => {
                Error::msg("SharedSerializeMapError")
            }
        })?;

        let bytes = serializer.into_inner().into_serializer().into_inner();
        Ok(PluginSerializedBytes { field: bytes })
    }

    pub fn try_serialize_for_js<W>(t: &W) -> Result<Self, Error>
    where
        W: rkyv::Serialize<
            StringCollectorSerializer<
                rkyv::ser::serializers::CompositeSerializer<
                    rkyv::ser::serializers::AlignedSerializer<rkyv::AlignedVec>,
                    rkyv::ser::serializers::FallbackScratch<
                        rkyv::ser::serializers::HeapScratch<512_usize>,
                        rkyv::ser::serializers::AllocScratch,
                    >,
                    rkyv::ser::serializers::SharedSerializeMap,
                >,
            >,
        >,
    {
        let mut serializer =
            StringCollectorSerializer::<rkyv::ser::serializers::AllocSerializer<512>>::default();
        serializer.serialize_value(t).map_err(|err| match err {
            rkyv::ser::serializers::CompositeSerializerError::SerializerError(e) => e.into(),
            rkyv::ser::serializers::CompositeSerializerError::ScratchSpaceError(e) => {
                Error::msg("AllocScratchError")
            }
            rkyv::ser::serializers::CompositeSerializerError::SharedError(e) => {
                Error::msg("SharedSerializeMapError")
            }
        })?;

        let bytes = serializer.into_inner().into_serializer().into_inner();
        Ok(PluginSerializedBytes { field: bytes })
    }

    /*
     * Internal fn to constructs an instance from raw bytes ptr.
     */
    fn from_raw_ptr(
        raw_allocated_ptr: *const u8,
        raw_allocated_ptr_len: usize,
    ) -> PluginSerializedBytes {
        let raw_ptr_bytes =
            unsafe { std::slice::from_raw_parts(raw_allocated_ptr, raw_allocated_ptr_len) };

        PluginSerializedBytes::from_slice(raw_ptr_bytes)
    }

    pub fn as_slice(&self) -> &[u8] {
        self.field.as_slice()
    }

    pub fn as_ptr(&self) -> (*const u8, usize) {
        (self.field.as_ptr(), self.field.len())
    }

    pub fn deserialize<W>(&self) -> Result<VersionedSerializable<W>, Error>
    where
        W: rkyv::Archive,
        W::Archived: rkyv::Deserialize<W, rkyv::de::deserializers::SharedDeserializeMap>,
    {
        use anyhow::Context;
        use rkyv::Deserialize;

        let archived = unsafe { rkyv::archived_root::<VersionedSerializable<W>>(&self.field[..]) };

        archived
            .deserialize(&mut rkyv::de::deserializers::SharedDeserializeMap::new())
            .with_context(|| format!("failed to deserialize `{}`", type_name::<W>()))
    }
}

/// Simple wrapper around constructing PluginSerializedBytes from raw
/// ptr to call deserialize to support common workflow on both of runtime
/// (host / plugin) to instantiate a struct from allocated / copied ptr.
///
/// # Safety
/// This is naturally unsafe by constructing bytes slice from raw ptr.
pub unsafe fn deserialize_from_ptr<W>(
    raw_allocated_ptr: *const u8,
    raw_allocated_ptr_len: i32,
) -> Result<VersionedSerializable<W>, Error>
where
    W: rkyv::Archive,
    W::Archived: rkyv::Deserialize<W, rkyv::de::deserializers::SharedDeserializeMap>,
{
    let serialized =
        PluginSerializedBytes::from_raw_ptr(raw_allocated_ptr, raw_allocated_ptr_len as usize);

    serialized.deserialize()
}

/// Deserialize `Fallible` struct from raw ptr. This is similar to
/// `deserialize_from_ptr` but for the struct requires bounds to the
/// SharedSerializeRegistry which cannot be Infallible. Internally this does
/// not call deserialize with Infallible deserializer, use
/// SharedDeserializeMap instead.
///
/// # Safety
/// This is unsafe by construting bytes slice from raw ptr also deserialize
/// it without slice bound check.
pub unsafe fn deserialize_from_ptr_into_fallible<W>(
    raw_allocated_ptr: *const u8,
    raw_allocated_ptr_len: i32,
) -> Result<VersionedSerializable<W>, Error>
where
    W: rkyv::Archive,
    W::Archived: rkyv::Deserialize<W, rkyv::de::deserializers::SharedDeserializeMap>,
{
    let serialized =
        PluginSerializedBytes::from_raw_ptr(raw_allocated_ptr, raw_allocated_ptr_len as usize);

    unsafe {
        rkyv::from_bytes_unchecked(&serialized.field)
            .map_err(|err| Error::msg("Failed to deserialize given ptr"))
    }
}

/// A wrapper type for the structures to be passed into plugins
/// serializes the contained value out-of-line so that newer
/// versions can be viewed as the older version.
///
/// First field indicate version of struct type (schema). Any consumers like
/// swc_plugin_macro can use this to validate compatiblility before attempt to
/// serialize.
#[derive(Archive, Deserialize, Serialize)]
#[repr(transparent)]
#[archive_attr(repr(transparent), derive(CheckBytes))]
pub struct VersionedSerializable<T>(#[with(AsBox)] (u32, T));

impl<T> VersionedSerializable<T> {
    pub fn new(value: T) -> Self {
        // TODO: we'll add compile time flag to augment schema version.
        // User should not try to set version by themselves.
        VersionedSerializable((1, value))
    }

    pub fn version(&self) -> u32 {
        self.0 .0
    }

    pub fn inner(&self) -> &T {
        &self.0 .1
    }

    pub fn into_inner(self) -> T {
        self.0 .1
    }
}

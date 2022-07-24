use std::{num::NonZeroU64, ptr::NonNull, sync::atomic::AtomicIsize};

const HOMELESS_TAG: u8 = 0;
const STATIC_TAG: u8 = 6;
const DYNAMIC_TAG: u8 = 7;
const LENGTH_MASK: u64 = 0b_111; // 3 lowest bits
const PREFIX_MASK: u64 = 0b_1000; // 4th bit
const POSTFIX_MASK: u64 = (1 << 24) - 1 - 0b_1111; // 20 bit - top 4 bits of bytes 0 and bytes 1+2
const NO_POSTFIX: u64 = POSTFIX_MASK;
const NON_POSTFIX_MASK: u64 = (1 << 64) - 1 - POSTFIX_MASK;
const POSTFIX_SHIFT_BITS: usize = 4;
const MAX_POSTFIX: u32 = (1 << 20) - 2; // `-2` because highest value reserved for `NO_POSTFIX`
const PTR_MASK: u64 = (1 << 64) - (1 << 24); // 40 bit - bytes 3-7
const PTR_ZERO_BIT_MASK: usize = 0b11; // Pointers should be aligned on 4 bytes
const PTR_SHIFT_BITS: usize = 22; // 24 bits minus 2 which should always be zero
const MAX_PTR: u64 = (1 << 42) - 1; // 4 TiB

const MAX_INLINE_LEN: usize = 5;
const INLINE_LITTLE_ENDIAN_OFFSET: usize = 3;
const STATIC_SHIFT_BITS: usize = 32;

const NB_BUCKETS: usize = 1 << 12; // 4096
const BUCKET_MASK: u32 = (1 << 12) - 1;

struct DynamicEntry {
    string: Box<str>,
    hash: u32,
    next_in_bucket: Option<Box<DynamicEntry>>,
}

struct HomelessEntry {
    string: Box<Str>,
}

impl HomelessEntry {
    fn new(string: &str) -> Self {
        Self {
            string: Box::new(*string),
        }
    }
}

pub struct StaticSet;

// This would be created by codegen for static strings
impl StaticSet {
    fn get() -> &'static PhfStrSet {
        static SET: PhfStrSet = PhfStrSet {
            key: 0,
            disps: &[(0, 0)],
            atoms: &[""],
            // "" SipHash'd, and xored with u64_hash_to_u32.
            hashes: &[0x3ddddef3],
        };
        &SET
    }

    fn empty_string_index() -> u32 {
        0
    }
}

pub struct PhfStrSet {
    #[doc(hidden)]
    pub key: u64,
    #[doc(hidden)]
    pub disps: &'static [(u32, u32)],
    #[doc(hidden)]
    pub atoms: &'static [&'static str],
    #[doc(hidden)]
    pub hashes: &'static [u32],
}

struct DynamicSet {
    buckets: Box<[Option<Box<DynamicEntry>>; NB_BUCKETS]>,
}

pub struct JsWord {
    unsafe_data: NonZeroU64,
}

impl JsWord {
    pub fn new_from_str(string: &str, dynamic_set: Option<DynamicSet>) -> Self {
        let static_set = StaticSet::get();
        let hash = phf_shared::hash(&*string_to_add, &static_set.key);
        let mut static_index =
            phf_shared::get_index(&hash, static_set.disps, static_set.atoms.len());

        let mut data = if static_set.atoms[index as usize] == string_to_add {
            // Static string
            // Safety: Cannot be zero due to STATIC_TAG
            debug_assert!(STATIC_TAG != 0);
            (static_index << STATIC_SHIFT_BITS) | (STATIC_TAG as u64)
        } else {
            let len = string.len();

            if len <= MAX_INLINE_LEN {
                // Zero-length string is always static
                debug_assert!(len > 0);

                let mut data = len as u64;
                {
                    let dest = inline_atom_slice_mut(&mut data);
                    dest[..len].copy_from_slice(string_to_add.as_bytes())
                }
                // Safety: `data` cannot be zero because length is non-zero
                data
            } else {
                match dynamic_set {
                    Some(dynamic_set) => {
                        let ptr: std::ptr::NonNull<Entry> =
                            dynamic_set.insert(string_to_add, hash.g);
                        // Safety: Cannot be zero because pointer is non-null
                        pointer_to_data(ptr.as_ptr()) | (DYNAMIC_TAG as u64)
                    }
                    None => {
                        // TODO Do we need to explicitly put `HomelessEntry` on the heap?
                        let entry = *Box::new(HomelessEntry::new(string));
                        let ptr = NonNull::from(&mut *entry);
                        // Safety: Cannot be zero because pointer is non-null
                        debug_assert!(HOMELESS_TAG == 0);
                        pointer_to_data(ptr.as_ptr())
                    }
                }
            }
        };

        unsafe { Self::from_unsafe_data(data | NO_POSTFIX) }
    }

    pub fn with_prefix(&self) -> Self {
        let data = self.unsafe_data();
        assert(data & PREFIX_MASK == 0);
        // Safety: `data` cannot be zero because `self.unsafe_data` cannot be zero
        unsafe { Self::from_unsafe_data(data | PREFIX_MASK) }
    }

    pub fn with_postfix(&self, postfix: u32) -> Self {
        assert(postfix <= MAX_POSTFIX);

        // Safety: `data` cannot be zero because `self.unsafe_data` cannot be zero
        unsafe {
            Self::from_unsafe_data(
                (self.unsafe_data() & NON_POSTFIX_MASK) | (postfix << POSTFIX_SHIFT_BITS),
            )
        }
    }

    #[inline(always)]
    pub const fn pack_static(static_index: u32) -> Self {
        unsafe {
            Self::from_unsafe_data(
                (STATIC_TAG as u64) | NO_POSTFIX | ((static_index as u64) << STATIC_SHIFT_BITS),
            )
        }
    }

    #[inline(always)]
    fn unsafe_data(&self) -> u64 {
        self.unsafe_data.get()
    }

    // Length only actually represents length if between 1 and 5.
    // 0, 6 or 7 indicates homeless, static or dynamic.
    #[inline(always)]
    fn len(&self) -> u8 {
        (self.unsafe_data() & LENGTH_MASK) as u8
    }

    #[inline(always)]
    fn ptr(&self) -> u64 {
        (self.unsafe_data() & PTR_MASK) >> PTR_SHIFT_BITS
    }

    #[inline(always)]
    fn static_index(&self) -> u32 {
        (self.unsafe_data() >> STATIC_SHIFT_BITS) as u32
    }

    #[inline(always)]
    fn add_prefix_and_postfix(&self, string: &str) -> &str {
        let mut string = string;
        if (self.unsafe_data() & PREFIX_MASK == PREFIX_MASK) {
            string = "_".to_owned() + string.to_owned();
        }

        let postfix_data = self.unsafe_data() & POSTFIX_MASK;
        if (postfix_data != NO_POSTFIX) {
            string.to_owned() + format!("{}", postfix_data >> POSTFIX_SHIFT_BITS)
        }
        string
    }

    // Caller must ensure `data` is not zero
    #[inline(always)]
    unsafe fn from_unsafe_data(data: u64) {
        Self {
            unsafe_data: NonZeroU64::new_unchecked(data),
        }
    }
}

impl ops::Deref for JsWord {
    type Target = str;

    #[inline]
    fn deref(&self) -> &str {
        let len = self.len();

        if (len == STATIC_TAG) {
            StaticSet::get().atoms[self.static_index() as usize]
        } else {
            let string = match self.len() {
                DYNAMIC_TAG => {
                    let entry = self.ptr() as *const DynamicEntry;
                    &(*entry).string
                }
                HOMELESS_TAG => {
                    let entry = self.ptr() as *const HomelessEntry;
                    &(*entry).string
                }
                len => {
                    // Inline string
                    debug_assert!(len > 0 && len <= MAX_INLINE_LEN);
                    let src = inline_atom_slice(&self.unsafe_data);
                    str::from_utf8_unchecked(&src[..(len as usize)])
                }
            };

            self.add_prefix_and_postfix(string)
        }
    }
}

impl Drop for JsWord {
    #[inline]
    fn drop(&mut self) {
        if self.len() == HOMELESS_TAG {
            let entry = self.ptr() as *const HomelessEntry;
            entry.drop();
        }
    }
}

#[inline(always)]
fn pointer_to_data(ptr_address: usize) -> u64 {
    if (mem::sizeof::<usize>() > 5) {
        assert!((ptr_address as u64) <= MAX_PTR);
    }
    debug_assert!(ptr_address != 0);
    debug_assert!((ptr_address & PTR_ZERO_BIT_MASK) == 0);
    (ptr_address as u64) << PTR_SHIFT_BITS
}

#[inline(always)]
fn inline_atom_slice(x: &NonZeroU64) -> &[u8] {
    unsafe {
        let x: *const NonZeroU64 = x;
        let mut data = x as *const u8;
        // All except the lowest bytes, which are first in little-endian, last in
        // big-endian.
        if cfg!(target_endian = "little") {
            data = data.offset(INLINE_LITTLE_ENDIAN_OFFSET);
        }
        slice::from_raw_parts(data, MAX_INLINE_LEN)
    }
}

#[inline(always)]
fn inline_atom_slice_mut(x: &mut u64) -> &mut [u8] {
    unsafe {
        let x: *mut u64 = x;
        let mut data = x as *mut u8;
        // All except the lowest bytes, which are first in little-endian, last in
        // big-endian.
        if cfg!(target_endian = "little") {
            data = data.offset(INLINE_LITTLE_ENDIAN_OFFSET);
        }
        slice::from_raw_parts_mut(data, MAX_INLINE_LEN)
    }
}

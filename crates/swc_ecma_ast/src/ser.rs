use std::{borrow::BorrowMut, collections::HashMap, mem};

pub use ser::AstSerializer;
use ser_raw::{
    impl_pos_tracking_serializer, impl_ptr_serializer, impl_pure_copy_serializer,
    pos::PosMapping,
    storage::{aligned_max_u32_capacity, AlignedVec, ContiguousStorage, Storage, UnalignedVec},
    util::is_aligned_to,
    PosTrackingSerializer, PtrSerializer, PureCopySerializer, Serialize, Serializer,
    SerializerStorage, SerializerWrite,
};
use swc_atoms::JsWord;

// On 64-bit systems, alignments are all 8
const OUTPUT_ALIGNMENT: usize = mem::align_of::<u64>();
const VALUE_ALIGNMENT: usize = mem::align_of::<usize>();
const MAX_VALUE_ALIGNMENT: usize = mem::align_of::<u64>();
const MAX_CAPACITY: usize = aligned_max_u32_capacity(OUTPUT_ALIGNMENT);

type AlignedStorage =
    AlignedVec<OUTPUT_ALIGNMENT, VALUE_ALIGNMENT, MAX_VALUE_ALIGNMENT, MAX_CAPACITY>;

macro_rules! impl_pure_serializer {
    ($ty:tt, $storage:ty) => {
        impl<BorrowedStorage: BorrowMut<$storage>> PureCopySerializer for $ty<BorrowedStorage> {}
        impl_pure_copy_serializer!($ty<BorrowedStorage> where BorrowedStorage: BorrowMut<$storage>);

        impl_serializer_store!($ty, $storage);
        impl_serializer_write!($ty, $storage);
    };
}

macro_rules! impl_serializer_store {
    ($ty:tt, $storage:ty) => {
        impl<BorrowedStorage: BorrowMut<$storage>> SerializerStorage for $ty<BorrowedStorage> {
            type BorrowedStorage = BorrowedStorage;
            type Storage = $storage;

            fn storage(&self) -> &$storage {
                self.storage.borrow()
            }

            fn storage_mut(&mut self) -> &mut $storage {
                self.storage.borrow_mut()
            }

            fn into_storage(self) -> BorrowedStorage {
                self.storage
            }
        }
    };
}

macro_rules! impl_serializer_write {
    ($ty:tt, $storage:ty) => {
        impl<BorrowedStorage: BorrowMut<$storage>> SerializerWrite for $ty<BorrowedStorage> {}
    };
}

/// Aligned serializer which stores string content + lengths on end of output.
pub struct AlignedSerializerFastStrings<BorrowedStorage: BorrowMut<AlignedStorage>> {
    storage: BorrowedStorage,
    string_lengths: Vec<u32>,
    string_data: Vec<u8>,
}

impl<BorrowedStorage> AlignedSerializerFastStrings<BorrowedStorage>
where
    BorrowedStorage: BorrowMut<AlignedStorage>,
{
    pub fn serialize<T: Serialize<Self>>(
        t: &T,
        mut storage: BorrowedStorage,
        num_strings: usize,
        string_data_len: usize,
    ) {
        // Reserve space for pointer to strings + len (as `u32`s).
        // `align_for` should be a no-op as will be aligned to `VALUE_ALIGNMENT` anyway.
        storage.borrow_mut().align_for::<[u32; 2]>();
        let metadata_pos = storage.borrow().len();
        storage.borrow_mut().push_empty::<[u32; 2]>();

        let mut serializer = Self {
            storage,
            string_lengths: Vec::with_capacity(num_strings),
            string_data: Vec::with_capacity(string_data_len),
        };
        serializer.serialize_value(t);

        let Self {
            mut storage,
            string_lengths,
            string_data,
        } = serializer;
        let storage = storage.borrow_mut();

        // Get position we're writing string lengths at
        storage.align_for::<u32>(); // Should be a no-op because will be aligned to `VALUE_ALIGNMENT` anyway
        let pos = storage.len();

        // Write string lengths + data
        storage.push_slice(&string_lengths);
        storage.push_bytes(&string_data);

        unsafe {
            // Write position of string length data + number of strings at start
            // of buffer (each as a `u32`)
            storage.write(&[pos as u32, string_lengths.len() as u32], metadata_pos);
        }
    }
}

impl<BorrowedStorage> AstSerializer for AlignedSerializerFastStrings<BorrowedStorage>
where
    BorrowedStorage: BorrowMut<AlignedStorage>,
{
    #[inline]
    fn serialize_js_word(&mut self, js_word: &JsWord) {
        // `JsWord` can be static, inline or dynamic.
        // The first 2 representations are self-contained,
        // so only need to add string to output if it's dynamic.
        if js_word.is_dynamic() {
            let index = self.string_lengths.len();
            self.string_lengths.push(js_word.len() as u32);
            self.string_data.extend_from_slice(js_word.as_bytes());
            self.push_raw(&index);
        }
    }
}

impl_pure_serializer!(AlignedSerializerFastStrings, AlignedStorage);

/// Aligned serializer which stores string content on end of output and pos+len
/// inline.
pub struct AlignedSerializerFastStringsShorter<BorrowedStorage: BorrowMut<AlignedStorage>> {
    storage: BorrowedStorage,
    string_data: Vec<u8>,
}

impl<BorrowedStorage> AlignedSerializerFastStringsShorter<BorrowedStorage>
where
    BorrowedStorage: BorrowMut<AlignedStorage>,
{
    pub fn serialize<T: Serialize<Self>>(
        t: &T,
        mut storage: BorrowedStorage,
        string_data_len: usize,
    ) {
        // Reserve space for pointer to strings + len (as `u32`s).
        // `align_for` should be a no-op as will be aligned to `VALUE_ALIGNMENT` anyway.
        storage.borrow_mut().align_for::<[u32; 2]>();
        let metadata_pos = storage.borrow().len();
        storage.borrow_mut().push_empty::<[u32; 2]>();

        let mut serializer = Self {
            storage,
            string_data: Vec::with_capacity(string_data_len),
        };
        serializer.serialize_value(t);

        let Self {
            mut storage,
            string_data,
        } = serializer;
        let storage = storage.borrow_mut();

        // Get position we're writing string content at
        let pos = storage.len();

        // Write string lengths + data
        storage.push_bytes(&string_data);

        unsafe {
            // Write position and length of string data at start of buffer (each as a `u32`)
            storage.write(&[pos as u32, string_data.len() as u32], metadata_pos);
        }
    }
}

impl<BorrowedStorage> AstSerializer for AlignedSerializerFastStringsShorter<BorrowedStorage>
where
    BorrowedStorage: BorrowMut<AlignedStorage>,
{
    #[inline]
    fn serialize_js_word(&mut self, js_word: &JsWord) {
        // `JsWord` can be static, inline or dynamic.
        // The first 2 representations are self-contained,
        // so only need to add string to output if it's dynamic.
        if js_word.is_dynamic() {
            let str_bytes = js_word.as_bytes();
            // Record position of this string in `string_data` + string length
            // Don't need to worry about overflow of `u32`. It can happen if a string is
            // longer than `u32::MAX`, but will cause an error at end of
            // serialization as will exceed max capacity of storage.
            self.push_raw(&[self.string_data.len() as u32, str_bytes.len() as u32]);
            self.string_data.extend_from_slice(str_bytes);
        }
    }
}

impl_pure_serializer!(AlignedSerializerFastStringsShorter, AlignedStorage);

/// Aligned serializer which stores strings on end of output with deduplication
/// of strings which are repeated more than once.
pub struct AlignedSerializerFastStringsDeduped<BorrowedStorage: BorrowMut<AlignedStorage>> {
    storage: BorrowedStorage,
    string_lengths: Vec<u32>,
    string_data: Vec<u8>,
    string_lookup: HashMap<&'static JsWord, u32>,
}

impl<BorrowedStorage> AlignedSerializerFastStringsDeduped<BorrowedStorage>
where
    BorrowedStorage: BorrowMut<AlignedStorage>,
{
    pub fn serialize<T: Serialize<Self>>(
        t: &T,
        mut storage: BorrowedStorage,
        num_strings: usize,
        string_data_len: usize,
    ) {
        // Reserve space for pointer to strings + len (as `u32`s).
        // `align_for` should be a no-op as will be aligned to `VALUE_ALIGNMENT` anyway.
        storage.borrow_mut().align_for::<[u32; 2]>();
        let metadata_pos = storage.borrow().len();
        storage.borrow_mut().push_empty::<[u32; 2]>();

        let mut serializer = Self {
            storage,
            string_lengths: Vec::with_capacity(num_strings),
            string_data: Vec::with_capacity(string_data_len),
            string_lookup: HashMap::with_capacity(num_strings),
        };
        serializer.serialize_value(t);

        let Self {
            mut storage,
            string_lengths,
            string_data,
            ..
        } = serializer;
        let storage = storage.borrow_mut();

        // Get position we're writing string lengths at
        storage.align_for::<u32>(); // Should be a no-op because will be aligned to `VALUE_ALIGNMENT` anyway
        let pos = storage.len();

        // Write string lengths + data
        storage.push_slice(&string_lengths);
        storage.push_bytes(&string_data);

        unsafe {
            // Write position of string length data + number of strings at start
            // of buffer (each as a `u32`)
            storage.write(&[pos as u32, string_lengths.len() as u32], metadata_pos);
        }
    }
}

impl<BorrowedStorage> AstSerializer for AlignedSerializerFastStringsDeduped<BorrowedStorage>
where
    BorrowedStorage: BorrowMut<AlignedStorage>,
{
    #[inline]
    fn serialize_js_word(&mut self, js_word: &JsWord) {
        // `JsWord` can be static, inline or dynamic.
        // The first 2 representations are self-contained,
        // so only need to add string to output if it's dynamic.
        if js_word.is_dynamic() {
            let index = match self.string_lookup.get(js_word) {
                Some(index) => *index,
                None => {
                    let index = self.string_lengths.len() as u32;
                    self.string_lengths.push(js_word.len() as u32);
                    self.string_data.extend_from_slice(js_word.as_bytes());
                    // `js_word` isn't really `&'static`, but we know it'll live as long as the hash
                    // map because we have an immutable reference to the AST
                    // containing the JsWord, which means it can't be dropped.
                    // TODO: Find proper way to express this with lifetimes!
                    let js_word = unsafe { mem::transmute::<_, &'static JsWord>(js_word) };
                    self.string_lookup.insert(js_word, index);
                    index
                }
            };

            // Store as `usize` to avoid having to align buffer
            self.push_raw(&(index as usize));
        }
    }
}

impl_pure_serializer!(AlignedSerializerFastStringsDeduped, AlignedStorage);

/// Aligned serializer with strings.
/// `push_js_word` just adds `JsWord`s into main output buffer.
pub struct AlignedSerializer<BorrowedStorage: BorrowMut<AlignedStorage>> {
    storage: BorrowedStorage,
}

impl<BorrowedStorage> AlignedSerializer<BorrowedStorage>
where
    BorrowedStorage: BorrowMut<AlignedStorage>,
{
    pub fn serialize<T: Serialize<Self>>(t: &T, storage: BorrowedStorage) {
        let mut serializer = Self { storage };
        serializer.serialize_value(t);
    }
}

impl<BorrowedStorage> AstSerializer for AlignedSerializer<BorrowedStorage>
where
    BorrowedStorage: BorrowMut<AlignedStorage>,
{
    #[inline]
    fn serialize_js_word(&mut self, js_word: &JsWord) {
        // `JsWord` can be static, inline or dynamic.
        // The first 2 representations are self-contained,
        // so only need to add string to output if it's dynamic.
        if js_word.is_dynamic() {
            // Write length as usize, followed by string
            self.push_raw(&js_word.len());
            self.push_raw_bytes(js_word.as_bytes());
        }
    }
}

impl_pure_serializer!(AlignedSerializer, AlignedStorage);

/// Aligned serializer without strings.
/// `push_js_word` discards strings.
pub struct AlignedSerializerNoStrings<BorrowedStorage: BorrowMut<AlignedStorage>> {
    storage: BorrowedStorage,
}

impl<BorrowedStorage> AlignedSerializerNoStrings<BorrowedStorage>
where
    BorrowedStorage: BorrowMut<AlignedStorage>,
{
    pub fn serialize<T: Serialize<Self>>(t: &T, storage: BorrowedStorage) {
        let mut serializer = Self { storage };
        serializer.serialize_value(t);
    }
}

impl<BorrowedStorage> AstSerializer for AlignedSerializerNoStrings<BorrowedStorage>
where
    BorrowedStorage: BorrowMut<AlignedStorage>,
{
    #[inline]
    fn serialize_js_word(&mut self, _js_word: &JsWord) {}
}

impl_pure_serializer!(AlignedSerializerNoStrings, AlignedStorage);

/// Unaligned serializer with strings.
/// `push_js_word` just adds `JsWord`s into main output buffer.
pub struct UnalignedSerializer<BorrowedStorage: BorrowMut<UnalignedVec>> {
    storage: BorrowedStorage,
}

impl<BorrowedStorage> UnalignedSerializer<BorrowedStorage>
where
    BorrowedStorage: BorrowMut<UnalignedVec>,
{
    pub fn serialize<T: Serialize<Self>>(t: &T, storage: BorrowedStorage) {
        let mut serializer = Self { storage };
        serializer.serialize_value(t);
    }
}

impl<BorrowedStorage> AstSerializer for UnalignedSerializer<BorrowedStorage>
where
    BorrowedStorage: BorrowMut<UnalignedVec>,
{
    #[inline]
    fn serialize_js_word(&mut self, js_word: &JsWord) {
        // `JsWord` can be static, inline or dynamic.
        // The first 2 representations are self-contained,
        // so only need to add string to output if it's dynamic.
        if js_word.is_dynamic() {
            // Write length as usize, followed by string
            self.push_raw(&js_word.len());
            self.push_raw_bytes(js_word.as_bytes());
        }
    }
}

impl_pure_serializer!(UnalignedSerializer, UnalignedVec);

/// Unaligned serializer without strings.
/// `push_js_word` discards strings.
pub struct UnalignedSerializerNoStrings<BorrowedStorage: BorrowMut<UnalignedVec>> {
    storage: BorrowedStorage,
}

impl<BorrowedStorage> UnalignedSerializerNoStrings<BorrowedStorage>
where
    BorrowedStorage: BorrowMut<UnalignedVec>,
{
    pub fn serialize<T: Serialize<Self>>(t: &T, storage: BorrowedStorage) {
        let mut serializer = Self { storage };
        serializer.serialize_value(t);
    }
}

impl<BorrowedStorage> AstSerializer for UnalignedSerializerNoStrings<BorrowedStorage>
where
    BorrowedStorage: BorrowMut<UnalignedVec>,
{
    #[inline]
    fn serialize_js_word(&mut self, _js_word: &JsWord) {}
}

impl_pure_serializer!(UnalignedSerializerNoStrings, UnalignedVec);

/// Aligned serializer without strings with position tracking
pub struct PosSerializerNoStrings<BorrowedStorage: BorrowMut<AlignedStorage>> {
    storage: BorrowedStorage,
    pos_mapping: PosMapping,
}

impl<BorrowedStorage> PosSerializerNoStrings<BorrowedStorage>
where
    BorrowedStorage: BorrowMut<AlignedStorage>,
{
    pub fn serialize<T: Serialize<Self>>(t: &T, storage: BorrowedStorage) {
        let mut serializer = Self {
            storage,
            pos_mapping: PosMapping::dummy(),
        };
        serializer.serialize_value(t);
    }
}

impl<BorrowedStorage> AstSerializer for PosSerializerNoStrings<BorrowedStorage>
where
    BorrowedStorage: BorrowMut<AlignedStorage>,
{
    #[inline]
    fn serialize_js_word(&mut self, _js_word: &JsWord) {}
}

impl<BorrowedStorage> PosTrackingSerializer for PosSerializerNoStrings<BorrowedStorage>
where
    BorrowedStorage: BorrowMut<AlignedStorage>,
{
    #[inline]
    fn pos_mapping(&self) -> &PosMapping {
        &self.pos_mapping
    }

    #[inline]
    fn set_pos_mapping(&mut self, pos_mapping: PosMapping) {
        self.pos_mapping = pos_mapping;
    }
}
impl_pos_tracking_serializer!(PosSerializerNoStrings<BorrowedStorage> where BorrowedStorage: BorrowMut<AlignedStorage>);

impl_serializer_store!(PosSerializerNoStrings, AlignedStorage);
impl_serializer_write!(PosSerializerNoStrings, AlignedStorage);

/// Aligned serializer without strings with pointer overwriting
pub struct RelPtrSerializerNoStrings<BorrowedStorage: BorrowMut<AlignedStorage>> {
    storage: BorrowedStorage,
    pos_mapping: PosMapping,
}

impl<BorrowedStorage> RelPtrSerializerNoStrings<BorrowedStorage>
where
    BorrowedStorage: BorrowMut<AlignedStorage>,
{
    pub fn serialize<T: Serialize<Self>>(t: &T, storage: BorrowedStorage) {
        let mut serializer = Self {
            storage,
            pos_mapping: PosMapping::dummy(),
        };
        serializer.serialize_value(t);
    }
}

impl<BorrowedStorage> AstSerializer for RelPtrSerializerNoStrings<BorrowedStorage>
where
    BorrowedStorage: BorrowMut<AlignedStorage>,
{
    #[inline]
    fn serialize_js_word(&mut self, _js_word: &JsWord) {}
}

impl<BorrowedStorage> PosTrackingSerializer for RelPtrSerializerNoStrings<BorrowedStorage>
where
    BorrowedStorage: BorrowMut<AlignedStorage>,
{
    #[inline]
    fn pos_mapping(&self) -> &PosMapping {
        &self.pos_mapping
    }

    #[inline]
    fn set_pos_mapping(&mut self, pos_mapping: PosMapping) {
        self.pos_mapping = pos_mapping;
    }
}

impl<BorrowedStorage> PtrSerializer for RelPtrSerializerNoStrings<BorrowedStorage>
where
    BorrowedStorage: BorrowMut<AlignedStorage>,
{
    #[inline]
    unsafe fn write_ptr(&mut self, ptr_pos: usize, target_pos: usize) {
        // Cannot fully check validity of `target_pos` because its type isn't known
        debug_assert!(ptr_pos <= self.capacity() - mem::size_of::<usize>());
        debug_assert!(is_aligned_to(ptr_pos, mem::align_of::<usize>()));
        debug_assert!(target_pos <= self.capacity());

        self.storage_mut().write(&target_pos, ptr_pos)
    }
}
impl_ptr_serializer!(
    RelPtrSerializerNoStrings<BorrowedStorage> where BorrowedStorage: BorrowMut<AlignedStorage>
);

impl_serializer_store!(RelPtrSerializerNoStrings, AlignedStorage);
impl_serializer_write!(RelPtrSerializerNoStrings, AlignedStorage);

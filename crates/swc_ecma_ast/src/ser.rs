use std::{borrow::BorrowMut, collections::HashMap, mem};

pub use ser::AstSerializer;
use ser_raw::{
    impl_pos_tracking_serializer, impl_pure_copy_serializer,
    storage::{aligned_max_u32_capacity, AlignedVec, ContiguousStorage, Storage, UnalignedVec},
    PosMapping, PosTrackingSerializer, PureCopySerializer, Serialize, Serializer,
    SerializerStorage,
};
use swc_atoms::JsWord;

// On 64-bit systems, alignments are all 8
const OUTPUT_ALIGNMENT: usize = mem::align_of::<u64>();
const VALUE_ALIGNMENT: usize = mem::align_of::<usize>();
const MAX_VALUE_ALIGNMENT: usize = mem::align_of::<u64>();
const MAX_CAPACITY: usize = aligned_max_u32_capacity(OUTPUT_ALIGNMENT);

type AlignedStore =
    AlignedVec<OUTPUT_ALIGNMENT, VALUE_ALIGNMENT, MAX_VALUE_ALIGNMENT, MAX_CAPACITY>;

macro_rules! impl_pure_serializer {
    ($ty:tt, $store:ty) => {
        impl<Store: BorrowMut<$store>> PureCopySerializer for $ty<Store> {}
        impl_pure_copy_serializer!($ty<Store> where Store: BorrowMut<$store>);

        impl_serializer_store!($ty, $store);
    };
}

macro_rules! impl_serializer_store {
    ($ty:tt, $store:ty) => {
        impl<Store: BorrowMut<$store>> SerializerStorage for $ty<Store> {
            type Store = $store;

            fn storage(&self) -> &$store {
                self.storage.borrow()
            }

            fn storage_mut(&mut self) -> &mut $store {
                self.storage.borrow_mut()
            }
        }
    };
}

/// Aligned serializer which stores string content + lengths on end of output.
pub struct AlignedSerializerFastStrings<Store: BorrowMut<AlignedStore>> {
    storage: Store,
    string_lengths: Vec<u32>,
    string_data: Vec<u8>,
}

impl<Store> AlignedSerializerFastStrings<Store>
where
    Store: BorrowMut<AlignedStore>,
{
    pub fn serialize<T: Serialize<Self>>(
        t: &T,
        mut storage: Store,
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
            storage.write(&(pos as u32), metadata_pos);
            storage.write(&(string_lengths.len() as u32), metadata_pos + 4);
        }
    }
}

impl<Store> AstSerializer for AlignedSerializerFastStrings<Store>
where
    Store: BorrowMut<AlignedStore>,
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
            self.push(&index);
        }
    }
}

impl_pure_serializer!(AlignedSerializerFastStrings, AlignedStore);

/// Aligned serializer which stores string content on end of output and pos+len
/// inline.
pub struct AlignedSerializerFastStringsShorter<Store: BorrowMut<AlignedStore>> {
    storage: Store,
    string_data: Vec<u8>,
}

impl<Store> AlignedSerializerFastStringsShorter<Store>
where
    Store: BorrowMut<AlignedStore>,
{
    pub fn serialize<T: Serialize<Self>>(t: &T, mut storage: Store, string_data_len: usize) {
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
            storage.write(&(pos as u32), metadata_pos);
            storage.write(&(string_data.len() as u32), metadata_pos + 4);
        }
    }
}

impl<Store> AstSerializer for AlignedSerializerFastStringsShorter<Store>
where
    Store: BorrowMut<AlignedStore>,
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
            self.push(&[self.string_data.len() as u32, str_bytes.len() as u32]);
            self.string_data.extend_from_slice(str_bytes);
        }
    }
}

impl_pure_serializer!(AlignedSerializerFastStringsShorter, AlignedStore);

/// Aligned serializer which stores strings on end of output with deduplication
/// of strings which are repeated more than once.
pub struct AlignedSerializerFastStringsDeduped<Store: BorrowMut<AlignedStore>> {
    storage: Store,
    string_lengths: Vec<u32>,
    string_data: Vec<u8>,
    string_lookup: HashMap<&'static JsWord, u32>,
}

impl<Store> AlignedSerializerFastStringsDeduped<Store>
where
    Store: BorrowMut<AlignedStore>,
{
    pub fn serialize<T: Serialize<Self>>(
        t: &T,
        mut storage: Store,
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
            storage.write(&(pos as u32), metadata_pos);
            storage.write(&(string_lengths.len() as u32), metadata_pos + 4);
        }
    }
}

impl<Store> AstSerializer for AlignedSerializerFastStringsDeduped<Store>
where
    Store: BorrowMut<AlignedStore>,
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
            self.push(&(index as usize));
        }
    }
}

impl_pure_serializer!(AlignedSerializerFastStringsDeduped, AlignedStore);

/// Aligned serializer with strings.
/// `push_js_word` just adds `JsWord`s into main output buffer.
pub struct AlignedSerializer<Store: BorrowMut<AlignedStore>> {
    storage: Store,
}

impl<Store> AlignedSerializer<Store>
where
    Store: BorrowMut<AlignedStore>,
{
    pub fn serialize<T: Serialize<Self>>(t: &T, storage: Store) {
        let mut serializer = Self { storage };
        serializer.serialize_value(t);
    }
}

impl<Store> AstSerializer for AlignedSerializer<Store>
where
    Store: BorrowMut<AlignedStore>,
{
    #[inline]
    fn serialize_js_word(&mut self, js_word: &JsWord) {
        // `JsWord` can be static, inline or dynamic.
        // The first 2 representations are self-contained,
        // so only need to add string to output if it's dynamic.
        if js_word.is_dynamic() {
            // Write length as usize, followed by string
            self.push(&js_word.len());
            self.push_raw_bytes(js_word.as_bytes());
        }
    }
}

impl_pure_serializer!(AlignedSerializer, AlignedStore);

/// Aligned serializer without strings.
/// `push_js_word` discards strings.
pub struct AlignedSerializerNoStrings<Store: BorrowMut<AlignedStore>> {
    storage: Store,
}

impl<Store> AlignedSerializerNoStrings<Store>
where
    Store: BorrowMut<AlignedStore>,
{
    pub fn serialize<T: Serialize<Self>>(t: &T, storage: Store) {
        let mut serializer = Self { storage };
        serializer.serialize_value(t);
    }
}

impl<Store> AstSerializer for AlignedSerializerNoStrings<Store>
where
    Store: BorrowMut<AlignedStore>,
{
    #[inline]
    fn serialize_js_word(&mut self, _js_word: &JsWord) {}
}

impl_pure_serializer!(AlignedSerializerNoStrings, AlignedStore);

/// Unaligned serializer with strings.
/// `push_js_word` just adds `JsWord`s into main output buffer.
pub struct UnalignedSerializer<Store: BorrowMut<UnalignedVec>> {
    storage: Store,
}

impl<Store> UnalignedSerializer<Store>
where
    Store: BorrowMut<UnalignedVec>,
{
    pub fn serialize<T: Serialize<Self>>(t: &T, storage: Store) {
        let mut serializer = Self { storage };
        serializer.serialize_value(t);
    }
}

impl<Store> AstSerializer for UnalignedSerializer<Store>
where
    Store: BorrowMut<UnalignedVec>,
{
    #[inline]
    fn serialize_js_word(&mut self, js_word: &JsWord) {
        // `JsWord` can be static, inline or dynamic.
        // The first 2 representations are self-contained,
        // so only need to add string to output if it's dynamic.
        if js_word.is_dynamic() {
            // Write length as usize, followed by string
            self.push(&js_word.len());
            self.push_raw_bytes(js_word.as_bytes());
        }
    }
}

impl_pure_serializer!(UnalignedSerializer, UnalignedVec);

/// Unaligned serializer without strings.
/// `push_js_word` discards strings.
pub struct UnalignedSerializerNoStrings<Store: BorrowMut<UnalignedVec>> {
    storage: Store,
}

impl<Store> UnalignedSerializerNoStrings<Store>
where
    Store: BorrowMut<UnalignedVec>,
{
    pub fn serialize<T: Serialize<Self>>(t: &T, storage: Store) {
        let mut serializer = Self { storage };
        serializer.serialize_value(t);
    }
}

impl<Store> AstSerializer for UnalignedSerializerNoStrings<Store>
where
    Store: BorrowMut<UnalignedVec>,
{
    #[inline]
    fn serialize_js_word(&mut self, _js_word: &JsWord) {}
}

impl_pure_serializer!(UnalignedSerializerNoStrings, UnalignedVec);

/// Aligned serializer without strings with position tracking
pub struct PosSerializerNoStrings<BorrowedStore: BorrowMut<AlignedStore>> {
    storage: BorrowedStore,
    pos_mapping: PosMapping,
}

impl<Store> PosSerializerNoStrings<Store>
where
    Store: BorrowMut<AlignedStore>,
{
    pub fn serialize<T: Serialize<Self>>(t: &T, storage: Store) {
        let mut serializer = Self {
            storage,
            pos_mapping: PosMapping::dummy(),
        };
        serializer.serialize_value(t);
    }
}

impl<Store> AstSerializer for PosSerializerNoStrings<Store>
where
    Store: BorrowMut<AlignedStore>,
{
    #[inline]
    fn serialize_js_word(&mut self, _js_word: &JsWord) {}
}

impl<BorrowedStore> PosTrackingSerializer for PosSerializerNoStrings<BorrowedStore>
where
    BorrowedStore: BorrowMut<AlignedStore>,
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
impl_pos_tracking_serializer!(PosSerializerNoStrings<BorrowedStore> where BorrowedStore: BorrowMut<AlignedStore>);

impl_serializer_store!(PosSerializerNoStrings, AlignedStore);

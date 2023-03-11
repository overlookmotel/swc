use std::{borrow::BorrowMut, cmp, collections::HashMap, mem};

pub use ser::AstSerializer;
use ser_raw::{
    storage::{aligned_max_u32_capacity, AlignedVec, ContiguousStorage, Storage, UnalignedVec},
    Serialize, Serializer,
};
use swc_atoms::JsWord;

// On 64-bit systems, alignments are all 8
const OUTPUT_ALIGNMENT: usize = mem::align_of::<u64>();
const VALUE_ALIGNMENT: usize = mem::align_of::<usize>();
const MAX_VALUE_ALIGNMENT: usize = mem::align_of::<u64>();
const MAX_CAPACITY: usize = aligned_max_u32_capacity(OUTPUT_ALIGNMENT);

type AlignedStore =
    AlignedVec<OUTPUT_ALIGNMENT, VALUE_ALIGNMENT, MAX_VALUE_ALIGNMENT, MAX_CAPACITY>;

macro_rules! impl_serializer {
    ($ty:ty, $store:ty) => {
        impl<BorrowedStore> Serializer<$store, BorrowedStore> for $ty
        where
            BorrowedStore: BorrowMut<$store>,
        {
            fn storage(&self) -> &$store {
                self.storage.borrow()
            }

            fn storage_mut(&mut self) -> &mut $store {
                self.storage.borrow_mut()
            }

            fn from_storage(storage: BorrowedStore) -> Self {
                Self { storage }
            }

            fn into_storage(self) -> BorrowedStore {
                self.storage
            }
        }
    };
}

/// Aligned serializer which stores strings on end of output.
pub struct AlignedSerializerFastStrings<BorrowedStore: BorrowMut<AlignedStore>> {
    storage: BorrowedStore,
    string_lengths: Vec<u32>,
    string_data: Vec<u8>,
}

impl<BorrowedStore> AlignedSerializerFastStrings<BorrowedStore>
where
    BorrowedStore: BorrowMut<AlignedStore>,
{
    pub fn serialize<T: Serialize<Self, AlignedStore, BorrowedStore>>(
        t: &T,
        mut storage: BorrowedStore,
        num_strings: usize,
        string_data_len: usize,
    ) {
        // Reserve space for pointer to strings + len (as `u32`s).
        // `align_for` should be a no-op as will be aligned to `VALUE_ALIGNMENT` anyway.
        storage.borrow_mut().align_for::<u32>();
        let metadata_pos = storage.borrow().len();
        storage.borrow_mut().push_empty_const_slice::<u32, 2>();

        // We ensure `pos` is left at multiple of `VALUE_ALIGNMENT`.
        let required_capacity = cmp::max(8, VALUE_ALIGNMENT);
        assert!(storage.borrow().capacity() >= required_capacity);
        unsafe { storage.borrow_mut().set_len(required_capacity) };

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

impl<BorrowedStore> AstSerializer for AlignedSerializerFastStrings<BorrowedStore>
where
    BorrowedStore: BorrowMut<AlignedStore>,
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

impl<BorrowedStore> Serializer<AlignedStore, BorrowedStore>
    for AlignedSerializerFastStrings<BorrowedStore>
where
    BorrowedStore: BorrowMut<AlignedStore>,
{
    fn storage(&self) -> &AlignedStore {
        self.storage.borrow()
    }

    fn storage_mut(&mut self) -> &mut AlignedStore {
        self.storage.borrow_mut()
    }

    fn from_storage(storage: BorrowedStore) -> Self {
        Self {
            storage,
            string_lengths: Vec::new(),
            string_data: Vec::new(),
        }
    }

    fn into_storage(self) -> BorrowedStore {
        self.storage
    }
}

/// Aligned serializer which stores strings on end of output with deduplication
/// of strings which are repeated more than once.
pub struct AlignedSerializerFastStringsDeduped<BorrowedStore: BorrowMut<AlignedStore>> {
    storage: BorrowedStore,
    string_lengths: Vec<u32>,
    string_data: Vec<u8>,
    string_lookup: HashMap<&'static JsWord, u32>,
}

impl<BorrowedStore> AlignedSerializerFastStringsDeduped<BorrowedStore>
where
    BorrowedStore: BorrowMut<AlignedStore>,
{
    pub fn serialize<T: Serialize<Self, AlignedStore, BorrowedStore>>(
        t: &T,
        mut storage: BorrowedStore,
        num_strings: usize,
        string_data_len: usize,
    ) {
        // Reserve space for pointer to strings + len (as `u32`s).
        // `align_for` should be a no-op as will be aligned to `VALUE_ALIGNMENT` anyway.
        storage.borrow_mut().align_for::<u32>();
        let metadata_pos = storage.borrow().len();
        storage.borrow_mut().push_empty_const_slice::<u32, 2>();

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

impl<BorrowedStore> AstSerializer for AlignedSerializerFastStringsDeduped<BorrowedStore>
where
    BorrowedStore: BorrowMut<AlignedStore>,
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

impl<BorrowedStore> Serializer<AlignedStore, BorrowedStore>
    for AlignedSerializerFastStringsDeduped<BorrowedStore>
where
    BorrowedStore: BorrowMut<AlignedStore>,
{
    fn storage(&self) -> &AlignedStore {
        self.storage.borrow()
    }

    fn storage_mut(&mut self) -> &mut AlignedStore {
        self.storage.borrow_mut()
    }

    fn from_storage(storage: BorrowedStore) -> Self {
        Self {
            storage,
            string_lengths: Vec::new(),
            string_data: Vec::new(),
            string_lookup: HashMap::new(),
        }
    }

    fn into_storage(self) -> BorrowedStore {
        self.storage
    }
}

/// Aligned serializer with strings.
/// `push_js_word` just adds `JsWord`s into main output buffer.
pub struct AlignedSerializer<BorrowedStore: BorrowMut<AlignedStore>> {
    storage: BorrowedStore,
}

impl<BorrowedStore> AlignedSerializer<BorrowedStore>
where
    BorrowedStore: BorrowMut<AlignedStore>,
{
    pub fn serialize<T: Serialize<Self, AlignedStore, BorrowedStore>>(
        t: &T,
        storage: BorrowedStore,
    ) {
        let mut serializer = Self { storage };
        serializer.serialize_value(t);
    }
}

impl<BorrowedStore> AstSerializer for AlignedSerializer<BorrowedStore>
where
    BorrowedStore: BorrowMut<AlignedStore>,
{
    #[inline]
    fn serialize_js_word(&mut self, js_word: &JsWord) {
        // `JsWord` can be static, inline or dynamic.
        // The first 2 representations are self-contained,
        // so only need to add string to output if it's dynamic.
        if js_word.is_dynamic() {
            // Write length as usize, followed by string
            self.push(&js_word.len());
            self.push_bytes(js_word.as_bytes());
        }
    }
}

impl_serializer!(AlignedSerializer<BorrowedStore>, AlignedStore);

/// Aligned serializer without strings.
/// `push_js_word` discards strings.
pub struct AlignedSerializerNoStrings<BorrowedStore: BorrowMut<AlignedStore>> {
    storage: BorrowedStore,
}

impl<BorrowedStore> AlignedSerializerNoStrings<BorrowedStore>
where
    BorrowedStore: BorrowMut<AlignedStore>,
{
    pub fn serialize<T: Serialize<Self, AlignedStore, BorrowedStore>>(
        t: &T,
        storage: BorrowedStore,
    ) {
        let mut serializer = Self { storage };
        serializer.serialize_value(t);
    }
}

impl<BorrowedStore> AstSerializer for AlignedSerializerNoStrings<BorrowedStore>
where
    BorrowedStore: BorrowMut<AlignedStore>,
{
    #[inline]
    fn serialize_js_word(&mut self, _js_word: &JsWord) {}
}

impl_serializer!(AlignedSerializerNoStrings<BorrowedStore>, AlignedStore);

/// Unaligned serializer with strings.
/// `push_js_word` just adds `JsWord`s into main output buffer.
pub struct UnalignedSerializer<Store: BorrowMut<UnalignedVec>> {
    storage: Store,
}

impl<BorrowedStore> UnalignedSerializer<BorrowedStore>
where
    BorrowedStore: BorrowMut<UnalignedVec>,
{
    pub fn serialize<T: Serialize<Self, UnalignedVec, BorrowedStore>>(
        t: &T,
        storage: BorrowedStore,
    ) {
        let mut serializer = Self { storage };
        serializer.serialize_value(t);
    }
}

impl<BorrowedStore> AstSerializer for UnalignedSerializer<BorrowedStore>
where
    BorrowedStore: BorrowMut<UnalignedVec>,
{
    #[inline]
    fn serialize_js_word(&mut self, js_word: &JsWord) {
        // `JsWord` can be static, inline or dynamic.
        // The first 2 representations are self-contained,
        // so only need to add string to output if it's dynamic.
        if js_word.is_dynamic() {
            // Write length as usize, followed by string
            self.push(&js_word.len());
            self.push_bytes(js_word.as_bytes());
        }
    }
}

impl_serializer!(UnalignedSerializer<BorrowedStore>, UnalignedVec);

/// Unaligned serializer without strings.
/// `push_js_word` discards strings.
pub struct UnalignedSerializerNoStrings<Store: BorrowMut<UnalignedVec>> {
    storage: Store,
}

impl<BorrowedStore> UnalignedSerializerNoStrings<BorrowedStore>
where
    BorrowedStore: BorrowMut<UnalignedVec>,
{
    pub fn serialize<T: Serialize<Self, UnalignedVec, BorrowedStore>>(
        t: &T,
        storage: BorrowedStore,
    ) {
        let mut serializer = Self { storage };
        serializer.serialize_value(t);
    }
}

impl<BorrowedStore> AstSerializer for UnalignedSerializerNoStrings<BorrowedStore>
where
    BorrowedStore: BorrowMut<UnalignedVec>,
{
    #[inline]
    fn serialize_js_word(&mut self, _js_word: &JsWord) {}
}

impl_serializer!(UnalignedSerializerNoStrings<BorrowedStore>, UnalignedVec);

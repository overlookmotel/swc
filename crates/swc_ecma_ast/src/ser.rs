use std::{borrow::BorrowMut, collections::HashMap, mem};

pub use ser::AstSerializer;
use ser_raw::{
    pos::{PosMapping, Ptrs},
    storage::{AlignedVec, RandomAccessStorage, Storage},
    util::aligned_max_u32_capacity,
    Serialize, Serializer,
};
use swc_atoms::JsWord;

// On 64-bit systems, alignments are all 8
const OUTPUT_ALIGNMENT: usize = mem::align_of::<u64>();
const VALUE_ALIGNMENT: usize = mem::align_of::<usize>();
const MAX_VALUE_ALIGNMENT: usize = mem::align_of::<u64>();
const MAX_CAPACITY: usize = aligned_max_u32_capacity(OUTPUT_ALIGNMENT);

type AlignedStorage =
    AlignedVec<OUTPUT_ALIGNMENT, VALUE_ALIGNMENT, MAX_VALUE_ALIGNMENT, MAX_CAPACITY>;

/// Aligned serializer which stores string content + lengths on end of output.
#[derive(Serializer)]
#[ser_type(pure_copy)]
pub struct AlignedSerializerFastStrings<BorrowedStorage: BorrowMut<AlignedStorage>> {
    #[ser_storage(AlignedStorage)]
    storage: BorrowedStorage,
    string_lengths: Vec<u32>,
    string_data: Vec<u8>,
}

impl<BorrowedStorage> AlignedSerializerFastStrings<BorrowedStorage>
where
    BorrowedStorage: BorrowMut<AlignedStorage>,
{
    pub fn serialize_into<T: Serialize<Self>>(
        value: &T,
        mut storage: BorrowedStorage,
        num_strings: usize,
        string_data_len: usize,
    ) {
        // Reserve space for pointer to strings + len (as `u32`s).
        // `align_for` should be a no-op as will be aligned to `VALUE_ALIGNMENT` anyway.
        storage.borrow_mut().align_for::<[u32; 2]>();
        let metadata_pos = storage.borrow().pos();
        storage.borrow_mut().push_empty::<[u32; 2]>();

        let mut serializer = Self {
            storage,
            string_lengths: Vec::with_capacity(num_strings),
            string_data: Vec::with_capacity(string_data_len),
        };
        serializer.serialize_value(value);
        serializer.finalize_strings(metadata_pos);
        serializer.finalize();
    }

    fn finalize_strings(&mut self, metadata_pos: usize) {
        let storage = self.storage.borrow_mut();

        // Get position we're writing string lengths at
        storage.align_for::<u32>(); // Should be a no-op because will be aligned to `VALUE_ALIGNMENT` anyway
        let pos = storage.pos();

        // Write string lengths + data
        storage.push_slice(&self.string_lengths);
        storage.push_bytes(&self.string_data);

        // Write position of string length data + number of strings at start of buffer
        // (each as a `u32`)
        unsafe {
            storage.write(
                metadata_pos,
                &[pos as u32, self.string_lengths.len() as u32],
            );
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

/// Aligned serializer which stores string content on end of output and pos+len
/// inline.
#[derive(Serializer)]
#[ser_type(pure_copy)]
pub struct AlignedSerializerFastStringsShorter<BorrowedStorage: BorrowMut<AlignedStorage>> {
    #[ser_storage(AlignedStorage)]
    storage: BorrowedStorage,
    string_data: Vec<u8>,
}

impl<BorrowedStorage> AlignedSerializerFastStringsShorter<BorrowedStorage>
where
    BorrowedStorage: BorrowMut<AlignedStorage>,
{
    pub fn serialize_into<T: Serialize<Self>>(
        value: &T,
        mut storage: BorrowedStorage,
        string_data_len: usize,
    ) {
        // Reserve space for pointer to strings + len (as `u32`s).
        // `align_for` should be a no-op as will be aligned to `VALUE_ALIGNMENT` anyway.
        storage.borrow_mut().align_for::<[u32; 2]>();
        let metadata_pos = storage.borrow().pos();
        storage.borrow_mut().push_empty::<[u32; 2]>();

        let mut serializer = Self {
            storage,
            string_data: Vec::with_capacity(string_data_len),
        };
        serializer.serialize_value(value);
        serializer.finalize_strings(metadata_pos);
        serializer.finalize();
    }

    fn finalize_strings(&mut self, metadata_pos: usize) {
        let storage = self.storage.borrow_mut();

        // Get position we're writing string content at
        let pos = storage.pos();

        // Write string lengths + data
        storage.push_bytes(&self.string_data);
        // Write position and length of string data at start of buffer (each as a `u32`)
        unsafe { storage.write(metadata_pos, &[pos as u32, self.string_data.len() as u32]) };
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

/// Aligned serializer which stores strings on end of output with deduplication
/// of strings which are repeated more than once.
#[derive(Serializer)]
#[ser_type(pure_copy)]
pub struct AlignedSerializerFastStringsDeduped<BorrowedStorage: BorrowMut<AlignedStorage>> {
    #[ser_storage(AlignedStorage)]
    storage: BorrowedStorage,
    string_lengths: Vec<u32>,
    string_data: Vec<u8>,
    string_lookup: HashMap<&'static JsWord, u32>,
}

impl<BorrowedStorage> AlignedSerializerFastStringsDeduped<BorrowedStorage>
where
    BorrowedStorage: BorrowMut<AlignedStorage>,
{
    pub fn serialize_into<T: Serialize<Self>>(
        value: &T,
        mut storage: BorrowedStorage,
        num_strings: usize,
        string_data_len: usize,
    ) {
        // Reserve space for pointer to strings + len (as `u32`s).
        // `align_for` should be a no-op as will be aligned to `VALUE_ALIGNMENT` anyway.
        storage.borrow_mut().align_for::<[u32; 2]>();
        let metadata_pos = storage.borrow().pos();
        storage.borrow_mut().push_empty::<[u32; 2]>();

        let mut serializer = Self {
            storage,
            string_lengths: Vec::with_capacity(num_strings),
            string_data: Vec::with_capacity(string_data_len),
            string_lookup: HashMap::with_capacity(num_strings),
        };
        serializer.serialize_value(value);
        serializer.finalize_strings(metadata_pos);
        serializer.finalize();
    }

    fn finalize_strings(&mut self, metadata_pos: usize) {
        let storage = self.storage.borrow_mut();

        // Get position we're writing string lengths at
        storage.align_for::<u32>(); // Should be a no-op because will be aligned to `VALUE_ALIGNMENT` anyway
        let pos = storage.pos();

        // Write string lengths + data
        storage.push_slice(&self.string_lengths);
        storage.push_bytes(&self.string_data);
        // Write position of string length data + number of strings at start
        // of buffer (each as a `u32`)
        unsafe {
            storage.write(
                metadata_pos,
                &[pos as u32, self.string_lengths.len() as u32],
            );
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

/// Aligned serializer with strings.
/// `push_js_word` just adds `JsWord`s into main output buffer.
#[derive(Serializer)]
#[ser_type(pure_copy)]
pub struct AlignedSerializer<BorrowedStorage: BorrowMut<AlignedStorage>> {
    #[ser_storage(AlignedStorage)]
    storage: BorrowedStorage,
}

impl<BorrowedStorage> AlignedSerializer<BorrowedStorage>
where
    BorrowedStorage: BorrowMut<AlignedStorage>,
{
    pub fn serialize_into<T: Serialize<Self>>(value: &T, storage: BorrowedStorage) {
        let serializer = Self { storage };
        serializer.serialize(value);
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

/// Aligned serializer without strings.
/// `push_js_word` discards strings.
#[derive(Serializer)]
#[ser_type(pure_copy)]
pub struct AlignedSerializerNoStrings<BorrowedStorage: BorrowMut<AlignedStorage>> {
    #[ser_storage(AlignedStorage)]
    storage: BorrowedStorage,
}

impl<BorrowedStorage> AlignedSerializerNoStrings<BorrowedStorage>
where
    BorrowedStorage: BorrowMut<AlignedStorage>,
{
    pub fn serialize_into<T: Serialize<Self>>(value: &T, storage: BorrowedStorage) {
        let serializer = Self { storage };
        serializer.serialize(value);
    }
}

impl<BorrowedStorage> AstSerializer for AlignedSerializerNoStrings<BorrowedStorage>
where
    BorrowedStorage: BorrowMut<AlignedStorage>,
{
    #[inline]
    fn serialize_js_word(&mut self, _js_word: &JsWord) {}
}

/// Aligned serializer without strings with position tracking
#[derive(Serializer)]
#[ser_type(pos_tracking)]
pub struct PosSerializerNoStrings<BorrowedStorage: BorrowMut<AlignedStorage>> {
    #[ser_storage(AlignedStorage)]
    storage: BorrowedStorage,
    #[ser_pos_mapping]
    pos_mapping: PosMapping,
}

impl<BorrowedStorage> PosSerializerNoStrings<BorrowedStorage>
where
    BorrowedStorage: BorrowMut<AlignedStorage>,
{
    pub fn serialize_into<T: Serialize<Self>>(value: &T, storage: BorrowedStorage) {
        let serializer = Self {
            storage,
            pos_mapping: PosMapping::dummy(),
        };
        serializer.serialize(value);
    }
}

impl<BorrowedStorage> AstSerializer for PosSerializerNoStrings<BorrowedStorage>
where
    BorrowedStorage: BorrowMut<AlignedStorage>,
{
    #[inline]
    fn serialize_js_word(&mut self, _js_word: &JsWord) {}
}

/// Aligned serializer without strings with pointer overwriting with relative
/// offsets
#[derive(Serializer)]
#[ser_type(ptr_offset)]
pub struct PtrOffsetSerializerNoStrings<BorrowedStorage: BorrowMut<AlignedStorage>> {
    #[ser_storage(AlignedStorage)]
    storage: BorrowedStorage,
    #[ser_pos_mapping]
    pos_mapping: PosMapping,
}

impl<BorrowedStorage> PtrOffsetSerializerNoStrings<BorrowedStorage>
where
    BorrowedStorage: BorrowMut<AlignedStorage>,
{
    pub fn serialize_into<T: Serialize<Self>>(value: &T, storage: BorrowedStorage) {
        let serializer = Self {
            storage,
            pos_mapping: PosMapping::dummy(),
        };
        serializer.serialize(value);
    }
}

impl<BorrowedStorage> AstSerializer for PtrOffsetSerializerNoStrings<BorrowedStorage>
where
    BorrowedStorage: BorrowMut<AlignedStorage>,
{
    #[inline]
    fn serialize_js_word(&mut self, _js_word: &JsWord) {}
}

/// Aligned serializer without strings creating complete output
#[derive(Serializer)]
#[ser_type(complete)]
pub struct CompleteSerializerNoStrings<BorrowedStorage: BorrowMut<AlignedStorage>> {
    #[ser_storage(AlignedStorage)]
    storage: BorrowedStorage,
    #[ser_pos_mapping]
    pos_mapping: PosMapping,
    #[ser_ptrs]
    ptrs: Ptrs,
}

impl<BorrowedStorage> CompleteSerializerNoStrings<BorrowedStorage>
where
    BorrowedStorage: BorrowMut<AlignedStorage>,
{
    pub fn serialize_into<T: Serialize<Self>>(value: &T, storage: BorrowedStorage) {
        let serializer = Self {
            storage,
            pos_mapping: PosMapping::dummy(),
            ptrs: Ptrs::new(),
        };
        serializer.serialize(value);
    }
}

impl<BorrowedStorage> AstSerializer for CompleteSerializerNoStrings<BorrowedStorage>
where
    BorrowedStorage: BorrowMut<AlignedStorage>,
{
    #[inline]
    fn serialize_js_word(&mut self, _js_word: &JsWord) {}
}

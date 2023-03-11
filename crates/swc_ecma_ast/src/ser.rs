use std::{borrow::BorrowMut, cmp, collections::HashMap, mem};

pub use ser::AstSerializer;
use ser_raw::{
    storage::{AlignedVec, ContiguousStorage, Storage, UnalignedVec},
    Serialize, Serializer,
};
use swc_atoms::JsWord;

// On 64-bit systems, these are all 8
const OUTPUT_ALIGNMENT: usize = mem::align_of::<u64>();
const VALUE_ALIGNMENT: usize = mem::align_of::<usize>();
const MAX_VALUE_ALIGNMENT: usize = mem::align_of::<u64>();

type AlignedStore = AlignedVec<OUTPUT_ALIGNMENT, VALUE_ALIGNMENT, MAX_VALUE_ALIGNMENT>;

macro_rules! impl_unaligned {
    ($ty:ty) => {
        impl<Store: BorrowMut<UnalignedVec>> Serializer for $ty {
            #[inline]
            fn push_and_process_slice<T, P: FnOnce(&mut Self)>(&mut self, slice: &[T], process: P) {
                self.push_raw_slice(slice);
                process(self);
            }

            #[inline]
            fn push_bytes(&mut self, bytes: &[u8]) {
                self.storage.borrow_mut().push_bytes(bytes);
            }

            #[inline]
            fn push_raw_slice<T>(&mut self, slice: &[T]) {
                self.storage.borrow_mut().push_slice(slice);
            }

            #[inline]
            fn capacity(&self) -> usize {
                self.storage.borrow().capacity()
            }

            #[inline]
            fn pos(&self) -> usize {
                self.storage.borrow().len()
            }
        }
    };
}

macro_rules! impl_aligned {
    ($ty:ty) => {
        impl<Store: BorrowMut<AlignedStore>> Serializer for $ty {
            #[inline]
            fn push_and_process_slice<T, P: FnOnce(&mut Self)>(&mut self, slice: &[T], process: P) {
                self.push_raw_slice(slice);
                process(self);
            }

            #[inline]
            fn push_raw_slice<T>(&mut self, slice: &[T]) {
                self.storage.borrow_mut().push_slice(slice);
            }

            #[inline]
            fn capacity(&self) -> usize {
                self.storage.borrow().capacity()
            }

            #[inline]
            fn pos(&self) -> usize {
                self.storage.borrow().len()
            }
        }
    };
}

/// Aligned serializer which stores strings on end of output.
pub struct AlignedSerializerFastStrings<Store: BorrowMut<AlignedStore>> {
    storage: Store,
    string_lengths: Vec<u32>,
    string_data: Vec<u8>,
}

impl<Store: BorrowMut<AlignedStore>> AlignedSerializerFastStrings<Store> {
    pub fn serialize<T: Serialize<Self>>(
        t: &T,
        mut storage: Store,
        num_strings: usize,
        string_data_len: usize,
    ) {
        // Reserve 8 bytes for pointer to strings + len.
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
            (storage.as_mut_ptr() as *mut u32).write(pos as u32);
            (storage.as_mut_ptr().offset(4) as *mut u32).write(string_lengths.len() as u32);
        }
    }
}

impl<Store: BorrowMut<AlignedStore>> AstSerializer for AlignedSerializerFastStrings<Store> {
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

impl_aligned!(AlignedSerializerFastStrings<Store>);

/// Aligned serializer which stores strings on end of output with deduplication
/// of strings which are repeated more than once.
pub struct AlignedSerializerFastStringsDeduped<Store: BorrowMut<AlignedStore>> {
    storage: Store,
    string_lengths: Vec<u32>,
    string_data: Vec<u8>,
    string_lookup: HashMap<&'static JsWord, u32>,
}

impl<Store: BorrowMut<AlignedStore>> AlignedSerializerFastStringsDeduped<Store> {
    pub fn serialize<T: Serialize<Self>>(
        t: &T,
        mut storage: Store,
        num_strings: usize,
        string_data_len: usize,
    ) {
        // Reserve 8 bytes for pointer to strings + len.
        // We ensure `pos` is left at multiple of `VALUE_ALIGNMENT`.
        let required_capacity = cmp::max(8, VALUE_ALIGNMENT);
        assert!(storage.borrow().capacity() >= required_capacity);
        unsafe { storage.borrow_mut().set_len(required_capacity) };

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
            (storage.as_mut_ptr() as *mut u32).write(pos as u32);
            (storage.as_mut_ptr().offset(4) as *mut u32).write(string_lengths.len() as u32);
        }
    }
}

impl<Store: BorrowMut<AlignedStore>> AstSerializer for AlignedSerializerFastStringsDeduped<Store> {
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

impl_aligned!(AlignedSerializerFastStringsDeduped<Store>);

/// Aligned serializer with strings.
/// `push_js_word` just adds `JsWord`s into main output buffer.
pub struct AlignedSerializer<Store: BorrowMut<AlignedStore>> {
    storage: Store,
}

impl<Store: BorrowMut<AlignedStore>> AlignedSerializer<Store> {
    pub fn serialize<T: Serialize<Self>>(t: &T, storage: Store) {
        let mut serializer = Self { storage };
        serializer.serialize_value(t);
    }
}

impl<Store: BorrowMut<AlignedStore>> AstSerializer for AlignedSerializer<Store> {
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

impl_aligned!(AlignedSerializer<Store>);

/// Aligned serializer without strings.
/// `push_js_word` discards strings.
pub struct AlignedSerializerNoStrings<Store: BorrowMut<AlignedStore>> {
    storage: Store,
}

impl<Store: BorrowMut<AlignedStore>> AlignedSerializerNoStrings<Store> {
    pub fn serialize<T: Serialize<Self>>(t: &T, storage: Store) {
        let mut serializer = Self { storage };
        serializer.serialize_value(t);
    }
}

impl<Store: BorrowMut<AlignedStore>> AstSerializer for AlignedSerializerNoStrings<Store> {
    #[inline]
    fn serialize_js_word(&mut self, _js_word: &JsWord) {}
}

impl_aligned!(AlignedSerializerNoStrings<Store>);

/// Unaligned serializer with strings.
/// `push_js_word` just adds `JsWord`s into main output buffer.
pub struct UnalignedSerializer<Store: BorrowMut<UnalignedVec>> {
    storage: Store,
}

impl<Store: BorrowMut<UnalignedVec>> UnalignedSerializer<Store> {
    pub fn serialize<T: Serialize<Self>>(t: &T, storage: Store) {
        let mut serializer = Self { storage };
        serializer.serialize_value(t);
    }
}

impl<Store: BorrowMut<UnalignedVec>> AstSerializer for UnalignedSerializer<Store> {
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

impl_unaligned!(UnalignedSerializer<Store>);

/// Unaligned serializer without strings.
/// `push_js_word` discards strings.
pub struct UnalignedSerializerNoStrings<Store: BorrowMut<UnalignedVec>> {
    storage: Store,
}

impl<Store: BorrowMut<UnalignedVec>> UnalignedSerializerNoStrings<Store> {
    pub fn serialize<T: Serialize<Self>>(t: &T, storage: Store) {
        let mut serializer = Self { storage };
        serializer.serialize_value(t);
    }
}

impl<Store: BorrowMut<UnalignedVec>> AstSerializer for UnalignedSerializerNoStrings<Store> {
    #[inline]
    fn serialize_js_word(&mut self, _js_word: &JsWord) {}
}

impl_unaligned!(UnalignedSerializerNoStrings<Store>);

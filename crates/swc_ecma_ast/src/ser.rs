use std::{borrow::BorrowMut, cmp, collections::HashMap, mem};

pub use ser::AstSerializer;
use ser_raw::{
    storage::{AlignedVec, ContiguousStorage, Storage, UnalignedVec},
    BaseSerializer, Serialize, Serializer, UnalignedSerializer as BaseUnalignedSerializer,
};
use swc_atoms::JsWord;

// On 64-bit systems, these are all 8
const OUTPUT_ALIGNMENT: usize = mem::align_of::<u64>();
const VALUE_ALIGNMENT: usize = mem::align_of::<usize>();
const MAX_VALUE_ALIGNMENT: usize = mem::align_of::<u64>();

type AlignedStore = AlignedVec<OUTPUT_ALIGNMENT, VALUE_ALIGNMENT, MAX_VALUE_ALIGNMENT>;
type InnerAlignedSerializer<Store> =
    BaseSerializer<Store, OUTPUT_ALIGNMENT, VALUE_ALIGNMENT, MAX_VALUE_ALIGNMENT>;

pub struct AlignedSerializerFastStrings<Store: BorrowMut<AlignedStore>> {
    inner: InnerAlignedSerializer<Store>,
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
            inner: InnerAlignedSerializer::from_storage(storage),
            string_lengths: Vec::with_capacity(num_strings),
            string_data: Vec::with_capacity(string_data_len),
        };
        serializer.serialize_value(t);

        let mut storage = serializer.inner.into_storage();
        let string_lengths = serializer.string_lengths;
        let string_data = serializer.string_data;
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
    type InnerSerializer = InnerAlignedSerializer<Store>;

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

    #[inline]
    fn inner(&self) -> &Self::InnerSerializer {
        &self.inner
    }

    #[inline]
    fn inner_mut(&mut self) -> &mut Self::InnerSerializer {
        &mut self.inner
    }
}

pub struct AlignedSerializerFastStringsDeduped<Store: BorrowMut<AlignedStore>> {
    inner: InnerAlignedSerializer<Store>,
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
            inner: InnerAlignedSerializer::from_storage(storage),
            string_lengths: Vec::with_capacity(num_strings),
            string_data: Vec::with_capacity(string_data_len),
            string_lookup: HashMap::with_capacity(num_strings),
        };
        serializer.serialize_value(t);

        let mut storage = serializer.inner.into_storage();
        let string_lengths = serializer.string_lengths;
        let string_data = serializer.string_data;
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
    type InnerSerializer = InnerAlignedSerializer<Store>;

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

    #[inline]
    fn inner(&self) -> &Self::InnerSerializer {
        &self.inner
    }

    #[inline]
    fn inner_mut(&mut self) -> &mut Self::InnerSerializer {
        &mut self.inner
    }
}

pub struct AlignedSerializer<Store: BorrowMut<AlignedStore>> {
    inner: InnerAlignedSerializer<Store>,
}

impl<Store: BorrowMut<AlignedStore>> AlignedSerializer<Store> {
    pub fn serialize<T: Serialize<Self>>(t: &T, storage: Store) {
        let mut serializer = Self {
            inner: InnerAlignedSerializer::from_storage(storage),
        };
        serializer.serialize_value(t);
    }
}

impl<Store: BorrowMut<AlignedStore>> AstSerializer for AlignedSerializer<Store> {
    type InnerSerializer = InnerAlignedSerializer<Store>;

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

    #[inline]
    fn inner(&self) -> &Self::InnerSerializer {
        &self.inner
    }

    #[inline]
    fn inner_mut(&mut self) -> &mut Self::InnerSerializer {
        &mut self.inner
    }
}

pub struct AlignedSerializerNoStrings<Store: BorrowMut<AlignedStore>> {
    inner: InnerAlignedSerializer<Store>,
}

impl<Store: BorrowMut<AlignedStore>> AlignedSerializerNoStrings<Store> {
    pub fn serialize<T: Serialize<Self>>(t: &T, storage: Store) {
        let mut serializer = Self {
            inner: InnerAlignedSerializer::from_storage(storage),
        };
        serializer.serialize_value(t);
    }
}

impl<Store: BorrowMut<AlignedStore>> AstSerializer for AlignedSerializerNoStrings<Store> {
    type InnerSerializer = InnerAlignedSerializer<Store>;

    #[inline]
    fn serialize_js_word(&mut self, _js_word: &JsWord) {}

    #[inline]
    fn inner(&self) -> &Self::InnerSerializer {
        &self.inner
    }

    #[inline]
    fn inner_mut(&mut self) -> &mut Self::InnerSerializer {
        &mut self.inner
    }
}

/// `UnalignedSerializer` wrapped to add `push_js_word` method.
/// `push_js_word` just adds `JsWord`s into main output buffer.
pub struct UnalignedSerializer<Store: BorrowMut<UnalignedVec>> {
    inner: BaseUnalignedSerializer<Store>,
}

impl<Store: BorrowMut<UnalignedVec>> UnalignedSerializer<Store> {
    pub fn serialize<T: Serialize<Self>>(t: &T, storage: Store) {
        let mut serializer = Self {
            inner: BaseUnalignedSerializer::from_storage(storage),
        };
        serializer.serialize_value(t);
    }
}

impl<Store: BorrowMut<UnalignedVec>> AstSerializer for UnalignedSerializer<Store> {
    type InnerSerializer = BaseUnalignedSerializer<Store>;

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

    #[inline]
    fn inner(&self) -> &Self::InnerSerializer {
        &self.inner
    }

    #[inline]
    fn inner_mut(&mut self) -> &mut Self::InnerSerializer {
        &mut self.inner
    }
}

pub struct UnalignedSerializerNoStrings<Store: BorrowMut<UnalignedVec>> {
    inner: BaseUnalignedSerializer<Store>,
}

impl<Store: BorrowMut<UnalignedVec>> UnalignedSerializerNoStrings<Store> {
    pub fn serialize<T: Serialize<Self>>(t: &T, storage: Store) {
        let mut serializer = Self {
            inner: BaseUnalignedSerializer::from_storage(storage),
        };
        serializer.serialize_value(t);
    }
}

impl<Store: BorrowMut<UnalignedVec>> AstSerializer for UnalignedSerializerNoStrings<Store> {
    type InnerSerializer = BaseUnalignedSerializer<Store>;

    #[inline]
    fn serialize_js_word(&mut self, _js_word: &JsWord) {}

    #[inline]
    fn inner(&self) -> &Self::InnerSerializer {
        &self.inner
    }

    #[inline]
    fn inner_mut(&mut self) -> &mut Self::InnerSerializer {
        &mut self.inner
    }
}

macro_rules! impl_serializer {
    ($ty:ty, $out:ty) => {
        impl<B: BorrowMut<$out>> Serializer for $ty {
            #[inline]
            fn push<T>(&mut self, value: &T) {
                self.inner_mut().push(value);
            }

            #[inline]
            fn push_slice<T>(&mut self, slice: &[T]) {
                self.inner_mut().push_slice(slice);
            }

            #[inline]
            fn push_bytes(&mut self, bytes: &[u8]) {
                self.inner_mut().push_bytes(bytes);
            }

            #[inline]
            fn push_raw<T>(&mut self, value: &T) {
                self.inner_mut().push_raw(value);
            }

            #[inline]
            fn push_raw_slice<T>(&mut self, slice: &[T]) {
                self.inner_mut().push_raw_slice(slice);
            }

            #[inline]
            fn capacity(&self) -> usize {
                self.inner().capacity()
            }

            #[inline]
            fn pos(&self) -> usize {
                self.inner().pos()
            }

            #[inline]
            unsafe fn set_pos(&mut self, pos: usize) {
                self.inner_mut().set_pos(pos);
            }
        }
    };
}
impl_serializer!(AlignedSerializerFastStrings<B>, AlignedStore);
impl_serializer!(AlignedSerializerFastStringsDeduped<B>, AlignedStore);
impl_serializer!(AlignedSerializer<B>, AlignedStore);
impl_serializer!(AlignedSerializerNoStrings<B>, AlignedStore);
impl_serializer!(UnalignedSerializer<B>, UnalignedVec);
impl_serializer!(UnalignedSerializerNoStrings<B>, UnalignedVec);

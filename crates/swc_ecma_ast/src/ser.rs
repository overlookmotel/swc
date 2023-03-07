use std::{
    borrow::{Borrow, BorrowMut},
    cmp,
    collections::HashMap,
    mem, ptr,
};

pub use ser::AstSerializer;
use ser_raw::{
    AlignedByteVec, BaseSerializer, Serialize, Serializer,
    UnalignedSerializer as BaseUnalignedSerializer,
};
use swc_atoms::JsWord;

// On 64-bit systems, these are all 8
const OUTPUT_ALIGNMENT: usize = std::mem::align_of::<u64>();
const VALUE_ALIGNMENT: usize = std::mem::align_of::<usize>();
const MAX_VALUE_ALIGNMENT: usize = std::mem::align_of::<u64>();

type AlignedVec = AlignedByteVec<OUTPUT_ALIGNMENT>;
type InnerAlignedSerializer<Buf> =
    BaseSerializer<Buf, OUTPUT_ALIGNMENT, VALUE_ALIGNMENT, MAX_VALUE_ALIGNMENT>;

pub struct AlignedSerializerFastStrings<Buf: Borrow<AlignedVec> + BorrowMut<AlignedVec>> {
    inner: InnerAlignedSerializer<Buf>,
    string_lengths: Vec<u32>,
    string_data: Vec<u8>,
}

impl<Buf: Borrow<AlignedVec> + BorrowMut<AlignedVec>> AlignedSerializerFastStrings<Buf> {
    pub fn serialize<T: Serialize<Self>>(
        t: &T,
        mut buf: Buf,
        num_strings: usize,
        string_data_len: usize,
    ) {
        // Reserve 8 bytes for pointer to strings + len.
        // Sufficient capacity has been requested above.
        // We ensure `pos` is left at multiple of `VALUE_ALIGNMENT`.
        let required_capacity = cmp::max(8, VALUE_ALIGNMENT);
        assert!(buf.borrow().capacity() >= required_capacity);
        unsafe { buf.borrow_mut().set_len(required_capacity) };

        let mut serializer = Self {
            inner: InnerAlignedSerializer::from_vec(buf),
            string_lengths: Vec::with_capacity(num_strings),
            string_data: Vec::with_capacity(string_data_len),
        };
        serializer.serialize_value(t);

        let mut inner = serializer.inner.into_vec();
        let string_lengths = serializer.string_lengths;
        let string_data = serializer.string_data;
        let buf = inner.borrow_mut();

        // Get position we're writing string data at
        let pos = buf.len();

        // Reserve space for string data (lengths and strings themselves)
        let bytes = string_lengths.len() * 4 + string_data.len();
        buf.reserve(bytes);

        unsafe {
            // Write string lengths
            let src = string_lengths.as_ptr();
            let dst = buf.as_mut_ptr() as *mut u32;
            ptr::copy_nonoverlapping(src, dst, string_lengths.len());

            // Write string data
            let src = string_data.as_ptr();
            let dst = buf.as_mut_ptr();
            ptr::copy_nonoverlapping(src, dst, string_data.len());

            buf.set_len(pos + bytes);

            // Write position of string length data + number of strings at start
            // of buffer (each as a `u32`)
            (buf.as_mut_ptr() as *mut u32).write(pos as u32);
            (buf.as_mut_ptr().offset(4) as *mut u32).write(string_lengths.len() as u32);
        }
    }
}

impl<Buf: Borrow<AlignedVec> + BorrowMut<AlignedVec>> AstSerializer
    for AlignedSerializerFastStrings<Buf>
{
    type InnerSerializer = InnerAlignedSerializer<Buf>;

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

pub struct AlignedSerializerFastStringsDeduped<Buf: Borrow<AlignedVec> + BorrowMut<AlignedVec>> {
    inner: InnerAlignedSerializer<Buf>,
    string_lengths: Vec<u32>,
    string_data: Vec<u8>,
    string_lookup: HashMap<&'static JsWord, u32>,
}

impl<Buf: Borrow<AlignedVec> + BorrowMut<AlignedVec>> AlignedSerializerFastStringsDeduped<Buf> {
    pub fn serialize<T: Serialize<Self>>(
        t: &T,
        mut buf: Buf,
        num_strings: usize,
        string_data_len: usize,
    ) {
        // Reserve 8 bytes for pointer to strings + len.
        // Sufficient capacity has been requested above.
        // We ensure `pos` is left at multiple of `VALUE_ALIGNMENT`.
        let required_capacity = cmp::max(8, VALUE_ALIGNMENT);
        assert!(buf.borrow().capacity() >= required_capacity);
        unsafe { buf.borrow_mut().set_len(required_capacity) };

        let mut serializer = Self {
            inner: InnerAlignedSerializer::from_vec(buf),
            string_lengths: Vec::with_capacity(num_strings),
            string_data: Vec::with_capacity(string_data_len),
            string_lookup: HashMap::with_capacity(num_strings),
        };
        serializer.serialize_value(t);

        let mut inner = serializer.inner.into_vec();
        let string_lengths = serializer.string_lengths;
        let string_data = serializer.string_data;
        let buf = inner.borrow_mut();

        // Get position we're writing string data at
        let pos = buf.len();

        // Reserve space for string data (lengths and strings themselves)
        let bytes = string_lengths.len() * 4 + string_data.len();
        buf.reserve(bytes);

        unsafe {
            // Write string lengths
            let src = string_lengths.as_ptr();
            let dst = buf.as_mut_ptr() as *mut u32;
            ptr::copy_nonoverlapping(src, dst, string_lengths.len());

            // Write string data
            let src = string_data.as_ptr();
            let dst = buf.as_mut_ptr();
            ptr::copy_nonoverlapping(src, dst, string_data.len());

            buf.set_len(pos + bytes);

            // Write position of string length data + number of strings at start
            // of buffer (each as a `u32`)
            (buf.as_mut_ptr() as *mut u32).write(pos as u32);
            (buf.as_mut_ptr().offset(4) as *mut u32).write(string_lengths.len() as u32);
        }
    }
}

impl<Buf: Borrow<AlignedVec> + BorrowMut<AlignedVec>> AstSerializer
    for AlignedSerializerFastStringsDeduped<Buf>
{
    type InnerSerializer = InnerAlignedSerializer<Buf>;

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

pub struct AlignedSerializer<Buf: Borrow<AlignedVec> + BorrowMut<AlignedVec>> {
    inner: InnerAlignedSerializer<Buf>,
}

impl<Buf: Borrow<AlignedVec> + BorrowMut<AlignedVec>> AlignedSerializer<Buf> {
    pub fn serialize<T: Serialize<Self>>(t: &T, buf: Buf) {
        let mut serializer = Self {
            inner: InnerAlignedSerializer::from_vec(buf),
        };
        serializer.serialize_value(t);
    }
}

impl<Buf: Borrow<AlignedVec> + BorrowMut<AlignedVec>> AstSerializer for AlignedSerializer<Buf> {
    type InnerSerializer = InnerAlignedSerializer<Buf>;

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

pub struct AlignedSerializerNoStrings<Buf: Borrow<AlignedVec> + BorrowMut<AlignedVec>> {
    inner: InnerAlignedSerializer<Buf>,
}

impl<Buf: Borrow<AlignedVec> + BorrowMut<AlignedVec>> AlignedSerializerNoStrings<Buf> {
    pub fn serialize<T: Serialize<Self>>(t: &T, buf: Buf) {
        let mut serializer = Self {
            inner: InnerAlignedSerializer::from_vec(buf),
        };
        serializer.serialize_value(t);
    }
}

impl<Buf: Borrow<AlignedVec> + BorrowMut<AlignedVec>> AstSerializer
    for AlignedSerializerNoStrings<Buf>
{
    type InnerSerializer = InnerAlignedSerializer<Buf>;

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
pub struct UnalignedSerializer<Buf: Borrow<Vec<u8>> + BorrowMut<Vec<u8>>> {
    inner: BaseUnalignedSerializer<Buf>,
}

impl<Buf: Borrow<Vec<u8>> + BorrowMut<Vec<u8>>> UnalignedSerializer<Buf> {
    pub fn serialize<T: Serialize<Self>>(t: &T, buf: Buf) {
        let mut serializer = Self {
            inner: BaseUnalignedSerializer::from_vec(buf),
        };
        serializer.serialize_value(t);
    }
}

impl<Buf: Borrow<Vec<u8>> + BorrowMut<Vec<u8>>> AstSerializer for UnalignedSerializer<Buf> {
    type InnerSerializer = BaseUnalignedSerializer<Buf>;

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

pub struct UnalignedSerializerNoStrings<Buf: Borrow<Vec<u8>> + BorrowMut<Vec<u8>>> {
    inner: BaseUnalignedSerializer<Buf>,
}

impl<Buf: Borrow<Vec<u8>> + BorrowMut<Vec<u8>>> UnalignedSerializerNoStrings<Buf> {
    pub fn serialize<T: Serialize<Self>>(t: &T, buf: Buf) {
        let mut serializer = Self {
            inner: BaseUnalignedSerializer::from_vec(buf),
        };
        serializer.serialize_value(t);
    }
}

impl<Buf: Borrow<Vec<u8>> + BorrowMut<Vec<u8>>> AstSerializer
    for UnalignedSerializerNoStrings<Buf>
{
    type InnerSerializer = BaseUnalignedSerializer<Buf>;

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
        impl<B: Borrow<$out> + BorrowMut<$out>> Serializer for $ty {
            #[inline]
            fn push_bytes(&mut self, bytes: &[u8]) {
                self.inner_mut().push_bytes(bytes);
            }

            #[inline]
            fn push_slice<T>(&mut self, slice: &[T]) {
                self.inner_mut().push_slice(slice);
            }

            #[inline]
            fn push_slice_raw<T>(&mut self, slice: &[T]) {
                self.inner_mut().push_slice_raw(slice);
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
impl_serializer!(AlignedSerializerFastStrings<B>, AlignedVec);
impl_serializer!(AlignedSerializerFastStringsDeduped<B>, AlignedVec);
impl_serializer!(AlignedSerializer<B>, AlignedVec);
impl_serializer!(AlignedSerializerNoStrings<B>, AlignedVec);
impl_serializer!(UnalignedSerializer<B>, Vec<u8>);
impl_serializer!(UnalignedSerializerNoStrings<B>, Vec<u8>);

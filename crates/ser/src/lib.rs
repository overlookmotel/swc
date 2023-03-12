use ser_raw::Serializer;
use swc_atoms::JsWord;

/// Common trait for serializers which handle serializing ASTs.
/// Only extension is an extra method for `JsWord`s.
pub trait AstSerializer: Serializer {
    fn serialize_js_word(&mut self, js_word: &JsWord);
}

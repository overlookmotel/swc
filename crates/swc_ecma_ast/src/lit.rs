use std::{
    borrow::Cow,
    fmt::{self, Display, Formatter},
    hash::{Hash, Hasher},
    mem,
};

use num_bigint::BigInt as BigIntValue;
use swc_atoms::{js_word, JsWord};
use swc_common::{ast_node, util::take::Take, EqIgnoreSpan, Span, DUMMY_SP};

use crate::jsx::JSXText;

#[ast_node]
#[derive(Eq, Hash, EqIgnoreSpan)]
#[cfg_attr(feature = "arbitrary", derive(arbitrary::Arbitrary))]
pub enum Lit {
    #[tag("StringLiteral")]
    Str(Str),

    #[tag("BooleanLiteral")]
    Bool(Bool),

    #[tag("NullLiteral")]
    Null(Null),

    #[tag("NumericLiteral")]
    Num(Number),

    #[tag("BigIntLiteral")]
    BigInt(BigInt),

    #[tag("RegExpLiteral")]
    Regex(Regex),

    #[tag("JSXText")]
    JSXText(JSXText),
}

macro_rules! bridge_lit_from {
    ($bridge: ty, $src:ty) => {
        bridge_expr_from!(crate::Lit, $src);
        bridge_from!(Lit, $bridge, $src);
    };
}

bridge_expr_from!(Lit, Str);
bridge_expr_from!(Lit, Bool);
bridge_expr_from!(Lit, Number);
bridge_expr_from!(Lit, BigInt);
bridge_expr_from!(Lit, Regex);
bridge_expr_from!(Lit, Null);
bridge_expr_from!(Lit, JSXText);

bridge_lit_from!(Str, &'_ str);
bridge_lit_from!(Str, JsWord);
bridge_lit_from!(Str, Cow<'_, str>);
bridge_lit_from!(Str, String);
bridge_lit_from!(Bool, bool);
bridge_lit_from!(Number, f64);
bridge_lit_from!(Number, usize);
bridge_lit_from!(BigInt, BigIntValue);

#[ast_node("BigIntLiteral")]
#[derive(Eq, Hash)]
pub struct BigInt {
    pub span: Span,
    #[cfg_attr(feature = "rkyv", with(EncodeBigInt))]
    #[cfg_attr(feature = "abomonation", unsafe_abomonate_with(BigIntProxy))]
    #[cfg_attr(feature = "ser_raw", ser_raw_with(BigIntProxy))]
    pub value: BigIntValue,

    /// Use `None` value only for transformations to avoid recalculate
    /// characters in big integer
    #[cfg_attr(feature = "rkyv", with(crate::EncodeJsWord))]
    #[cfg_attr(feature = "abomonation", unsafe_abomonate_with(crate::JsWordOptProxy))]
    #[cfg_attr(feature = "ser_raw", ser_raw_with(crate::JsWordOptProxy))]
    pub raw: Option<JsWord>,
}

impl EqIgnoreSpan for BigInt {
    fn eq_ignore_span(&self, other: &Self) -> bool {
        self.value == other.value
    }
}

#[cfg(feature = "rkyv")]
#[derive(Debug, Clone, Copy)]
pub struct EncodeBigInt;

#[cfg(feature = "rkyv")]
impl rkyv::with::ArchiveWith<BigIntValue> for EncodeBigInt {
    type Archived = rkyv::Archived<String>;
    type Resolver = rkyv::Resolver<String>;

    unsafe fn resolve_with(
        field: &BigIntValue,
        pos: usize,
        resolver: Self::Resolver,
        out: *mut Self::Archived,
    ) {
        use rkyv::Archive;

        let s = field.to_string();
        s.resolve(pos, resolver, out);
    }
}

#[cfg(feature = "rkyv")]
impl<S> rkyv::with::SerializeWith<BigIntValue, S> for EncodeBigInt
where
    S: ?Sized + rkyv::ser::Serializer,
{
    fn serialize_with(field: &BigIntValue, serializer: &mut S) -> Result<Self::Resolver, S::Error> {
        let field = field.to_string();
        rkyv::string::ArchivedString::serialize_from_str(&field, serializer)
    }
}

#[cfg(feature = "rkyv")]
impl<D> rkyv::with::DeserializeWith<rkyv::Archived<String>, BigIntValue, D> for EncodeBigInt
where
    D: ?Sized + rkyv::Fallible,
{
    fn deserialize_with(
        field: &rkyv::Archived<String>,
        deserializer: &mut D,
    ) -> Result<BigIntValue, D::Error> {
        use rkyv::Deserialize;

        let s: String = field.deserialize(deserializer)?;

        Ok(s.parse().unwrap())
    }
}

#[cfg(feature = "arbitrary")]
#[cfg_attr(docsrs, doc(cfg(feature = "arbitrary")))]
impl<'a> arbitrary::Arbitrary<'a> for BigInt {
    fn arbitrary(u: &mut arbitrary::Unstructured<'_>) -> arbitrary::Result<Self> {
        let span = u.arbitrary()?;
        let value = u.arbitrary::<usize>()?.into();
        let raw = Some(u.arbitrary::<String>()?.into());

        Ok(Self { span, value, raw })
    }
}

impl From<BigIntValue> for BigInt {
    #[inline]
    fn from(value: BigIntValue) -> Self {
        BigInt {
            span: DUMMY_SP,
            value,
            raw: None,
        }
    }
}

#[cfg(any(feature = "abomonation", feature = "ser_raw"))]
#[derive(Debug, Clone, Copy)]
struct BigIntProxy;

#[cfg(any(feature = "abomonation", feature = "ser_raw"))]
use std::{
    io::{Result as IOResult, Write},
    ptr,
};

#[cfg(any(feature = "abomonation", feature = "ser_raw"))]
use num_bigint::Sign;

#[cfg(any(feature = "abomonation", feature = "ser_raw"))]
const U32_LEN: usize = std::mem::size_of::<u32>();

#[cfg(any(feature = "abomonation", feature = "ser_raw"))]
const U8_LEN: usize = std::mem::size_of::<u8>();

#[cfg(feature = "abomonation")]
impl BigIntProxy {
    #[inline]
    fn entomb_with<W: Write>(bigint: &BigIntValue, write: &mut W) -> IOResult<()> {
        // Write length as u32, then sign as u8, then body
        let body_bytes = bigint.magnitude().to_bytes_le();
        let len = body_bytes.len() as u32;
        write.write_all(&len.to_le_bytes())?;

        let sign_byte: u8 = match bigint.sign() {
            Sign::Minus => 0,
            Sign::NoSign => 1,
            Sign::Plus => 2,
        };
        write.write_all(&[sign_byte])?;

        write.write_all(&body_bytes)?;

        Ok(())
    }

    #[inline]
    fn extent_with(bigint: &BigIntValue) -> usize {
        U32_LEN + U8_LEN + bigint.magnitude().to_bytes_le().len()
    }

    #[inline]
    fn exhume_with<'a, 'b>(
        bigint: &'a mut BigIntValue,
        bytes: &'b mut [u8],
    ) -> Option<&'b mut [u8]> {
        if bytes.len() < U32_LEN + U8_LEN {
            None
        } else {
            let (len_bytes, rest) = bytes.split_at_mut(U32_LEN);
            let len_bytes: [u8; U32_LEN] = [len_bytes[0], len_bytes[1], len_bytes[2], len_bytes[3]];
            let len = u32::from_le_bytes(len_bytes) as usize;

            if rest.len() < len + U8_LEN {
                None
            } else {
                let (sign_bytes, rest) = rest.split_at_mut(U8_LEN);
                let sign = match sign_bytes[0] {
                    0 => Sign::Minus,
                    1 => Sign::NoSign,
                    2 => Sign::Plus,
                    _ => {
                        return None;
                    }
                };

                let (body_bytes, rest) = rest.split_at_mut(len);
                let bigint_new = BigIntValue::from_bytes_le(sign, body_bytes);

                unsafe {
                    ptr::write(bigint, bigint_new);
                }
                Some(rest)
            }
        }
    }
}

#[cfg(feature = "ser_raw")]
impl ser_raw::SerializeWith<BigIntValue> for BigIntProxy {
    fn serialize_data_with<S: ser_raw::Serializer>(bigint: &BigIntValue, serializer: &mut S) {
        // Write length as u32, then sign as u8, then body
        let body_bytes = bigint.magnitude().to_bytes_le();
        let len = body_bytes.len() as u32;
        serializer.push_bytes(&len.to_le_bytes());

        let sign_byte: u8 = match bigint.sign() {
            Sign::Minus => 0,
            Sign::NoSign => 1,
            Sign::Plus => 2,
        };
        serializer.push_bytes(&[sign_byte]);

        serializer.push_bytes(&body_bytes);
    }
}

/// A string literal.
#[ast_node("StringLiteral")]
#[derive(Eq, Hash)]
pub struct Str {
    pub span: Span,

    #[cfg_attr(feature = "rkyv", with(crate::EncodeJsWord))]
    #[cfg_attr(feature = "abomonation", unsafe_abomonate_with(crate::JsWordProxy))]
    #[cfg_attr(feature = "ser_raw", ser_raw_with(crate::JsWordProxy))]
    pub value: JsWord,

    /// Use `None` value only for transformations to avoid recalculate escaped
    /// characters in strings
    #[cfg_attr(feature = "rkyv", with(crate::EncodeJsWord))]
    #[cfg_attr(feature = "abomonation", unsafe_abomonate_with(crate::JsWordOptProxy))]
    #[cfg_attr(feature = "ser_raw", ser_raw_with(crate::JsWordOptProxy))]
    pub raw: Option<JsWord>,
}

impl Take for Str {
    fn dummy() -> Self {
        Str {
            span: DUMMY_SP,
            value: js_word!(""),
            raw: None,
        }
    }
}

#[cfg(feature = "arbitrary")]
#[cfg_attr(docsrs, doc(cfg(feature = "arbitrary")))]
impl<'a> arbitrary::Arbitrary<'a> for Str {
    fn arbitrary(u: &mut arbitrary::Unstructured<'_>) -> arbitrary::Result<Self> {
        let span = u.arbitrary()?;
        let value = u.arbitrary::<String>()?.into();
        let raw = Some(u.arbitrary::<String>()?.into());

        Ok(Self { span, value, raw })
    }
}

impl Str {
    #[inline]
    pub fn is_empty(&self) -> bool {
        self.value.is_empty()
    }
}

impl EqIgnoreSpan for Str {
    fn eq_ignore_span(&self, other: &Self) -> bool {
        self.value == other.value
    }
}

impl From<JsWord> for Str {
    #[inline]
    fn from(value: JsWord) -> Self {
        Str {
            span: DUMMY_SP,
            value,
            raw: None,
        }
    }
}

bridge_from!(Str, JsWord, &'_ str);
bridge_from!(Str, JsWord, String);
bridge_from!(Str, JsWord, Cow<'_, str>);

/// A boolean literal.
///
///
/// # Creation
///
/// If you are creating a boolean literal with a dummy span, please use
/// `true.into()` or `false.into()`, instead of creating this struct directly.
///
/// All of `Box<Expr>`, `Expr`, `Lit`, `Bool` implements `From<bool>`.
#[ast_node("BooleanLiteral")]
#[derive(Copy, Eq, Hash, EqIgnoreSpan)]
#[cfg_attr(feature = "arbitrary", derive(arbitrary::Arbitrary))]
pub struct Bool {
    pub span: Span,
    pub value: bool,
}

impl Take for Bool {
    fn dummy() -> Self {
        Bool {
            span: DUMMY_SP,
            value: false,
        }
    }
}

impl From<bool> for Bool {
    #[inline]
    fn from(value: bool) -> Self {
        Bool {
            span: DUMMY_SP,
            value,
        }
    }
}

#[ast_node("NullLiteral")]
#[derive(Copy, Eq, Hash, EqIgnoreSpan)]
#[cfg_attr(feature = "arbitrary", derive(arbitrary::Arbitrary))]
pub struct Null {
    pub span: Span,
}

impl Take for Null {
    fn dummy() -> Self {
        Null { span: DUMMY_SP }
    }
}

#[ast_node("RegExpLiteral")]
#[derive(Eq, Hash, EqIgnoreSpan)]
pub struct Regex {
    pub span: Span,

    #[serde(rename = "pattern")]
    #[cfg_attr(feature = "rkyv", with(crate::EncodeJsWord))]
    #[cfg_attr(feature = "abomonation", unsafe_abomonate_with(crate::JsWordProxy))]
    #[cfg_attr(feature = "ser_raw", ser_raw_with(crate::JsWordProxy))]
    pub exp: JsWord,

    #[serde(default)]
    #[cfg_attr(feature = "rkyv", with(crate::EncodeJsWord))]
    #[cfg_attr(feature = "abomonation", unsafe_abomonate_with(crate::JsWordProxy))]
    #[cfg_attr(feature = "ser_raw", ser_raw_with(crate::JsWordProxy))]
    pub flags: JsWord,
}

impl Take for Regex {
    fn dummy() -> Self {
        Self {
            span: DUMMY_SP,
            exp: Default::default(),
            flags: Default::default(),
        }
    }
}

#[cfg(feature = "arbitrary")]
#[cfg_attr(docsrs, doc(cfg(feature = "arbitrary")))]
impl<'a> arbitrary::Arbitrary<'a> for Regex {
    fn arbitrary(u: &mut arbitrary::Unstructured<'_>) -> arbitrary::Result<Self> {
        let span = u.arbitrary()?;
        let exp = u.arbitrary::<String>()?.into();
        let flags = "".into(); // TODO

        Ok(Self { span, exp, flags })
    }
}

/// A numeric literal.
///
///
/// # Creation
///
/// If you are creating a numeric literal with a dummy span, please use
/// `literal.into()`, instead of creating this struct directly.
///
/// All of `Box<Expr>`, `Expr`, `Lit`, `Number` implements `From<64>` and
/// `From<usize>`.

#[ast_node("NumericLiteral")]
pub struct Number {
    pub span: Span,
    /// **Note**: This should not be `NaN`. Use [crate::Ident] to represent NaN.
    ///
    /// If you store `NaN` in this field, a hash map will behave strangely.
    pub value: f64,

    /// Use `None` value only for transformations to avoid recalculate
    /// characters in number literal
    #[cfg_attr(feature = "rkyv", with(crate::EncodeJsWord))]
    #[cfg_attr(feature = "abomonation", unsafe_abomonate_with(crate::JsWordOptProxy))]
    #[cfg_attr(feature = "ser_raw", ser_raw_with(crate::JsWordOptProxy))]
    pub raw: Option<JsWord>,
}

impl Eq for Number {}

impl EqIgnoreSpan for Number {
    fn eq_ignore_span(&self, other: &Self) -> bool {
        self.value == other.value
    }
}

#[allow(clippy::derive_hash_xor_eq)]
#[allow(clippy::transmute_float_to_int)]
impl Hash for Number {
    fn hash<H: Hasher>(&self, state: &mut H) {
        fn integer_decode(val: f64) -> (u64, i16, i8) {
            let bits: u64 = unsafe { mem::transmute(val) };
            let sign: i8 = if bits >> 63 == 0 { 1 } else { -1 };
            let mut exponent: i16 = ((bits >> 52) & 0x7ff) as i16;
            let mantissa = if exponent == 0 {
                (bits & 0xfffffffffffff) << 1
            } else {
                (bits & 0xfffffffffffff) | 0x10000000000000
            };

            exponent -= 1023 + 52;
            (mantissa, exponent, sign)
        }

        self.span.hash(state);
        integer_decode(self.value).hash(state);
        self.raw.hash(state);
    }
}

impl Display for Number {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        if self.value.is_infinite() {
            if self.value.is_sign_positive() {
                Display::fmt("Infinity", f)
            } else {
                Display::fmt("-Infinity", f)
            }
        } else {
            Display::fmt(&self.value, f)
        }
    }
}

#[cfg(feature = "arbitrary")]
#[cfg_attr(docsrs, doc(cfg(feature = "arbitrary")))]
impl<'a> arbitrary::Arbitrary<'a> for Number {
    fn arbitrary(u: &mut arbitrary::Unstructured<'_>) -> arbitrary::Result<Self> {
        let span = u.arbitrary()?;
        let value = u.arbitrary::<f64>()?;
        let raw = Some(u.arbitrary::<String>()?.into());

        Ok(Self { span, value, raw })
    }
}

impl From<f64> for Number {
    #[inline]
    fn from(value: f64) -> Self {
        Number {
            span: DUMMY_SP,
            value,
            raw: None,
        }
    }
}

impl From<usize> for Number {
    #[inline]
    fn from(value: usize) -> Self {
        Number {
            span: DUMMY_SP,
            value: value as _,
            raw: None,
        }
    }
}

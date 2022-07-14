// Wrapper around `JsWord` type created by `string_cache`
// which allows implementing rkyv's traits on the type.
// Not possible without local wrapper as cannot implement
// foreign traits on a foreign type.

use std::{
    borrow::Cow,
    cmp::Ordering,
    fmt::{self, Debug, Display, Formatter},
    hash::{Hash, Hasher},
    ops::Deref,
};

include!(concat!(env!("OUT_DIR"), "/js_word.rs"));

pub type JsWordInner = string_cache::Atom<JsWordStaticSet>;

#[derive(PartialEq, Eq, Default)]
pub struct JsWord {
    inner: JsWordInner,
}

// Delegate all trait methods to JsWordInner

// Defined in string_cache src/atom.rs

impl JsWord {
    #[inline(always)]
    #[doc(hidden)]
    pub const fn pack_static(n: u32) -> Self {
        JsWord {
            inner: JsWordInner::pack_static(n),
        }
    }

    #[doc(hidden)]
    pub fn unsafe_data(&self) -> u64 {
        self.inner.unsafe_data()
    }

    #[doc(hidden)]
    pub fn is_static(&self) -> bool {
        self.inner.is_static()
    }

    #[doc(hidden)]
    pub fn is_dynamic(&self) -> bool {
        self.inner.is_dynamic()
    }

    #[doc(hidden)]
    pub fn is_inline(&self) -> bool {
        self.inner.is_inline()
    }

    pub fn get_hash(&self) -> u32 {
        self.inner.get_hash()
    }

    pub fn try_static(string_to_add: &str) -> Option<Self> {
        JsWordInner::try_static(string_to_add).map(|inner| JsWord { inner })
    }
}

// `Default` is derived

#[allow(clippy::derive_hash_xor_eq)]
impl Hash for JsWord {
    #[inline]
    fn hash<H>(&self, state: &mut H)
    where
        H: Hasher,
    {
        self.inner.hash(state)
    }
}

impl<'a> From<Cow<'a, str>> for JsWord {
    fn from(string_to_add: Cow<'a, str>) -> Self {
        JsWord {
            inner: JsWordInner::from(string_to_add),
        }
    }
}

impl Clone for JsWord {
    #[inline(always)]
    fn clone(&self) -> Self {
        JsWord {
            inner: self.inner.clone(),
        }
    }
}

// No need to implement `Drop`

impl Deref for JsWord {
    type Target = str;

    #[inline]
    fn deref(&self) -> &str {
        self.inner.deref()
    }
}

impl Debug for JsWord {
    #[inline]
    fn fmt(&self, f: &mut Formatter) -> fmt::Result {
        Debug::fmt(&self.inner, f)
    }
}

impl PartialOrd for JsWord {
    #[inline]
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        self.inner.partial_cmp(&other.inner)
    }
}

impl Ord for JsWord {
    #[inline]
    fn cmp(&self, other: &Self) -> Ordering {
        self.inner.cmp(&other.inner)
    }
}

impl JsWord {
    pub fn to_ascii_uppercase(&self) -> Self {
        JsWord {
            inner: self.inner.to_ascii_uppercase(),
        }
    }

    pub fn to_ascii_lowercase(&self) -> Self {
        JsWord {
            inner: self.inner.to_ascii_lowercase(),
        }
    }

    pub fn eq_ignore_ascii_case(&self, other: &Self) -> bool {
        self.inner.eq_ignore_ascii_case(&other.inner)
    }

    pub fn eq_str_ignore_ascii_case(&self, other: &str) -> bool {
        self.inner.eq_str_ignore_ascii_case(other)
    }
}

// Defined in string_cache src/trivial_impls.rs

impl ::precomputed_hash::PrecomputedHash for JsWord {
    fn precomputed_hash(&self) -> u32 {
        self.inner.precomputed_hash()
    }
}

impl<'a> From<&'a JsWord> for JsWord {
    fn from(atom: &'a Self) -> Self {
        JsWord {
            inner: JsWordInner::from(&atom.inner),
        }
    }
}

impl PartialEq<str> for JsWord {
    fn eq(&self, other: &str) -> bool {
        self.inner.eq(other)
    }
}

impl PartialEq<JsWord> for str {
    fn eq(&self, other: &JsWord) -> bool {
        self.eq(&other.inner)
    }
}

impl PartialEq<String> for JsWord {
    fn eq(&self, other: &String) -> bool {
        self.inner.eq(other)
    }
}

impl<'a> From<&'a str> for JsWord {
    #[inline]
    fn from(string_to_add: &str) -> Self {
        JsWord {
            inner: JsWordInner::from(string_to_add),
        }
    }
}

impl From<String> for JsWord {
    #[inline]
    fn from(string_to_add: String) -> Self {
        JsWord {
            inner: JsWordInner::from(string_to_add),
        }
    }
}

impl Display for JsWord {
    #[inline]
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        Display::fmt(&self.inner, f)
    }
}

impl AsRef<str> for JsWord {
    fn as_ref(&self) -> &str {
        self.inner.as_ref()
    }
}

impl serde::Serialize for JsWord {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        self.inner.serialize(serializer)
    }
}

impl<'a> serde::Deserialize<'a> for JsWord {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'a>,
    {
        use serde::de;

        struct AtomVisitor;

        impl<'de> de::Visitor<'de> for AtomVisitor {
            type Value = JsWord;

            fn expecting(&self, formatter: &mut fmt::Formatter) -> fmt::Result {
                write!(formatter, "an Atom")
            }

            fn visit_str<E>(self, v: &str) -> Result<Self::Value, E>
            where
                E: de::Error,
            {
                Ok(JsWord::from(v))
            }

            fn visit_string<E>(self, v: String) -> Result<Self::Value, E>
            where
                E: de::Error,
            {
                Ok(JsWord::from(v))
            }
        }

        deserializer.deserialize_str(AtomVisitor)
    }
}

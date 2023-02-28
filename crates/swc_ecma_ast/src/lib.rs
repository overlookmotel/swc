#![cfg_attr(docsrs, feature(doc_cfg))]
#![deny(unreachable_patterns)]
#![deny(missing_copy_implementations)]
#![deny(trivial_casts)]
#![deny(trivial_numeric_casts)]
#![deny(unreachable_pub)]
#![deny(clippy::all)]
#![allow(clippy::enum_variant_names)]
#![allow(clippy::clone_on_copy)]
#![recursion_limit = "1024"]

// #![deny(variant_size_differences)]

use serde::{Deserialize, Serialize};
use swc_common::{ast_node, EqIgnoreSpan, Span};

pub use self::{
    class::{
        Class, ClassMember, ClassMethod, ClassProp, Constructor, Decorator, MethodKind,
        PrivateMethod, PrivateProp, StaticBlock,
    },
    decl::{ClassDecl, Decl, FnDecl, VarDecl, VarDeclKind, VarDeclarator},
    expr::{
        ArrayLit, ArrowExpr, AssignExpr, AwaitExpr, BinExpr, BlockStmtOrExpr, CallExpr, Callee,
        ClassExpr, CondExpr, Expr, ExprOrSpread, FnExpr, Import, MemberExpr, MemberProp,
        MetaPropExpr, MetaPropKind, NewExpr, ObjectLit, OptCall, OptChainBase, OptChainExpr,
        ParenExpr, PatOrExpr, PropOrSpread, SeqExpr, SpreadElement, Super, SuperProp,
        SuperPropExpr, TaggedTpl, ThisExpr, Tpl, TplElement, UnaryExpr, UpdateExpr, YieldExpr,
    },
    function::{Function, Param, ParamOrTsParamProp},
    ident::{BindingIdent, Id, Ident, IdentExt, PrivateName},
    jsx::{
        JSXAttr, JSXAttrName, JSXAttrOrSpread, JSXAttrValue, JSXClosingElement, JSXClosingFragment,
        JSXElement, JSXElementChild, JSXElementName, JSXEmptyExpr, JSXExpr, JSXExprContainer,
        JSXFragment, JSXMemberExpr, JSXNamespacedName, JSXObject, JSXOpeningElement,
        JSXOpeningFragment, JSXSpreadChild, JSXText,
    },
    list::ListFormat,
    lit::{BigInt, Bool, Lit, Null, Number, Regex, Str},
    module::{Module, ModuleItem, Program, Script},
    module_decl::{
        DefaultDecl, ExportAll, ExportDecl, ExportDefaultDecl, ExportDefaultExpr,
        ExportDefaultSpecifier, ExportNamedSpecifier, ExportNamespaceSpecifier, ExportSpecifier,
        ImportDecl, ImportDefaultSpecifier, ImportNamedSpecifier, ImportSpecifier,
        ImportStarAsSpecifier, ModuleDecl, ModuleExportName, NamedExport,
    },
    operators::{AssignOp, BinaryOp, UnaryOp, UpdateOp},
    pat::{
        ArrayPat, AssignPat, AssignPatProp, KeyValuePatProp, ObjectPat, ObjectPatProp, Pat, RestPat,
    },
    prop::{
        AssignProp, ComputedPropName, GetterProp, KeyValueProp, MethodProp, Prop, PropName,
        SetterProp,
    },
    source_map::{SourceMapperExt, SpanExt},
    stmt::{
        BlockStmt, BreakStmt, CatchClause, ContinueStmt, DebuggerStmt, DoWhileStmt, EmptyStmt,
        ExprStmt, ForInStmt, ForOfStmt, ForStmt, IfStmt, LabeledStmt, ReturnStmt, Stmt, SwitchCase,
        SwitchStmt, ThrowStmt, TryStmt, VarDeclOrExpr, VarDeclOrPat, WhileStmt, WithStmt,
    },
    typescript::{
        Accessibility, TruePlusMinus, TsArrayType, TsAsExpr, TsCallSignatureDecl,
        TsConditionalType, TsConstAssertion, TsConstructSignatureDecl, TsConstructorType,
        TsEntityName, TsEnumDecl, TsEnumMember, TsEnumMemberId, TsExportAssignment,
        TsExprWithTypeArgs, TsExternalModuleRef, TsFnOrConstructorType, TsFnParam, TsFnType,
        TsGetterSignature, TsImportEqualsDecl, TsImportType, TsIndexSignature, TsIndexedAccessType,
        TsInferType, TsInstantiation, TsInterfaceBody, TsInterfaceDecl, TsIntersectionType,
        TsKeywordType, TsKeywordTypeKind, TsLit, TsLitType, TsMappedType, TsMethodSignature,
        TsModuleBlock, TsModuleDecl, TsModuleName, TsModuleRef, TsNamespaceBody, TsNamespaceDecl,
        TsNamespaceExportDecl, TsNonNullExpr, TsOptionalType, TsParamProp, TsParamPropParam,
        TsParenthesizedType, TsPropertySignature, TsQualifiedName, TsRestType, TsSetterSignature,
        TsThisType, TsThisTypeOrIdent, TsTplLitType, TsTupleElement, TsTupleType, TsType,
        TsTypeAliasDecl, TsTypeAnn, TsTypeAssertion, TsTypeElement, TsTypeLit, TsTypeOperator,
        TsTypeOperatorOp, TsTypeParam, TsTypeParamDecl, TsTypeParamInstantiation, TsTypePredicate,
        TsTypeQuery, TsTypeQueryExpr, TsTypeRef, TsUnionOrIntersectionType, TsUnionType,
    },
};

#[macro_use]
mod macros;
mod class;
mod decl;
mod expr;
mod function;
mod ident;
mod jsx;
mod list;
mod lit;
mod module;
mod module_decl;
mod operators;
mod pat;
mod prop;
mod source_map;
mod stmt;
mod typescript;

/// Represents a invalid node.
#[ast_node("Invalid")]
#[derive(Eq, Hash, Copy, EqIgnoreSpan)]
#[cfg_attr(feature = "arbitrary", derive(arbitrary::Arbitrary))]
pub struct Invalid {
    pub span: Span,
}

#[derive(Debug, Clone, Copy, Serialize, Deserialize, PartialOrd, Ord, PartialEq, Eq, Hash)]
pub enum EsVersion {
    #[serde(rename = "es3")]
    Es3,
    #[serde(rename = "es5")]
    Es5,
    #[serde(rename = "es2015")]
    Es2015,
    #[serde(rename = "es2016")]
    Es2016,
    #[serde(rename = "es2017")]
    Es2017,
    #[serde(rename = "es2018")]
    Es2018,
    #[serde(rename = "es2019")]
    Es2019,
    #[serde(rename = "es2020")]
    Es2020,
    #[serde(rename = "es2021")]
    Es2021,
    #[serde(rename = "es2022")]
    Es2022,
}

impl EsVersion {
    /// Get the latest version. This is `es2022` for now, but it will be changed
    /// if a new version of specification is released.
    pub const fn latest() -> Self {
        EsVersion::Es2022
    }
}

impl Default for EsVersion {
    fn default() -> Self {
        EsVersion::Es5
    }
}

#[cfg(feature = "rkyv")]
#[derive(Debug, Clone, Copy)]
pub struct EncodeJsWord;

#[cfg(feature = "rkyv")]
impl rkyv::with::ArchiveWith<swc_atoms::JsWord> for EncodeJsWord {
    type Archived = rkyv::Archived<String>;
    type Resolver = rkyv::Resolver<String>;

    unsafe fn resolve_with(
        field: &swc_atoms::JsWord,
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
impl<S> rkyv::with::SerializeWith<swc_atoms::JsWord, S> for EncodeJsWord
where
    S: ?Sized + rkyv::ser::Serializer,
{
    fn serialize_with(
        field: &swc_atoms::JsWord,
        serializer: &mut S,
    ) -> Result<Self::Resolver, S::Error> {
        rkyv::string::ArchivedString::serialize_from_str(field, serializer)
    }
}

#[cfg(feature = "rkyv")]
impl<D> rkyv::with::DeserializeWith<rkyv::Archived<String>, swc_atoms::JsWord, D> for EncodeJsWord
where
    D: ?Sized + rkyv::Fallible,
{
    fn deserialize_with(
        field: &rkyv::Archived<String>,
        deserializer: &mut D,
    ) -> Result<swc_atoms::JsWord, D::Error> {
        use rkyv::Deserialize;

        let s: String = field.deserialize(deserializer)?;

        Ok(s.into())
    }
}

#[cfg(feature = "rkyv")]
impl rkyv::with::ArchiveWith<Option<swc_atoms::JsWord>> for EncodeJsWord {
    type Archived = rkyv::Archived<Option<String>>;
    type Resolver = rkyv::Resolver<Option<String>>;

    unsafe fn resolve_with(
        field: &Option<swc_atoms::JsWord>,
        pos: usize,
        resolver: Self::Resolver,
        out: *mut Self::Archived,
    ) {
        use rkyv::Archive;

        let s = field.as_ref().map(|s| s.to_string());
        s.resolve(pos, resolver, out);
    }
}

#[cfg(feature = "rkyv")]
impl<S> rkyv::with::SerializeWith<Option<swc_atoms::JsWord>, S> for EncodeJsWord
where
    S: ?Sized + rkyv::ser::Serializer,
{
    fn serialize_with(
        value: &Option<swc_atoms::JsWord>,
        serializer: &mut S,
    ) -> Result<Self::Resolver, S::Error> {
        value
            .as_ref()
            .map(|value| rkyv::string::ArchivedString::serialize_from_str(value, serializer))
            .transpose()
    }
}

#[cfg(feature = "rkyv")]
impl<D> rkyv::with::DeserializeWith<rkyv::Archived<Option<String>>, Option<swc_atoms::JsWord>, D>
    for EncodeJsWord
where
    D: ?Sized + rkyv::Fallible,
{
    fn deserialize_with(
        field: &rkyv::Archived<Option<String>>,
        deserializer: &mut D,
    ) -> Result<Option<swc_atoms::JsWord>, D::Error> {
        use rkyv::Deserialize;

        let s: Option<String> = field.deserialize(deserializer)?;

        Ok(s.map(|s| s.into()))
    }
}

#[cfg(any(feature = "abomonation", feature = "ser_raw"))]
use std::{
    io::{Result as IOResult, Write},
    ptr, str,
};

#[cfg(any(feature = "abomonation", feature = "ser_raw"))]
use swc_atoms::JsWord;

#[cfg(any(feature = "abomonation", feature = "ser_raw"))]
#[derive(Debug, Clone, Copy)]
pub struct JsWordProxy;

#[cfg(any(feature = "abomonation", feature = "ser_raw"))]
const USIZE_LEN: usize = std::mem::size_of::<usize>();

#[cfg(feature = "abomonation")]
impl JsWordProxy {
    #[inline]
    fn entomb_with<W: Write>(js_word: &JsWord, write: &mut W) -> IOResult<()> {
        // `JsWord` can be static, inline or dynamic.
        // The first 2 representations are self-contained,
        // so only need to add string to output if it's dynamic.
        if js_word.is_dynamic() {
            // Write length as usize, followed by string
            let len = js_word.len();
            write.write_all(&len.to_ne_bytes())?;
            write.write_all(js_word.as_bytes())?;
        }
        Ok(())
    }

    #[inline]
    fn extent_with(js_word: &JsWord) -> usize {
        if js_word.is_dynamic() {
            USIZE_LEN + js_word.len()
        } else {
            0
        }
    }

    #[inline]
    fn exhume_with<'a, 'b>(js_word: &'a mut JsWord, bytes: &'b mut [u8]) -> Option<&'b mut [u8]> {
        // Nothing to do if string is not dynamic
        if !js_word.is_dynamic() {
            return Some(bytes);
        }

        if bytes.len() < USIZE_LEN {
            return None;
        }

        let (len_bytes, rest) = bytes.split_at_mut(USIZE_LEN);
        let len = usize::from_ne_bytes(len_bytes.try_into().unwrap());
        if rest.len() < len {
            return None;
        }

        unsafe {
            let (str_bytes, rest) = rest.split_at_mut(len);
            let s = str::from_utf8_unchecked(str_bytes);
            // This is inefficient. Could have serialized the string's hash,
            // and avoided recalculating it here. But `JsWord` has no public API
            // for creating a new `JsWord` with known hash.
            let js_word_new = JsWord::from(s);
            ptr::write(js_word, js_word_new);
            Some(rest)
        }
    }
}

#[cfg(feature = "ser_raw")]
impl ser_raw::SerializeWith<JsWord> for JsWordProxy {
    fn serialize_data_with<S: ser_raw::Serializer>(js_word: &JsWord, serializer: &mut S) {
        // `JsWord` can be static, inline or dynamic.
        // The first 2 representations are self-contained,
        // so only need to add string to output if it's dynamic.
        if js_word.is_dynamic() {
            // Write length as usize, followed by string
            serializer.push(&js_word.len());
            serializer.push_bytes(js_word.as_bytes());
        }
    }
}

#[cfg(any(feature = "abomonation", feature = "ser_raw"))]
#[derive(Debug, Clone, Copy)]
pub struct JsWordOptProxy;

#[cfg(feature = "abomonation")]
impl JsWordOptProxy {
    #[inline]
    fn entomb_with<W: Write>(js_word: &Option<JsWord>, write: &mut W) -> IOResult<()> {
        if let Some(js_word) = js_word {
            JsWordProxy::entomb_with(js_word, write)
        } else {
            Ok(())
        }
    }

    #[inline]
    fn extent_with(js_word: &Option<JsWord>) -> usize {
        if let Some(js_word) = js_word {
            JsWordProxy::extent_with(js_word)
        } else {
            0
        }
    }

    #[inline]
    fn exhume_with<'a, 'b>(
        js_word: &'a mut Option<JsWord>,
        bytes: &'b mut [u8],
    ) -> Option<&'b mut [u8]> {
        if let Some(js_word) = js_word {
            JsWordProxy::exhume_with(js_word, bytes)
        } else {
            Some(bytes)
        }
    }
}

#[cfg(feature = "ser_raw")]
impl ser_raw::SerializeWith<Option<JsWord>> for JsWordOptProxy {
    fn serialize_data_with<S: ser_raw::Serializer>(js_word: &Option<JsWord>, serializer: &mut S) {
        if let Some(js_word) = js_word {
            JsWordProxy::serialize_data_with(js_word, serializer);
        }
    }
}

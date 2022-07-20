use is_macro::Is;
use swc_atoms::JsWord;
use swc_common::{
    ast_node,
    plugin::{
        ArchivedStringCollection, StringCollection, StringCollectionResolver, WrappedSerializer,
    },
    util::take::Take,
    EqIgnoreSpan, Span, DUMMY_SP,
};

use crate::{module_decl::ModuleDecl, stmt::Stmt};

#[ast_node]
#[derive(Eq, Hash, Is, EqIgnoreSpan)]
#[cfg_attr(feature = "arbitrary", derive(arbitrary::Arbitrary))]
pub enum Program {
    #[tag("Module")]
    Module(Module),
    #[tag("Script")]
    Script(Script),
}

#[derive(rkyv::Archive, rkyv::Deserialize, rkyv::Serialize)]
#[archive_attr(repr(C))]
pub struct ProgramStringCollector {
    program: Program,
    #[cfg_attr(feature = "rkyv", with(EncodeStringCollection))]
    string_collection: StringCollection,
}

impl ProgramStringCollector {
    pub fn new(program: Program) -> Self {
        ProgramStringCollector {
            program,
            string_collection: StringCollection::default(),
        }
    }
}

#[derive(Clone, Copy)]
pub struct EncodeStringCollection;

pub struct WrappedResolver {
    resolver: StringCollectionResolver,
    string_collection: StringCollection,
}

impl rkyv::with::ArchiveWith<StringCollection> for EncodeStringCollection {
    type Archived = ArchivedStringCollection;
    type Resolver = WrappedResolver;

    unsafe fn resolve_with(
        _field: &StringCollection,
        pos: usize,
        wrapped_resolver: Self::Resolver,
        out: *mut Self::Archived,
    ) {
        use rkyv::Archive;

        wrapped_resolver
            .string_collection
            .resolve(pos, wrapped_resolver.resolver, out)
    }
}

impl<S> rkyv::with::SerializeWith<StringCollection, S> for EncodeStringCollection
where
    S: ?Sized + rkyv::ser::Serializer + rkyv::ser::ScratchSpace + WrappedSerializer,
{
    fn serialize_with(
        _: &StringCollection,
        serializer: &mut S,
    ) -> Result<Self::Resolver, S::Error> {
        use rkyv::Serialize;

        if !serializer.is_js_serializer() {
            unreachable!("serialize_with EncodeStringCollection for non-JS serializer");
        } else {
            // Substitute buff from serializer
            let string_collection = serializer.get_string_collection();

            string_collection
                .serialize(serializer)
                .map(|resolver| WrappedResolver {
                    resolver,
                    string_collection,
                })
        }
    }
}

// TODO Implement DeserializeWith

#[ast_node("Module")]
#[derive(Eq, Hash, EqIgnoreSpan)]
pub struct Module {
    pub span: Span,

    pub body: Vec<ModuleItem>,

    #[serde(default, rename = "interpreter")]
    #[cfg_attr(feature = "rkyv", with(crate::EncodeJsWord))]
    pub shebang: Option<JsWord>,
}

#[cfg(feature = "arbitrary")]
#[cfg_attr(docsrs, doc(cfg(feature = "arbitrary")))]
impl<'a> arbitrary::Arbitrary<'a> for Module {
    fn arbitrary(u: &mut arbitrary::Unstructured<'_>) -> arbitrary::Result<Self> {
        let span = u.arbitrary()?;
        let body = u.arbitrary()?;
        Ok(Self {
            span,
            body,
            shebang: None,
        })
    }
}

impl Take for Module {
    fn dummy() -> Self {
        Module {
            span: DUMMY_SP,
            body: Take::dummy(),
            shebang: Take::dummy(),
        }
    }
}

#[ast_node("Script")]
#[derive(Eq, Hash, EqIgnoreSpan)]
pub struct Script {
    pub span: Span,

    pub body: Vec<Stmt>,

    #[serde(default, rename = "interpreter")]
    #[cfg_attr(feature = "rkyv", with(crate::EncodeJsWord))]
    pub shebang: Option<JsWord>,
}

#[cfg(feature = "arbitrary")]
#[cfg_attr(docsrs, doc(cfg(feature = "arbitrary")))]
impl<'a> arbitrary::Arbitrary<'a> for Script {
    fn arbitrary(u: &mut arbitrary::Unstructured<'_>) -> arbitrary::Result<Self> {
        let span = u.arbitrary()?;
        let body = u.arbitrary()?;
        Ok(Self {
            span,
            body,
            shebang: None,
        })
    }
}

impl Take for Script {
    fn dummy() -> Self {
        Script {
            span: DUMMY_SP,
            body: Take::dummy(),
            shebang: Take::dummy(),
        }
    }
}

#[ast_node]
#[derive(Eq, Hash, Is, EqIgnoreSpan)]
#[cfg_attr(feature = "arbitrary", derive(arbitrary::Arbitrary))]
pub enum ModuleItem {
    #[tag("ImportDeclaration")]
    #[tag("ExportDeclaration")]
    #[tag("ExportNamedDeclaration")]
    #[tag("ExportDefaultDeclaration")]
    #[tag("ExportDefaultExpression")]
    #[tag("ExportAllDeclaration")]
    #[tag("TsImportEqualsDeclaration")]
    #[tag("TsExportAssignment")]
    #[tag("TsNamespaceExportDeclaration")]
    ModuleDecl(ModuleDecl),
    #[tag("*")]
    Stmt(Stmt),
}

impl Take for ModuleItem {
    fn dummy() -> Self {
        ModuleItem::Stmt(Take::dummy())
    }
}

#![feature(prelude_import)]
#![recursion_limit = "2048"]
#![allow(dead_code)]
#[prelude_import]
use std::prelude::rust_2021::*;
#[macro_use]
extern crate std;
#[macro_use]
extern crate napi_derive;
use std::{env, panic::set_hook, sync::Arc};

use backtrace::Backtrace;
use swc::Compiler;
use swc_common::{self, sync::Lazy, FilePathMapping, SourceMap};
mod bundle {
    use std::{
        panic::{catch_unwind, AssertUnwindSafe},
        sync::Arc,
    };

    use anyhow::{bail, Error};
    use napi::{
        bindgen_prelude::{AbortSignal, AsyncTask, Buffer},
        Env, Status, Task,
    };
    use serde::Deserialize;
    use swc::{
        config::SourceMapsConfig,
        resolver::{environment_resolver, paths_resolver},
        Compiler, TransformOutput,
    };
    use swc_atoms::{js_word, JsWord};
    use swc_bundler::{BundleKind, Bundler, Load, ModuleRecord, Resolve};
    use swc_common::{collections::AHashMap, Span};
    use swc_ecma_ast::{
        Bool, Expr, Ident, KeyValueProp, Lit, MemberExpr, MemberProp, MetaPropExpr, MetaPropKind,
        PropName, Str,
    };
    use swc_ecma_loader::{TargetEnv, NODE_BUILTINS};
    use swc_nodejs_common::{get_deserialized, MapErr};

    use crate::get_compiler;
    struct ConfigItem {
        loader: Box<dyn Load>,
        resolver: Box<dyn Resolve>,
        static_items: StaticConfigItem,
    }
    #[serde(rename_all = "camelCase")]
    struct StaticConfigItem {
        #[cfg(feature = "swc_v1")]
        #[serde(flatten)]
        config: swc_node_bundler::v1::Config,
    }
    #[automatically_derived]
    #[allow(unused_qualifications)]
    impl ::core::fmt::Debug for StaticConfigItem {
        fn fmt(&self, f: &mut ::core::fmt::Formatter) -> ::core::fmt::Result {
            match *self {
                Self {
                    config: ref __self_0_0,
                } => {
                    let debug_trait_builder =
                        &mut ::core::fmt::Formatter::debug_struct(f, "StaticConfigItem");
                    let _ = ::core::fmt::DebugStruct::field(
                        debug_trait_builder,
                        "config",
                        &&(*__self_0_0),
                    );
                    ::core::fmt::DebugStruct::finish(debug_trait_builder)
                }
            }
        }
    }
    #[doc(hidden)]
    #[allow(non_upper_case_globals, unused_attributes, unused_qualifications)]
    const _: () = {
        #[allow(unused_extern_crates, clippy::useless_attribute)]
        extern crate serde as _serde;
        #[automatically_derived]
        impl<'de> _serde::Deserialize<'de> for StaticConfigItem {
            fn deserialize<__D>(__deserializer: __D) -> _serde::__private::Result<Self, __D::Error>
            where
                __D: _serde::Deserializer<'de>,
            {
                #[allow(non_camel_case_types)]
                enum __Field<'de> {
                    __other(_serde::__private::de::Content<'de>),
                }
                struct __FieldVisitor;
                impl<'de> _serde::de::Visitor<'de> for __FieldVisitor {
                    type Value = __Field<'de>;

                    fn expecting(
                        &self,
                        __formatter: &mut _serde::__private::Formatter,
                    ) -> _serde::__private::fmt::Result {
                        _serde::__private::Formatter::write_str(__formatter, "field identifier")
                    }

                    fn visit_bool<__E>(
                        self,
                        __value: bool,
                    ) -> _serde::__private::Result<Self::Value, __E>
                    where
                        __E: _serde::de::Error,
                    {
                        _serde::__private::Ok(__Field::__other(
                            _serde::__private::de::Content::Bool(__value),
                        ))
                    }

                    fn visit_i8<__E>(
                        self,
                        __value: i8,
                    ) -> _serde::__private::Result<Self::Value, __E>
                    where
                        __E: _serde::de::Error,
                    {
                        _serde::__private::Ok(__Field::__other(_serde::__private::de::Content::I8(
                            __value,
                        )))
                    }

                    fn visit_i16<__E>(
                        self,
                        __value: i16,
                    ) -> _serde::__private::Result<Self::Value, __E>
                    where
                        __E: _serde::de::Error,
                    {
                        _serde::__private::Ok(__Field::__other(
                            _serde::__private::de::Content::I16(__value),
                        ))
                    }

                    fn visit_i32<__E>(
                        self,
                        __value: i32,
                    ) -> _serde::__private::Result<Self::Value, __E>
                    where
                        __E: _serde::de::Error,
                    {
                        _serde::__private::Ok(__Field::__other(
                            _serde::__private::de::Content::I32(__value),
                        ))
                    }

                    fn visit_i64<__E>(
                        self,
                        __value: i64,
                    ) -> _serde::__private::Result<Self::Value, __E>
                    where
                        __E: _serde::de::Error,
                    {
                        _serde::__private::Ok(__Field::__other(
                            _serde::__private::de::Content::I64(__value),
                        ))
                    }

                    fn visit_u8<__E>(
                        self,
                        __value: u8,
                    ) -> _serde::__private::Result<Self::Value, __E>
                    where
                        __E: _serde::de::Error,
                    {
                        _serde::__private::Ok(__Field::__other(_serde::__private::de::Content::U8(
                            __value,
                        )))
                    }

                    fn visit_u16<__E>(
                        self,
                        __value: u16,
                    ) -> _serde::__private::Result<Self::Value, __E>
                    where
                        __E: _serde::de::Error,
                    {
                        _serde::__private::Ok(__Field::__other(
                            _serde::__private::de::Content::U16(__value),
                        ))
                    }

                    fn visit_u32<__E>(
                        self,
                        __value: u32,
                    ) -> _serde::__private::Result<Self::Value, __E>
                    where
                        __E: _serde::de::Error,
                    {
                        _serde::__private::Ok(__Field::__other(
                            _serde::__private::de::Content::U32(__value),
                        ))
                    }

                    fn visit_u64<__E>(
                        self,
                        __value: u64,
                    ) -> _serde::__private::Result<Self::Value, __E>
                    where
                        __E: _serde::de::Error,
                    {
                        _serde::__private::Ok(__Field::__other(
                            _serde::__private::de::Content::U64(__value),
                        ))
                    }

                    fn visit_f32<__E>(
                        self,
                        __value: f32,
                    ) -> _serde::__private::Result<Self::Value, __E>
                    where
                        __E: _serde::de::Error,
                    {
                        _serde::__private::Ok(__Field::__other(
                            _serde::__private::de::Content::F32(__value),
                        ))
                    }

                    fn visit_f64<__E>(
                        self,
                        __value: f64,
                    ) -> _serde::__private::Result<Self::Value, __E>
                    where
                        __E: _serde::de::Error,
                    {
                        _serde::__private::Ok(__Field::__other(
                            _serde::__private::de::Content::F64(__value),
                        ))
                    }

                    fn visit_char<__E>(
                        self,
                        __value: char,
                    ) -> _serde::__private::Result<Self::Value, __E>
                    where
                        __E: _serde::de::Error,
                    {
                        _serde::__private::Ok(__Field::__other(
                            _serde::__private::de::Content::Char(__value),
                        ))
                    }

                    fn visit_unit<__E>(self) -> _serde::__private::Result<Self::Value, __E>
                    where
                        __E: _serde::de::Error,
                    {
                        _serde::__private::Ok(__Field::__other(
                            _serde::__private::de::Content::Unit,
                        ))
                    }

                    fn visit_str<__E>(
                        self,
                        __value: &str,
                    ) -> _serde::__private::Result<Self::Value, __E>
                    where
                        __E: _serde::de::Error,
                    {
                        match __value {
                            _ => {
                                let __value = _serde::__private::de::Content::String(
                                    _serde::__private::ToString::to_string(__value),
                                );
                                _serde::__private::Ok(__Field::__other(__value))
                            }
                        }
                    }

                    fn visit_bytes<__E>(
                        self,
                        __value: &[u8],
                    ) -> _serde::__private::Result<Self::Value, __E>
                    where
                        __E: _serde::de::Error,
                    {
                        match __value {
                            _ => {
                                let __value =
                                    _serde::__private::de::Content::ByteBuf(__value.to_vec());
                                _serde::__private::Ok(__Field::__other(__value))
                            }
                        }
                    }

                    fn visit_borrowed_str<__E>(
                        self,
                        __value: &'de str,
                    ) -> _serde::__private::Result<Self::Value, __E>
                    where
                        __E: _serde::de::Error,
                    {
                        match __value {
                            _ => {
                                let __value = _serde::__private::de::Content::Str(__value);
                                _serde::__private::Ok(__Field::__other(__value))
                            }
                        }
                    }

                    fn visit_borrowed_bytes<__E>(
                        self,
                        __value: &'de [u8],
                    ) -> _serde::__private::Result<Self::Value, __E>
                    where
                        __E: _serde::de::Error,
                    {
                        match __value {
                            _ => {
                                let __value = _serde::__private::de::Content::Bytes(__value);
                                _serde::__private::Ok(__Field::__other(__value))
                            }
                        }
                    }
                }
                impl<'de> _serde::Deserialize<'de> for __Field<'de> {
                    #[inline]
                    fn deserialize<__D>(
                        __deserializer: __D,
                    ) -> _serde::__private::Result<Self, __D::Error>
                    where
                        __D: _serde::Deserializer<'de>,
                    {
                        _serde::Deserializer::deserialize_identifier(__deserializer, __FieldVisitor)
                    }
                }
                struct __Visitor<'de> {
                    marker: _serde::__private::PhantomData<StaticConfigItem>,
                    lifetime: _serde::__private::PhantomData<&'de ()>,
                }
                impl<'de> _serde::de::Visitor<'de> for __Visitor<'de> {
                    type Value = StaticConfigItem;

                    fn expecting(
                        &self,
                        __formatter: &mut _serde::__private::Formatter,
                    ) -> _serde::__private::fmt::Result {
                        _serde::__private::Formatter::write_str(
                            __formatter,
                            "struct StaticConfigItem",
                        )
                    }

                    #[inline]
                    fn visit_map<__A>(
                        self,
                        mut __map: __A,
                    ) -> _serde::__private::Result<Self::Value, __A::Error>
                    where
                        __A: _serde::de::MapAccess<'de>,
                    {
                        let mut __collect = _serde::__private::Vec::<
                            _serde::__private::Option<(
                                _serde::__private::de::Content,
                                _serde::__private::de::Content,
                            )>,
                        >::new();
                        while let _serde::__private::Some(__key) =
                            match _serde::de::MapAccess::next_key::<__Field>(&mut __map) {
                                _serde::__private::Ok(__val) => __val,
                                _serde::__private::Err(__err) => {
                                    return _serde::__private::Err(__err);
                                }
                            }
                        {
                            match __key {
                                __Field::__other(__name) => {
                                    __collect.push(_serde::__private::Some((
                                        __name,
                                        match _serde::de::MapAccess::next_value(&mut __map) {
                                            _serde::__private::Ok(__val) => __val,
                                            _serde::__private::Err(__err) => {
                                                return _serde::__private::Err(__err);
                                            }
                                        },
                                    )));
                                }
                            }
                        }
                        let __field0: swc_node_bundler::v1::Config =
                            match _serde::de::Deserialize::deserialize(
                                _serde::__private::de::FlatMapDeserializer(
                                    &mut __collect,
                                    _serde::__private::PhantomData,
                                ),
                            ) {
                                _serde::__private::Ok(__val) => __val,
                                _serde::__private::Err(__err) => {
                                    return _serde::__private::Err(__err);
                                }
                            };
                        _serde::__private::Ok(StaticConfigItem { config: __field0 })
                    }
                }
                _serde::Deserializer::deserialize_map(
                    __deserializer,
                    __Visitor {
                        marker: _serde::__private::PhantomData::<StaticConfigItem>,
                        lifetime: _serde::__private::PhantomData,
                    },
                )
            }
        }
    };
    pub(crate) struct BundleTask {
        swc: Arc<swc::Compiler>,
        config: ConfigItem,
    }
    #[cfg(feature = "swc_v1")]
    impl Task for BundleTask {
        type JsValue = AHashMap<String, TransformOutput>;
        type Output = AHashMap<String, TransformOutput>;

        fn compute(&mut self) -> napi::Result<Self::Output> {
            let builtins = if let TargetEnv::Node = self.config.static_items.config.target {
                NODE_BUILTINS
                    .iter()
                    .copied()
                    .map(JsWord::from)
                    .collect::<Vec<_>>()
            } else {
                ::alloc::vec::Vec::new()
            };
            let codegen_target = self
                .config
                .static_items
                .config
                .codegen_target()
                .unwrap_or_default();
            let res = catch_unwind(AssertUnwindSafe(|| {
                let mut bundler = Bundler::new(
                    self.swc.globals(),
                    self.swc.cm.clone(),
                    &self.config.loader,
                    &self.config.resolver,
                    swc_bundler::Config {
                        require: true,
                        external_modules: builtins
                            .into_iter()
                            .chain(
                                self.config
                                    .static_items
                                    .config
                                    .external_modules
                                    .iter()
                                    .cloned(),
                            )
                            .collect(),
                        ..Default::default()
                    },
                    Box::new(Hook),
                );
                let result = bundler
                    .bundle(self.config.static_items.config.entry.clone().into())
                    .convert_err()?;
                let result = result
                    .into_iter()
                    .map(|bundle| match bundle.kind {
                        BundleKind::Named { name } | BundleKind::Lib { name } => {
                            Ok((name, bundle.module))
                        }
                        BundleKind::Dynamic => {
                            return ::anyhow::private::Err({
                                let error =
                                    ::anyhow::private::format_err(::core::fmt::Arguments::new_v1(
                                        &["unimplemented: dynamic code splitting"],
                                        &[],
                                    ));
                                error
                            })
                        }
                    })
                    .map(|res| {
                        res.and_then(|(k, m)| {
                            let minify = self
                                .config
                                .static_items
                                .config
                                .options
                                .as_ref()
                                .map(|v| v.config.minify.into_bool())
                                .unwrap_or(false);
                            let output = self.swc.print(
                                &m,
                                None,
                                None,
                                true,
                                codegen_target,
                                SourceMapsConfig::Bool(true),
                                &Default::default(),
                                None,
                                minify,
                                None,
                                true,
                                false,
                            )?;
                            Ok((k, output))
                        })
                    })
                    .collect::<Result<_, _>>()
                    .convert_err()?;
                Ok(result)
            }));
            let err = match res {
                Ok(v) => return v,
                Err(err) => err,
            };
            if let Some(s) = err.downcast_ref::<String>() {
                return Err(napi::Error::new(Status::GenericFailure, {
                    let res = ::alloc::fmt::format(::core::fmt::Arguments::new_v1(
                        &["panic detected: "],
                        &[::core::fmt::ArgumentV1::new_display(&s)],
                    ));
                    res
                }));
            }
            Err(napi::Error::new(
                Status::GenericFailure,
                "panic detected".to_string(),
            ))
        }

        fn resolve(&mut self, _env: Env, output: Self::Output) -> napi::Result<Self::JsValue> {
            Ok(output)
        }
    }
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    mod __napi_impl_helper__BundleTask__0 {
        use super::*;
        #[cfg(all(not(test), not(feature = "noop")))]
        extern "C" fn __napi_register__BundleTask_impl() {
            napi::__private::register_class(
                "BundleTask",
                None,
                "BundleTask\0",
                ::alloc::vec::Vec::new(),
            );
        }
        #[used]
        #[allow(non_upper_case_globals)]
        #[doc(hidden)]
        #[link_section = "__DATA,__mod_init_func"]
        static __napi_register__BundleTask_impl___rust_ctor___ctor: unsafe extern "C" fn() = {
            unsafe extern "C" fn __napi_register__BundleTask_impl___rust_ctor___ctor() {
                __napi_register__BundleTask_impl()
            };
            __napi_register__BundleTask_impl___rust_ctor___ctor
        };
    }
    #[cfg(feature = "swc_v1")]
    pub(crate) fn bundle(
        conf_items: Buffer,
        signal: Option<AbortSignal>,
    ) -> napi::Result<AsyncTask<BundleTask>> {
        swc_nodejs_common::init_default_trace_subscriber();
        let c: Arc<Compiler> = get_compiler();
        let static_items: StaticConfigItem = get_deserialized(&conf_items)?;
        let loader = Box::new(swc_node_bundler::loaders::swc::SwcLoader::new(
            c.clone(),
            static_items
                .config
                .options
                .as_ref()
                .cloned()
                .unwrap_or_else(|| {
                    serde_json::from_value(serde_json::Value::Object(Default::default())).unwrap()
                }),
        ));
        let target_env = static_items.config.target;
        let paths = static_items.config.options.as_ref().map(|options| {
            let paths: Vec<(String, Vec<String>)> = options
                .config
                .jsc
                .paths
                .iter()
                .map(|(k, v)| (k.clone(), v.clone()))
                .collect();
            (options.config.jsc.base_url.clone(), paths)
        });
        let alias = static_items
            .config
            .alias
            .get(&target_env)
            .cloned()
            .unwrap_or_default();
        let resolver: Box<dyn Resolve> = if let Some((base_url, paths)) = paths {
            Box::new(paths_resolver(
                target_env,
                alias,
                base_url,
                paths,
                static_items.config.preserve_symlinks,
            ))
        } else {
            Box::new(environment_resolver(
                target_env,
                alias,
                static_items.config.preserve_symlinks,
            ))
        };
        Ok(AsyncTask::with_optional_signal(
            BundleTask {
                swc: c,
                config: ConfigItem {
                    loader,
                    resolver,
                    static_items,
                },
            },
            signal,
        ))
    }
    #[cfg(feature = "swc_v1")]
    #[doc(hidden)]
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    extern "C" fn __napi__bundle(
        env: napi::bindgen_prelude::sys::napi_env,
        cb: napi::bindgen_prelude::sys::napi_callback_info,
    ) -> napi::bindgen_prelude::sys::napi_value {
        unsafe {
            napi :: bindgen_prelude :: CallbackInfo :: < 2usize > :: new (env , cb , None) . and_then (| mut cb | { let arg0 = { < Buffer as napi :: bindgen_prelude :: FromNapiValue > :: from_napi_value (env , cb . get_arg (0usize)) ? } ; let arg1 = { < Option < AbortSignal > as napi :: bindgen_prelude :: FromNapiValue > :: from_napi_value (env , cb . get_arg (1usize)) ? } ; let _ret = { bundle (arg0 , arg1) } ; match _ret { Ok (value) => napi :: bindgen_prelude :: ToNapiValue :: to_napi_value (env , value) , Err (err) => { napi :: bindgen_prelude :: JsError :: from (err) . throw_into (env) ; Ok (std :: ptr :: null_mut ()) } } }) . unwrap_or_else (| e | { napi :: bindgen_prelude :: JsError :: from (e) . throw_into (env) ; std :: ptr :: null_mut :: < napi :: bindgen_prelude :: sys :: napi_value__ > () })
        }
    }
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    unsafe fn bundle_js_function(
        env: napi::bindgen_prelude::sys::napi_env,
    ) -> napi::bindgen_prelude::Result<napi::bindgen_prelude::sys::napi_value> {
        let mut fn_ptr = std::ptr::null_mut();
        {
            let c = napi::bindgen_prelude::sys::napi_create_function(
                env,
                "bundle\0".as_ptr() as *const _,
                7usize,
                Some(__napi__bundle),
                std::ptr::null_mut(),
                &mut fn_ptr,
            );
            match c {
                ::napi::sys::Status::napi_ok => Ok(()),
                _ => Err(::napi::Error::new(::napi::Status::from(c), {
                    let res = ::alloc::fmt::format(::core::fmt::Arguments::new_v1(
                        &["Failed to register function `", "`"],
                        &[::core::fmt::ArgumentV1::new_display(&"bundle")],
                    ));
                    res
                })),
            }
        }?;
        napi::bindgen_prelude::register_js_function(
            "bundle\0",
            bundle_js_function,
            Some(__napi__bundle),
        );
        Ok(fn_ptr)
    }
    #[allow(clippy::all)]
    #[allow(non_snake_case)]
    #[cfg(all(not(test), not(feature = "noop")))]
    extern "C" fn __napi_register__bundle() {
        napi::bindgen_prelude::register_module_export(None, "bundle\0", bundle_js_function);
    }
    #[used]
    #[allow(non_upper_case_globals)]
    #[doc(hidden)]
    #[link_section = "__DATA,__mod_init_func"]
    static __napi_register__bundle___rust_ctor___ctor: unsafe extern "C" fn() = {
        unsafe extern "C" fn __napi_register__bundle___rust_ctor___ctor() {
            __napi_register__bundle()
        };
        __napi_register__bundle___rust_ctor___ctor
    };
    struct Hook;
    impl swc_bundler::Hook for Hook {
        fn get_import_meta_props(
            &self,
            span: Span,
            module_record: &ModuleRecord,
        ) -> Result<Vec<KeyValueProp>, Error> {
            let file_name = module_record.file_name.to_string();
            Ok(<[_]>::into_vec(
                #[rustc_box]
                ::alloc::boxed::Box::new([
                    KeyValueProp {
                        key: PropName::Ident(Ident::new(::swc_atoms::ATOM_JSWORD__75_72_6C, span)),
                        value: Box::new(Expr::Lit(Lit::Str(Str {
                            span,
                            raw: None,
                            value: file_name.into(),
                        }))),
                    },
                    KeyValueProp {
                        key: PropName::Ident(Ident::new(
                            ::swc_atoms::ATOM_JSWORD__6D_61_69_6E,
                            span,
                        )),
                        value: Box::new(if module_record.is_entry {
                            Expr::Member(MemberExpr {
                                span,
                                obj: Box::new(Expr::MetaProp(MetaPropExpr {
                                    span,
                                    kind: MetaPropKind::ImportMeta,
                                })),
                                prop: MemberProp::Ident(Ident::new(
                                    ::swc_atoms::ATOM_JSWORD__6D_61_69_6E,
                                    span,
                                )),
                            })
                        } else {
                            Expr::Lit(Lit::Bool(Bool { span, value: false }))
                        }),
                    },
                ]),
            ))
        }
    }
}
mod minify {
    use std::sync::Arc;

    use napi::{
        bindgen_prelude::{AbortSignal, AsyncTask, Buffer},
        Task,
    };
    use serde::Deserialize;
    use swc::{
        config::{ErrorFormat, JsMinifyOptions},
        TransformOutput,
    };
    use swc_common::{collections::AHashMap, sync::Lrc, FileName, SourceFile, SourceMap};
    use swc_nodejs_common::{deserialize_json, get_deserialized, MapErr};

    use crate::{get_compiler, util::try_with};
    struct MinifyTask {
        c: Arc<swc::Compiler>,
        code: String,
        options: String,
    }
    #[serde(untagged)]
    enum MinifyTarget {
        /// Code to minify.
        Single(String),
        /// `{ filename: code }`
        Map(AHashMap<String, String>),
    }
    #[doc(hidden)]
    #[allow(non_upper_case_globals, unused_attributes, unused_qualifications)]
    const _: () = {
        #[allow(unused_extern_crates, clippy::useless_attribute)]
        extern crate serde as _serde;
        #[automatically_derived]
        impl<'de> _serde::Deserialize<'de> for MinifyTarget {
            fn deserialize<__D>(__deserializer: __D) -> _serde::__private::Result<Self, __D::Error>
            where
                __D: _serde::Deserializer<'de>,
            {
                let __content =
                    match <_serde::__private::de::Content as _serde::Deserialize>::deserialize(
                        __deserializer,
                    ) {
                        _serde::__private::Ok(__val) => __val,
                        _serde::__private::Err(__err) => {
                            return _serde::__private::Err(__err);
                        }
                    };
                if let _serde::__private::Ok(__ok) = _serde::__private::Result::map(
                    <String as _serde::Deserialize>::deserialize(
                        _serde::__private::de::ContentRefDeserializer::<__D::Error>::new(
                            &__content,
                        ),
                    ),
                    MinifyTarget::Single,
                ) {
                    return _serde::__private::Ok(__ok);
                }
                if let _serde::__private::Ok(__ok) = _serde::__private::Result::map(
                    <AHashMap<String, String> as _serde::Deserialize>::deserialize(
                        _serde::__private::de::ContentRefDeserializer::<__D::Error>::new(
                            &__content,
                        ),
                    ),
                    MinifyTarget::Map,
                ) {
                    return _serde::__private::Ok(__ok);
                }
                _serde::__private::Err(_serde::de::Error::custom(
                    "data did not match any variant of untagged enum MinifyTarget",
                ))
            }
        }
    };
    impl MinifyTarget {
        fn to_file(&self, cm: Lrc<SourceMap>) -> Lrc<SourceFile> {
            match self {
                MinifyTarget::Single(code) => cm.new_source_file(FileName::Anon, code.clone()),
                MinifyTarget::Map(codes) => {
                    match (&codes.len(), &1) {
                        (left_val, right_val) => {
                            if !(*left_val == *right_val) {
                                let kind = ::core::panicking::AssertKind::Eq;
                                ::core::panicking::assert_failed(
                                    kind,
                                    &*left_val,
                                    &*right_val,
                                    ::core::option::Option::Some(::core::fmt::Arguments::new_v1(
                                        &["swc.minify does not support concatting multiple files \
                                           yet"],
                                        &[],
                                    )),
                                );
                            }
                        }
                    };
                    let (filename, code) = codes.iter().next().unwrap();
                    cm.new_source_file(FileName::Real(filename.clone().into()), code.clone())
                }
            }
        }
    }
    impl Task for MinifyTask {
        type JsValue = TransformOutput;
        type Output = TransformOutput;

        fn compute(&mut self) -> napi::Result<Self::Output> {
            let input: MinifyTarget = deserialize_json(&self.code)?;
            let options: JsMinifyOptions = deserialize_json(&self.options)?;
            try_with(self.c.cm.clone(), false, ErrorFormat::Normal, |handler| {
                let fm = input.to_file(self.c.cm.clone());
                self.c.minify(fm, handler, &options)
            })
            .convert_err()
        }

        fn resolve(
            &mut self,
            _env: napi::Env,
            output: Self::Output,
        ) -> napi::Result<Self::JsValue> {
            Ok(output)
        }
    }
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    mod __napi_impl_helper__MinifyTask__1 {
        use super::*;
        #[cfg(all(not(test), not(feature = "noop")))]
        extern "C" fn __napi_register__MinifyTask_impl() {
            napi::__private::register_class(
                "MinifyTask",
                None,
                "MinifyTask\0",
                ::alloc::vec::Vec::new(),
            );
        }
        #[used]
        #[allow(non_upper_case_globals)]
        #[doc(hidden)]
        #[link_section = "__DATA,__mod_init_func"]
        static __napi_register__MinifyTask_impl___rust_ctor___ctor: unsafe extern "C" fn() = {
            unsafe extern "C" fn __napi_register__MinifyTask_impl___rust_ctor___ctor() {
                __napi_register__MinifyTask_impl()
            };
            __napi_register__MinifyTask_impl___rust_ctor___ctor
        };
    }
    fn minify(code: Buffer, opts: Buffer, signal: Option<AbortSignal>) -> AsyncTask<MinifyTask> {
        swc_nodejs_common::init_default_trace_subscriber();
        let code = String::from_utf8_lossy(code.as_ref()).to_string();
        let options = String::from_utf8_lossy(opts.as_ref()).to_string();
        let c = get_compiler();
        let task = MinifyTask { c, code, options };
        AsyncTask::with_optional_signal(task, signal)
    }
    #[doc(hidden)]
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    extern "C" fn __napi__minify(
        env: napi::bindgen_prelude::sys::napi_env,
        cb: napi::bindgen_prelude::sys::napi_callback_info,
    ) -> napi::bindgen_prelude::sys::napi_value {
        unsafe {
            napi :: bindgen_prelude :: CallbackInfo :: < 3usize > :: new (env , cb , None) . and_then (| mut cb | { let arg0 = { < Buffer as napi :: bindgen_prelude :: FromNapiValue > :: from_napi_value (env , cb . get_arg (0usize)) ? } ; let arg1 = { < Buffer as napi :: bindgen_prelude :: FromNapiValue > :: from_napi_value (env , cb . get_arg (1usize)) ? } ; let arg2 = { < Option < AbortSignal > as napi :: bindgen_prelude :: FromNapiValue > :: from_napi_value (env , cb . get_arg (2usize)) ? } ; let _ret = { minify (arg0 , arg1 , arg2) } ; < AsyncTask < MinifyTask > as napi :: bindgen_prelude :: ToNapiValue > :: to_napi_value (env , _ret) }) . unwrap_or_else (| e | { napi :: bindgen_prelude :: JsError :: from (e) . throw_into (env) ; std :: ptr :: null_mut :: < napi :: bindgen_prelude :: sys :: napi_value__ > () })
        }
    }
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    unsafe fn minify_js_function(
        env: napi::bindgen_prelude::sys::napi_env,
    ) -> napi::bindgen_prelude::Result<napi::bindgen_prelude::sys::napi_value> {
        let mut fn_ptr = std::ptr::null_mut();
        {
            let c = napi::bindgen_prelude::sys::napi_create_function(
                env,
                "minify\0".as_ptr() as *const _,
                7usize,
                Some(__napi__minify),
                std::ptr::null_mut(),
                &mut fn_ptr,
            );
            match c {
                ::napi::sys::Status::napi_ok => Ok(()),
                _ => Err(::napi::Error::new(::napi::Status::from(c), {
                    let res = ::alloc::fmt::format(::core::fmt::Arguments::new_v1(
                        &["Failed to register function `", "`"],
                        &[::core::fmt::ArgumentV1::new_display(&"minify")],
                    ));
                    res
                })),
            }
        }?;
        napi::bindgen_prelude::register_js_function(
            "minify\0",
            minify_js_function,
            Some(__napi__minify),
        );
        Ok(fn_ptr)
    }
    #[allow(clippy::all)]
    #[allow(non_snake_case)]
    #[cfg(all(not(test), not(feature = "noop")))]
    extern "C" fn __napi_register__minify() {
        napi::bindgen_prelude::register_module_export(None, "minify\0", minify_js_function);
    }
    #[used]
    #[allow(non_upper_case_globals)]
    #[doc(hidden)]
    #[link_section = "__DATA,__mod_init_func"]
    static __napi_register__minify___rust_ctor___ctor: unsafe extern "C" fn() = {
        unsafe extern "C" fn __napi_register__minify___rust_ctor___ctor() {
            __napi_register__minify()
        };
        __napi_register__minify___rust_ctor___ctor
    };
    pub fn minify_sync(code: Buffer, opts: Buffer) -> napi::Result<TransformOutput> {
        swc_nodejs_common::init_default_trace_subscriber();
        let code: MinifyTarget = get_deserialized(code)?;
        let opts = get_deserialized(opts)?;
        let c = get_compiler();
        let fm = code.to_file(c.cm.clone());
        try_with(c.cm.clone(), false, ErrorFormat::Normal, |handler| {
            c.minify(fm, handler, &opts)
        })
        .convert_err()
    }
    #[doc(hidden)]
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    extern "C" fn __napi__minify_sync(
        env: napi::bindgen_prelude::sys::napi_env,
        cb: napi::bindgen_prelude::sys::napi_callback_info,
    ) -> napi::bindgen_prelude::sys::napi_value {
        unsafe {
            napi::bindgen_prelude::CallbackInfo::<2usize>::new(env, cb, None)
                .and_then(|mut cb| {
                    let arg0 = {
                        <Buffer as napi::bindgen_prelude::FromNapiValue>::from_napi_value(
                            env,
                            cb.get_arg(0usize),
                        )?
                    };
                    let arg1 = {
                        <Buffer as napi::bindgen_prelude::FromNapiValue>::from_napi_value(
                            env,
                            cb.get_arg(1usize),
                        )?
                    };
                    let _ret = { minify_sync(arg0, arg1) };
                    match _ret {
                        Ok(value) => napi::bindgen_prelude::ToNapiValue::to_napi_value(env, value),
                        Err(err) => {
                            napi::bindgen_prelude::JsError::from(err).throw_into(env);
                            Ok(std::ptr::null_mut())
                        }
                    }
                })
                .unwrap_or_else(|e| {
                    napi::bindgen_prelude::JsError::from(e).throw_into(env);
                    std::ptr::null_mut::<napi::bindgen_prelude::sys::napi_value__>()
                })
        }
    }
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    unsafe fn minify_sync_js_function(
        env: napi::bindgen_prelude::sys::napi_env,
    ) -> napi::bindgen_prelude::Result<napi::bindgen_prelude::sys::napi_value> {
        let mut fn_ptr = std::ptr::null_mut();
        {
            let c = napi::bindgen_prelude::sys::napi_create_function(
                env,
                "minifySync\0".as_ptr() as *const _,
                11usize,
                Some(__napi__minify_sync),
                std::ptr::null_mut(),
                &mut fn_ptr,
            );
            match c {
                ::napi::sys::Status::napi_ok => Ok(()),
                _ => Err(::napi::Error::new(::napi::Status::from(c), {
                    let res = ::alloc::fmt::format(::core::fmt::Arguments::new_v1(
                        &["Failed to register function `", "`"],
                        &[::core::fmt::ArgumentV1::new_display(&"minify_sync")],
                    ));
                    res
                })),
            }
        }?;
        napi::bindgen_prelude::register_js_function(
            "minifySync\0",
            minify_sync_js_function,
            Some(__napi__minify_sync),
        );
        Ok(fn_ptr)
    }
    #[allow(clippy::all)]
    #[allow(non_snake_case)]
    #[cfg(all(not(test), not(feature = "noop")))]
    extern "C" fn __napi_register__minify_sync() {
        napi::bindgen_prelude::register_module_export(
            None,
            "minifySync\0",
            minify_sync_js_function,
        );
    }
    #[used]
    #[allow(non_upper_case_globals)]
    #[doc(hidden)]
    #[link_section = "__DATA,__mod_init_func"]
    static __napi_register__minify_sync___rust_ctor___ctor: unsafe extern "C" fn() = {
        unsafe extern "C" fn __napi_register__minify_sync___rust_ctor___ctor() {
            __napi_register__minify_sync()
        };
        __napi_register__minify_sync___rust_ctor___ctor
    };
}
mod parse {
    use std::{
        path::{Path, PathBuf},
        sync::Arc,
    };

    use anyhow::Context as _;
    use napi::{
        bindgen_prelude::{AbortSignal, AsyncTask, Buffer},
        Env, Task,
    };
    use swc::{
        config::{ErrorFormat, ParseOptions},
        Compiler,
    };
    use swc_common::{
        comments::Comments,
        plugin::{PluginSerializedBytes, VersionedSerializable},
        FileName,
    };
    use swc_nodejs_common::{deserialize_json, get_deserialized, MapErr};

    use crate::{get_compiler, util::try_with};
    pub struct ParseTask {
        pub c: Arc<Compiler>,
        pub filename: FileName,
        pub src: String,
        pub options: String,
    }
    pub struct ParseFileTask {
        pub c: Arc<Compiler>,
        pub path: PathBuf,
        pub options: String,
    }
    impl Task for ParseTask {
        type JsValue = String;
        type Output = String;

        fn compute(&mut self) -> napi::Result<Self::Output> {
            let options: ParseOptions = deserialize_json(&self.options)?;
            let fm = self
                .c
                .cm
                .new_source_file(self.filename.clone(), self.src.clone());
            let comments = if options.comments {
                Some(self.c.comments() as &dyn Comments)
            } else {
                None
            };
            let program = try_with(self.c.cm.clone(), false, ErrorFormat::Normal, |handler| {
                self.c.parse_js(
                    fm,
                    handler,
                    options.target,
                    options.syntax,
                    options.is_module,
                    comments,
                )
            })
            .convert_err()?;
            let ast_json = serde_json::to_string(&program)?;
            Ok(ast_json)
        }

        fn resolve(&mut self, _env: Env, result: Self::Output) -> napi::Result<Self::JsValue> {
            Ok(result)
        }
    }
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    mod __napi_impl_helper__ParseTask__2 {
        use super::*;
        #[cfg(all(not(test), not(feature = "noop")))]
        extern "C" fn __napi_register__ParseTask_impl() {
            napi::__private::register_class(
                "ParseTask",
                None,
                "ParseTask\0",
                ::alloc::vec::Vec::new(),
            );
        }
        #[used]
        #[allow(non_upper_case_globals)]
        #[doc(hidden)]
        #[link_section = "__DATA,__mod_init_func"]
        static __napi_register__ParseTask_impl___rust_ctor___ctor: unsafe extern "C" fn() = {
            unsafe extern "C" fn __napi_register__ParseTask_impl___rust_ctor___ctor() {
                __napi_register__ParseTask_impl()
            };
            __napi_register__ParseTask_impl___rust_ctor___ctor
        };
    }
    impl Task for ParseFileTask {
        type JsValue = String;
        type Output = String;

        fn compute(&mut self) -> napi::Result<Self::Output> {
            let program = try_with(self.c.cm.clone(), false, ErrorFormat::Normal, |handler| {
                self.c.run(|| {
                    let options: ParseOptions = deserialize_json(&self.options)?;
                    let fm = self
                        .c
                        .cm
                        .load_file(&self.path)
                        .context("failed to read module")?;
                    let c = self.c.comments().clone();
                    let comments = if options.comments {
                        Some(&c as &dyn Comments)
                    } else {
                        None
                    };
                    self.c.parse_js(
                        fm,
                        handler,
                        options.target,
                        options.syntax,
                        options.is_module,
                        comments,
                    )
                })
            })
            .convert_err()?;
            let ast_json = serde_json::to_string(&program)?;
            Ok(ast_json)
        }

        fn resolve(&mut self, _env: Env, result: Self::Output) -> napi::Result<Self::JsValue> {
            Ok(result)
        }
    }
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    mod __napi_impl_helper__ParseFileTask__3 {
        use super::*;
        #[cfg(all(not(test), not(feature = "noop")))]
        extern "C" fn __napi_register__ParseFileTask_impl() {
            napi::__private::register_class(
                "ParseFileTask",
                None,
                "ParseFileTask\0",
                ::alloc::vec::Vec::new(),
            );
        }
        #[used]
        #[allow(non_upper_case_globals)]
        #[doc(hidden)]
        #[link_section = "__DATA,__mod_init_func"]
        static __napi_register__ParseFileTask_impl___rust_ctor___ctor: unsafe extern "C" fn() = {
            unsafe extern "C" fn __napi_register__ParseFileTask_impl___rust_ctor___ctor() {
                __napi_register__ParseFileTask_impl()
            };
            __napi_register__ParseFileTask_impl___rust_ctor___ctor
        };
    }
    pub fn parse(
        src: String,
        options: Buffer,
        filename: Option<String>,
        signal: Option<AbortSignal>,
    ) -> AsyncTask<ParseTask> {
        swc_nodejs_common::init_default_trace_subscriber();
        let c = get_compiler();
        let options = String::from_utf8_lossy(options.as_ref()).to_string();
        let filename = if let Some(value) = filename {
            FileName::Real(value.into())
        } else {
            FileName::Anon
        };
        AsyncTask::with_optional_signal(
            ParseTask {
                c,
                filename,
                src,
                options,
            },
            signal,
        )
    }
    #[doc(hidden)]
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    extern "C" fn __napi__parse(
        env: napi::bindgen_prelude::sys::napi_env,
        cb: napi::bindgen_prelude::sys::napi_callback_info,
    ) -> napi::bindgen_prelude::sys::napi_value {
        unsafe {
            napi :: bindgen_prelude :: CallbackInfo :: < 4usize > :: new (env , cb , None) . and_then (| mut cb | { let arg0 = { < String as napi :: bindgen_prelude :: FromNapiValue > :: from_napi_value (env , cb . get_arg (0usize)) ? } ; let arg1 = { < Buffer as napi :: bindgen_prelude :: FromNapiValue > :: from_napi_value (env , cb . get_arg (1usize)) ? } ; let arg2 = { < Option < String > as napi :: bindgen_prelude :: FromNapiValue > :: from_napi_value (env , cb . get_arg (2usize)) ? } ; let arg3 = { < Option < AbortSignal > as napi :: bindgen_prelude :: FromNapiValue > :: from_napi_value (env , cb . get_arg (3usize)) ? } ; let _ret = { parse (arg0 , arg1 , arg2 , arg3) } ; < AsyncTask < ParseTask > as napi :: bindgen_prelude :: ToNapiValue > :: to_napi_value (env , _ret) }) . unwrap_or_else (| e | { napi :: bindgen_prelude :: JsError :: from (e) . throw_into (env) ; std :: ptr :: null_mut :: < napi :: bindgen_prelude :: sys :: napi_value__ > () })
        }
    }
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    unsafe fn parse_js_function(
        env: napi::bindgen_prelude::sys::napi_env,
    ) -> napi::bindgen_prelude::Result<napi::bindgen_prelude::sys::napi_value> {
        let mut fn_ptr = std::ptr::null_mut();
        {
            let c = napi::bindgen_prelude::sys::napi_create_function(
                env,
                "parse\0".as_ptr() as *const _,
                6usize,
                Some(__napi__parse),
                std::ptr::null_mut(),
                &mut fn_ptr,
            );
            match c {
                ::napi::sys::Status::napi_ok => Ok(()),
                _ => Err(::napi::Error::new(::napi::Status::from(c), {
                    let res = ::alloc::fmt::format(::core::fmt::Arguments::new_v1(
                        &["Failed to register function `", "`"],
                        &[::core::fmt::ArgumentV1::new_display(&"parse")],
                    ));
                    res
                })),
            }
        }?;
        napi::bindgen_prelude::register_js_function(
            "parse\0",
            parse_js_function,
            Some(__napi__parse),
        );
        Ok(fn_ptr)
    }
    #[allow(clippy::all)]
    #[allow(non_snake_case)]
    #[cfg(all(not(test), not(feature = "noop")))]
    extern "C" fn __napi_register__parse() {
        napi::bindgen_prelude::register_module_export(None, "parse\0", parse_js_function);
    }
    #[used]
    #[allow(non_upper_case_globals)]
    #[doc(hidden)]
    #[link_section = "__DATA,__mod_init_func"]
    static __napi_register__parse___rust_ctor___ctor: unsafe extern "C" fn() = {
        unsafe extern "C" fn __napi_register__parse___rust_ctor___ctor() {
            __napi_register__parse()
        };
        __napi_register__parse___rust_ctor___ctor
    };
    pub fn parse_sync(src: String, opts: Buffer, filename: Option<String>) -> napi::Result<String> {
        swc_nodejs_common::init_default_trace_subscriber();
        let c = get_compiler();
        let options: ParseOptions = get_deserialized(&opts)?;
        let filename = if let Some(value) = filename {
            FileName::Real(value.into())
        } else {
            FileName::Anon
        };
        let program = try_with(c.cm.clone(), false, ErrorFormat::Normal, |handler| {
            c.run(|| {
                let fm = c.cm.new_source_file(filename, src);
                let comments = if options.comments {
                    Some(c.comments() as &dyn Comments)
                } else {
                    None
                };
                c.parse_js(
                    fm,
                    handler,
                    options.target,
                    options.syntax,
                    options.is_module,
                    comments,
                )
            })
        })
        .convert_err()?;
        Ok(serde_json::to_string(&program)?)
    }
    #[doc(hidden)]
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    extern "C" fn __napi__parse_sync(
        env: napi::bindgen_prelude::sys::napi_env,
        cb: napi::bindgen_prelude::sys::napi_callback_info,
    ) -> napi::bindgen_prelude::sys::napi_value {
        unsafe {
            napi::bindgen_prelude::CallbackInfo::<3usize>::new(env, cb, None)
                .and_then(|mut cb| {
                    let arg0 = {
                        <String as napi::bindgen_prelude::FromNapiValue>::from_napi_value(
                            env,
                            cb.get_arg(0usize),
                        )?
                    };
                    let arg1 = {
                        <Buffer as napi::bindgen_prelude::FromNapiValue>::from_napi_value(
                            env,
                            cb.get_arg(1usize),
                        )?
                    };
                    let arg2 = {
                        <Option<String> as napi::bindgen_prelude::FromNapiValue>::from_napi_value(
                            env,
                            cb.get_arg(2usize),
                        )?
                    };
                    let _ret = { parse_sync(arg0, arg1, arg2) };
                    match _ret {
                        Ok(value) => napi::bindgen_prelude::ToNapiValue::to_napi_value(env, value),
                        Err(err) => {
                            napi::bindgen_prelude::JsError::from(err).throw_into(env);
                            Ok(std::ptr::null_mut())
                        }
                    }
                })
                .unwrap_or_else(|e| {
                    napi::bindgen_prelude::JsError::from(e).throw_into(env);
                    std::ptr::null_mut::<napi::bindgen_prelude::sys::napi_value__>()
                })
        }
    }
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    unsafe fn parse_sync_js_function(
        env: napi::bindgen_prelude::sys::napi_env,
    ) -> napi::bindgen_prelude::Result<napi::bindgen_prelude::sys::napi_value> {
        let mut fn_ptr = std::ptr::null_mut();
        {
            let c = napi::bindgen_prelude::sys::napi_create_function(
                env,
                "parseSync\0".as_ptr() as *const _,
                10usize,
                Some(__napi__parse_sync),
                std::ptr::null_mut(),
                &mut fn_ptr,
            );
            match c {
                ::napi::sys::Status::napi_ok => Ok(()),
                _ => Err(::napi::Error::new(::napi::Status::from(c), {
                    let res = ::alloc::fmt::format(::core::fmt::Arguments::new_v1(
                        &["Failed to register function `", "`"],
                        &[::core::fmt::ArgumentV1::new_display(&"parse_sync")],
                    ));
                    res
                })),
            }
        }?;
        napi::bindgen_prelude::register_js_function(
            "parseSync\0",
            parse_sync_js_function,
            Some(__napi__parse_sync),
        );
        Ok(fn_ptr)
    }
    #[allow(clippy::all)]
    #[allow(non_snake_case)]
    #[cfg(all(not(test), not(feature = "noop")))]
    extern "C" fn __napi_register__parse_sync() {
        napi::bindgen_prelude::register_module_export(None, "parseSync\0", parse_sync_js_function);
    }
    #[used]
    #[allow(non_upper_case_globals)]
    #[doc(hidden)]
    #[link_section = "__DATA,__mod_init_func"]
    static __napi_register__parse_sync___rust_ctor___ctor: unsafe extern "C" fn() = {
        unsafe extern "C" fn __napi_register__parse_sync___rust_ctor___ctor() {
            __napi_register__parse_sync()
        };
        __napi_register__parse_sync___rust_ctor___ctor
    };
    pub fn parse_sync_no_return(
        src: String,
        opts: Buffer,
        filename: Option<String>,
    ) -> napi::Result<String> {
        swc_nodejs_common::init_default_trace_subscriber();
        let c = get_compiler();
        let options: ParseOptions = get_deserialized(&opts)?;
        let filename = if let Some(value) = filename {
            FileName::Real(value.into())
        } else {
            FileName::Anon
        };
        let program = try_with(c.cm.clone(), false, ErrorFormat::Normal, |handler| {
            c.run(|| {
                let fm = c.cm.new_source_file(filename, src);
                let comments = if options.comments {
                    Some(c.comments() as &dyn Comments)
                } else {
                    None
                };
                c.parse_js(
                    fm,
                    handler,
                    options.target,
                    options.syntax,
                    options.is_module,
                    comments,
                )
            })
        })
        .convert_err()?;
        let _json = serde_json::to_string(&program)?;
        Ok("".to_string())
    }
    #[doc(hidden)]
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    extern "C" fn __napi__parse_sync_no_return(
        env: napi::bindgen_prelude::sys::napi_env,
        cb: napi::bindgen_prelude::sys::napi_callback_info,
    ) -> napi::bindgen_prelude::sys::napi_value {
        unsafe {
            napi::bindgen_prelude::CallbackInfo::<3usize>::new(env, cb, None)
                .and_then(|mut cb| {
                    let arg0 = {
                        <String as napi::bindgen_prelude::FromNapiValue>::from_napi_value(
                            env,
                            cb.get_arg(0usize),
                        )?
                    };
                    let arg1 = {
                        <Buffer as napi::bindgen_prelude::FromNapiValue>::from_napi_value(
                            env,
                            cb.get_arg(1usize),
                        )?
                    };
                    let arg2 = {
                        <Option<String> as napi::bindgen_prelude::FromNapiValue>::from_napi_value(
                            env,
                            cb.get_arg(2usize),
                        )?
                    };
                    let _ret = { parse_sync_no_return(arg0, arg1, arg2) };
                    match _ret {
                        Ok(value) => napi::bindgen_prelude::ToNapiValue::to_napi_value(env, value),
                        Err(err) => {
                            napi::bindgen_prelude::JsError::from(err).throw_into(env);
                            Ok(std::ptr::null_mut())
                        }
                    }
                })
                .unwrap_or_else(|e| {
                    napi::bindgen_prelude::JsError::from(e).throw_into(env);
                    std::ptr::null_mut::<napi::bindgen_prelude::sys::napi_value__>()
                })
        }
    }
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    unsafe fn parse_sync_no_return_js_function(
        env: napi::bindgen_prelude::sys::napi_env,
    ) -> napi::bindgen_prelude::Result<napi::bindgen_prelude::sys::napi_value> {
        let mut fn_ptr = std::ptr::null_mut();
        {
            let c = napi::bindgen_prelude::sys::napi_create_function(
                env,
                "parseSyncNoReturn\0".as_ptr() as *const _,
                18usize,
                Some(__napi__parse_sync_no_return),
                std::ptr::null_mut(),
                &mut fn_ptr,
            );
            match c {
                ::napi::sys::Status::napi_ok => Ok(()),
                _ => Err(::napi::Error::new(::napi::Status::from(c), {
                    let res = ::alloc::fmt::format(::core::fmt::Arguments::new_v1(
                        &["Failed to register function `", "`"],
                        &[::core::fmt::ArgumentV1::new_display(
                            &"parse_sync_no_return",
                        )],
                    ));
                    res
                })),
            }
        }?;
        napi::bindgen_prelude::register_js_function(
            "parseSyncNoReturn\0",
            parse_sync_no_return_js_function,
            Some(__napi__parse_sync_no_return),
        );
        Ok(fn_ptr)
    }
    #[allow(clippy::all)]
    #[allow(non_snake_case)]
    #[cfg(all(not(test), not(feature = "noop")))]
    extern "C" fn __napi_register__parse_sync_no_return() {
        napi::bindgen_prelude::register_module_export(
            None,
            "parseSyncNoReturn\0",
            parse_sync_no_return_js_function,
        );
    }
    #[used]
    #[allow(non_upper_case_globals)]
    #[doc(hidden)]
    #[link_section = "__DATA,__mod_init_func"]
    static __napi_register__parse_sync_no_return___rust_ctor___ctor: unsafe extern "C" fn() = {
        unsafe extern "C" fn __napi_register__parse_sync_no_return___rust_ctor___ctor() {
            __napi_register__parse_sync_no_return()
        };
        __napi_register__parse_sync_no_return___rust_ctor___ctor
    };
    pub fn parse_sync_to_buffer(
        src: String,
        opts: Buffer,
        filename: Option<String>,
    ) -> napi::Result<Buffer> {
        swc_nodejs_common::init_default_trace_subscriber();
        let c = get_compiler();
        let options: ParseOptions = get_deserialized(&opts)?;
        let filename = if let Some(value) = filename {
            FileName::Real(value.into())
        } else {
            FileName::Anon
        };
        let program = try_with(c.cm.clone(), false, ErrorFormat::Normal, |handler| {
            c.run(|| {
                let fm = c.cm.new_source_file(filename, src);
                let comments = if options.comments {
                    Some(c.comments() as &dyn Comments)
                } else {
                    None
                };
                c.parse_js(
                    fm,
                    handler,
                    options.target,
                    options.syntax,
                    options.is_module,
                    comments,
                )
            })
        })
        .convert_err()?;
        let versioned_program = VersionedSerializable::new(program);
        let serialized = PluginSerializedBytes::try_serialize(&versioned_program).convert_err()?;
        let slice = serialized.as_slice();
        let buffer = Buffer::from(slice);
        Ok(buffer)
    }
    #[doc(hidden)]
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    extern "C" fn __napi__parse_sync_to_buffer(
        env: napi::bindgen_prelude::sys::napi_env,
        cb: napi::bindgen_prelude::sys::napi_callback_info,
    ) -> napi::bindgen_prelude::sys::napi_value {
        unsafe {
            napi::bindgen_prelude::CallbackInfo::<3usize>::new(env, cb, None)
                .and_then(|mut cb| {
                    let arg0 = {
                        <String as napi::bindgen_prelude::FromNapiValue>::from_napi_value(
                            env,
                            cb.get_arg(0usize),
                        )?
                    };
                    let arg1 = {
                        <Buffer as napi::bindgen_prelude::FromNapiValue>::from_napi_value(
                            env,
                            cb.get_arg(1usize),
                        )?
                    };
                    let arg2 = {
                        <Option<String> as napi::bindgen_prelude::FromNapiValue>::from_napi_value(
                            env,
                            cb.get_arg(2usize),
                        )?
                    };
                    let _ret = { parse_sync_to_buffer(arg0, arg1, arg2) };
                    match _ret {
                        Ok(value) => napi::bindgen_prelude::ToNapiValue::to_napi_value(env, value),
                        Err(err) => {
                            napi::bindgen_prelude::JsError::from(err).throw_into(env);
                            Ok(std::ptr::null_mut())
                        }
                    }
                })
                .unwrap_or_else(|e| {
                    napi::bindgen_prelude::JsError::from(e).throw_into(env);
                    std::ptr::null_mut::<napi::bindgen_prelude::sys::napi_value__>()
                })
        }
    }
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    unsafe fn parse_sync_to_buffer_js_function(
        env: napi::bindgen_prelude::sys::napi_env,
    ) -> napi::bindgen_prelude::Result<napi::bindgen_prelude::sys::napi_value> {
        let mut fn_ptr = std::ptr::null_mut();
        {
            let c = napi::bindgen_prelude::sys::napi_create_function(
                env,
                "parseSyncToBuffer\0".as_ptr() as *const _,
                18usize,
                Some(__napi__parse_sync_to_buffer),
                std::ptr::null_mut(),
                &mut fn_ptr,
            );
            match c {
                ::napi::sys::Status::napi_ok => Ok(()),
                _ => Err(::napi::Error::new(::napi::Status::from(c), {
                    let res = ::alloc::fmt::format(::core::fmt::Arguments::new_v1(
                        &["Failed to register function `", "`"],
                        &[::core::fmt::ArgumentV1::new_display(
                            &"parse_sync_to_buffer",
                        )],
                    ));
                    res
                })),
            }
        }?;
        napi::bindgen_prelude::register_js_function(
            "parseSyncToBuffer\0",
            parse_sync_to_buffer_js_function,
            Some(__napi__parse_sync_to_buffer),
        );
        Ok(fn_ptr)
    }
    #[allow(clippy::all)]
    #[allow(non_snake_case)]
    #[cfg(all(not(test), not(feature = "noop")))]
    extern "C" fn __napi_register__parse_sync_to_buffer() {
        napi::bindgen_prelude::register_module_export(
            None,
            "parseSyncToBuffer\0",
            parse_sync_to_buffer_js_function,
        );
    }
    #[used]
    #[allow(non_upper_case_globals)]
    #[doc(hidden)]
    #[link_section = "__DATA,__mod_init_func"]
    static __napi_register__parse_sync_to_buffer___rust_ctor___ctor: unsafe extern "C" fn() = {
        unsafe extern "C" fn __napi_register__parse_sync_to_buffer___rust_ctor___ctor() {
            __napi_register__parse_sync_to_buffer()
        };
        __napi_register__parse_sync_to_buffer___rust_ctor___ctor
    };
    pub fn parse_sync_to_buffer_no_return(
        src: String,
        opts: Buffer,
        filename: Option<String>,
    ) -> napi::Result<String> {
        swc_nodejs_common::init_default_trace_subscriber();
        let c = get_compiler();
        let options: ParseOptions = get_deserialized(&opts)?;
        let filename = if let Some(value) = filename {
            FileName::Real(value.into())
        } else {
            FileName::Anon
        };
        let program = try_with(c.cm.clone(), false, ErrorFormat::Normal, |handler| {
            c.run(|| {
                let fm = c.cm.new_source_file(filename, src);
                let comments = if options.comments {
                    Some(c.comments() as &dyn Comments)
                } else {
                    None
                };
                c.parse_js(
                    fm,
                    handler,
                    options.target,
                    options.syntax,
                    options.is_module,
                    comments,
                )
            })
        })
        .convert_err()?;
        let versioned_program = VersionedSerializable::new(program);
        let serialized = PluginSerializedBytes::try_serialize(&versioned_program).convert_err()?;
        let slice = serialized.as_slice();
        let _buffer = Buffer::from(slice);
        Ok("".to_string())
    }
    #[doc(hidden)]
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    extern "C" fn __napi__parse_sync_to_buffer_no_return(
        env: napi::bindgen_prelude::sys::napi_env,
        cb: napi::bindgen_prelude::sys::napi_callback_info,
    ) -> napi::bindgen_prelude::sys::napi_value {
        unsafe {
            napi::bindgen_prelude::CallbackInfo::<3usize>::new(env, cb, None)
                .and_then(|mut cb| {
                    let arg0 = {
                        <String as napi::bindgen_prelude::FromNapiValue>::from_napi_value(
                            env,
                            cb.get_arg(0usize),
                        )?
                    };
                    let arg1 = {
                        <Buffer as napi::bindgen_prelude::FromNapiValue>::from_napi_value(
                            env,
                            cb.get_arg(1usize),
                        )?
                    };
                    let arg2 = {
                        <Option<String> as napi::bindgen_prelude::FromNapiValue>::from_napi_value(
                            env,
                            cb.get_arg(2usize),
                        )?
                    };
                    let _ret = { parse_sync_to_buffer_no_return(arg0, arg1, arg2) };
                    match _ret {
                        Ok(value) => napi::bindgen_prelude::ToNapiValue::to_napi_value(env, value),
                        Err(err) => {
                            napi::bindgen_prelude::JsError::from(err).throw_into(env);
                            Ok(std::ptr::null_mut())
                        }
                    }
                })
                .unwrap_or_else(|e| {
                    napi::bindgen_prelude::JsError::from(e).throw_into(env);
                    std::ptr::null_mut::<napi::bindgen_prelude::sys::napi_value__>()
                })
        }
    }
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    unsafe fn parse_sync_to_buffer_no_return_js_function(
        env: napi::bindgen_prelude::sys::napi_env,
    ) -> napi::bindgen_prelude::Result<napi::bindgen_prelude::sys::napi_value> {
        let mut fn_ptr = std::ptr::null_mut();
        {
            let c = napi::bindgen_prelude::sys::napi_create_function(
                env,
                "parseSyncToBufferNoReturn\0".as_ptr() as *const _,
                26usize,
                Some(__napi__parse_sync_to_buffer_no_return),
                std::ptr::null_mut(),
                &mut fn_ptr,
            );
            match c {
                ::napi::sys::Status::napi_ok => Ok(()),
                _ => Err(::napi::Error::new(::napi::Status::from(c), {
                    let res = ::alloc::fmt::format(::core::fmt::Arguments::new_v1(
                        &["Failed to register function `", "`"],
                        &[::core::fmt::ArgumentV1::new_display(
                            &"parse_sync_to_buffer_no_return",
                        )],
                    ));
                    res
                })),
            }
        }?;
        napi::bindgen_prelude::register_js_function(
            "parseSyncToBufferNoReturn\0",
            parse_sync_to_buffer_no_return_js_function,
            Some(__napi__parse_sync_to_buffer_no_return),
        );
        Ok(fn_ptr)
    }
    #[allow(clippy::all)]
    #[allow(non_snake_case)]
    #[cfg(all(not(test), not(feature = "noop")))]
    extern "C" fn __napi_register__parse_sync_to_buffer_no_return() {
        napi::bindgen_prelude::register_module_export(
            None,
            "parseSyncToBufferNoReturn\0",
            parse_sync_to_buffer_no_return_js_function,
        );
    }
    #[used]
    #[allow(non_upper_case_globals)]
    #[doc(hidden)]
    #[link_section = "__DATA,__mod_init_func"]
    static __napi_register__parse_sync_to_buffer_no_return___rust_ctor___ctor:
        unsafe extern "C" fn() = {
        unsafe extern "C" fn __napi_register__parse_sync_to_buffer_no_return___rust_ctor___ctor() {
            __napi_register__parse_sync_to_buffer_no_return()
        };
        __napi_register__parse_sync_to_buffer_no_return___rust_ctor___ctor
    };
    pub fn parse_sync_rkyv_no_buffer(
        src: String,
        opts: Buffer,
        filename: Option<String>,
    ) -> napi::Result<String> {
        swc_nodejs_common::init_default_trace_subscriber();
        let c = get_compiler();
        let options: ParseOptions = get_deserialized(&opts)?;
        let filename = if let Some(value) = filename {
            FileName::Real(value.into())
        } else {
            FileName::Anon
        };
        let program = try_with(c.cm.clone(), false, ErrorFormat::Normal, |handler| {
            c.run(|| {
                let fm = c.cm.new_source_file(filename, src);
                let comments = if options.comments {
                    Some(c.comments() as &dyn Comments)
                } else {
                    None
                };
                c.parse_js(
                    fm,
                    handler,
                    options.target,
                    options.syntax,
                    options.is_module,
                    comments,
                )
            })
        })
        .convert_err()?;
        let versioned_program = VersionedSerializable::new(program);
        let _serialized = PluginSerializedBytes::try_serialize(&versioned_program).convert_err()?;
        Ok("".to_string())
    }
    #[doc(hidden)]
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    extern "C" fn __napi__parse_sync_rkyv_no_buffer(
        env: napi::bindgen_prelude::sys::napi_env,
        cb: napi::bindgen_prelude::sys::napi_callback_info,
    ) -> napi::bindgen_prelude::sys::napi_value {
        unsafe {
            napi::bindgen_prelude::CallbackInfo::<3usize>::new(env, cb, None)
                .and_then(|mut cb| {
                    let arg0 = {
                        <String as napi::bindgen_prelude::FromNapiValue>::from_napi_value(
                            env,
                            cb.get_arg(0usize),
                        )?
                    };
                    let arg1 = {
                        <Buffer as napi::bindgen_prelude::FromNapiValue>::from_napi_value(
                            env,
                            cb.get_arg(1usize),
                        )?
                    };
                    let arg2 = {
                        <Option<String> as napi::bindgen_prelude::FromNapiValue>::from_napi_value(
                            env,
                            cb.get_arg(2usize),
                        )?
                    };
                    let _ret = { parse_sync_rkyv_no_buffer(arg0, arg1, arg2) };
                    match _ret {
                        Ok(value) => napi::bindgen_prelude::ToNapiValue::to_napi_value(env, value),
                        Err(err) => {
                            napi::bindgen_prelude::JsError::from(err).throw_into(env);
                            Ok(std::ptr::null_mut())
                        }
                    }
                })
                .unwrap_or_else(|e| {
                    napi::bindgen_prelude::JsError::from(e).throw_into(env);
                    std::ptr::null_mut::<napi::bindgen_prelude::sys::napi_value__>()
                })
        }
    }
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    unsafe fn parse_sync_rkyv_no_buffer_js_function(
        env: napi::bindgen_prelude::sys::napi_env,
    ) -> napi::bindgen_prelude::Result<napi::bindgen_prelude::sys::napi_value> {
        let mut fn_ptr = std::ptr::null_mut();
        {
            let c = napi::bindgen_prelude::sys::napi_create_function(
                env,
                "parseSyncRkyvNoBuffer\0".as_ptr() as *const _,
                22usize,
                Some(__napi__parse_sync_rkyv_no_buffer),
                std::ptr::null_mut(),
                &mut fn_ptr,
            );
            match c {
                ::napi::sys::Status::napi_ok => Ok(()),
                _ => Err(::napi::Error::new(::napi::Status::from(c), {
                    let res = ::alloc::fmt::format(::core::fmt::Arguments::new_v1(
                        &["Failed to register function `", "`"],
                        &[::core::fmt::ArgumentV1::new_display(
                            &"parse_sync_rkyv_no_buffer",
                        )],
                    ));
                    res
                })),
            }
        }?;
        napi::bindgen_prelude::register_js_function(
            "parseSyncRkyvNoBuffer\0",
            parse_sync_rkyv_no_buffer_js_function,
            Some(__napi__parse_sync_rkyv_no_buffer),
        );
        Ok(fn_ptr)
    }
    #[allow(clippy::all)]
    #[allow(non_snake_case)]
    #[cfg(all(not(test), not(feature = "noop")))]
    extern "C" fn __napi_register__parse_sync_rkyv_no_buffer() {
        napi::bindgen_prelude::register_module_export(
            None,
            "parseSyncRkyvNoBuffer\0",
            parse_sync_rkyv_no_buffer_js_function,
        );
    }
    #[used]
    #[allow(non_upper_case_globals)]
    #[doc(hidden)]
    #[link_section = "__DATA,__mod_init_func"]
    static __napi_register__parse_sync_rkyv_no_buffer___rust_ctor___ctor: unsafe extern "C" fn() = {
        unsafe extern "C" fn __napi_register__parse_sync_rkyv_no_buffer___rust_ctor___ctor() {
            __napi_register__parse_sync_rkyv_no_buffer()
        };
        __napi_register__parse_sync_rkyv_no_buffer___rust_ctor___ctor
    };
    pub fn parse_sync_no_serialization(
        src: String,
        opts: Buffer,
        filename: Option<String>,
    ) -> napi::Result<String> {
        swc_nodejs_common::init_default_trace_subscriber();
        let c = get_compiler();
        let options: ParseOptions = get_deserialized(&opts)?;
        let filename = if let Some(value) = filename {
            FileName::Real(value.into())
        } else {
            FileName::Anon
        };
        let _program = try_with(c.cm.clone(), false, ErrorFormat::Normal, |handler| {
            c.run(|| {
                let fm = c.cm.new_source_file(filename, src);
                let comments = if options.comments {
                    Some(c.comments() as &dyn Comments)
                } else {
                    None
                };
                c.parse_js(
                    fm,
                    handler,
                    options.target,
                    options.syntax,
                    options.is_module,
                    comments,
                )
            })
        })
        .convert_err()?;
        Ok("".to_string())
    }
    #[doc(hidden)]
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    extern "C" fn __napi__parse_sync_no_serialization(
        env: napi::bindgen_prelude::sys::napi_env,
        cb: napi::bindgen_prelude::sys::napi_callback_info,
    ) -> napi::bindgen_prelude::sys::napi_value {
        unsafe {
            napi::bindgen_prelude::CallbackInfo::<3usize>::new(env, cb, None)
                .and_then(|mut cb| {
                    let arg0 = {
                        <String as napi::bindgen_prelude::FromNapiValue>::from_napi_value(
                            env,
                            cb.get_arg(0usize),
                        )?
                    };
                    let arg1 = {
                        <Buffer as napi::bindgen_prelude::FromNapiValue>::from_napi_value(
                            env,
                            cb.get_arg(1usize),
                        )?
                    };
                    let arg2 = {
                        <Option<String> as napi::bindgen_prelude::FromNapiValue>::from_napi_value(
                            env,
                            cb.get_arg(2usize),
                        )?
                    };
                    let _ret = { parse_sync_no_serialization(arg0, arg1, arg2) };
                    match _ret {
                        Ok(value) => napi::bindgen_prelude::ToNapiValue::to_napi_value(env, value),
                        Err(err) => {
                            napi::bindgen_prelude::JsError::from(err).throw_into(env);
                            Ok(std::ptr::null_mut())
                        }
                    }
                })
                .unwrap_or_else(|e| {
                    napi::bindgen_prelude::JsError::from(e).throw_into(env);
                    std::ptr::null_mut::<napi::bindgen_prelude::sys::napi_value__>()
                })
        }
    }
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    unsafe fn parse_sync_no_serialization_js_function(
        env: napi::bindgen_prelude::sys::napi_env,
    ) -> napi::bindgen_prelude::Result<napi::bindgen_prelude::sys::napi_value> {
        let mut fn_ptr = std::ptr::null_mut();
        {
            let c = napi::bindgen_prelude::sys::napi_create_function(
                env,
                "parseSyncNoSerialization\0".as_ptr() as *const _,
                25usize,
                Some(__napi__parse_sync_no_serialization),
                std::ptr::null_mut(),
                &mut fn_ptr,
            );
            match c {
                ::napi::sys::Status::napi_ok => Ok(()),
                _ => Err(::napi::Error::new(::napi::Status::from(c), {
                    let res = ::alloc::fmt::format(::core::fmt::Arguments::new_v1(
                        &["Failed to register function `", "`"],
                        &[::core::fmt::ArgumentV1::new_display(
                            &"parse_sync_no_serialization",
                        )],
                    ));
                    res
                })),
            }
        }?;
        napi::bindgen_prelude::register_js_function(
            "parseSyncNoSerialization\0",
            parse_sync_no_serialization_js_function,
            Some(__napi__parse_sync_no_serialization),
        );
        Ok(fn_ptr)
    }
    #[allow(clippy::all)]
    #[allow(non_snake_case)]
    #[cfg(all(not(test), not(feature = "noop")))]
    extern "C" fn __napi_register__parse_sync_no_serialization() {
        napi::bindgen_prelude::register_module_export(
            None,
            "parseSyncNoSerialization\0",
            parse_sync_no_serialization_js_function,
        );
    }
    #[used]
    #[allow(non_upper_case_globals)]
    #[doc(hidden)]
    #[link_section = "__DATA,__mod_init_func"]
    static __napi_register__parse_sync_no_serialization___rust_ctor___ctor:
        unsafe extern "C" fn() = {
        unsafe extern "C" fn __napi_register__parse_sync_no_serialization___rust_ctor___ctor() {
            __napi_register__parse_sync_no_serialization()
        };
        __napi_register__parse_sync_no_serialization___rust_ctor___ctor
    };
    pub fn parse_file_sync(path: String, opts: Buffer) -> napi::Result<String> {
        swc_nodejs_common::init_default_trace_subscriber();
        let c = get_compiler();
        let options: ParseOptions = get_deserialized(&opts)?;
        let program = {
            try_with(c.cm.clone(), false, ErrorFormat::Normal, |handler| {
                let fm =
                    c.cm.load_file(Path::new(path.as_str()))
                        .expect("failed to read program file");
                let comments = if options.comments {
                    Some(c.comments() as &dyn Comments)
                } else {
                    None
                };
                c.parse_js(
                    fm,
                    handler,
                    options.target,
                    options.syntax,
                    options.is_module,
                    comments,
                )
            })
        }
        .convert_err()?;
        Ok(serde_json::to_string(&program)?)
    }
    #[doc(hidden)]
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    extern "C" fn __napi__parse_file_sync(
        env: napi::bindgen_prelude::sys::napi_env,
        cb: napi::bindgen_prelude::sys::napi_callback_info,
    ) -> napi::bindgen_prelude::sys::napi_value {
        unsafe {
            napi::bindgen_prelude::CallbackInfo::<2usize>::new(env, cb, None)
                .and_then(|mut cb| {
                    let arg0 = {
                        <String as napi::bindgen_prelude::FromNapiValue>::from_napi_value(
                            env,
                            cb.get_arg(0usize),
                        )?
                    };
                    let arg1 = {
                        <Buffer as napi::bindgen_prelude::FromNapiValue>::from_napi_value(
                            env,
                            cb.get_arg(1usize),
                        )?
                    };
                    let _ret = { parse_file_sync(arg0, arg1) };
                    match _ret {
                        Ok(value) => napi::bindgen_prelude::ToNapiValue::to_napi_value(env, value),
                        Err(err) => {
                            napi::bindgen_prelude::JsError::from(err).throw_into(env);
                            Ok(std::ptr::null_mut())
                        }
                    }
                })
                .unwrap_or_else(|e| {
                    napi::bindgen_prelude::JsError::from(e).throw_into(env);
                    std::ptr::null_mut::<napi::bindgen_prelude::sys::napi_value__>()
                })
        }
    }
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    unsafe fn parse_file_sync_js_function(
        env: napi::bindgen_prelude::sys::napi_env,
    ) -> napi::bindgen_prelude::Result<napi::bindgen_prelude::sys::napi_value> {
        let mut fn_ptr = std::ptr::null_mut();
        {
            let c = napi::bindgen_prelude::sys::napi_create_function(
                env,
                "parseFileSync\0".as_ptr() as *const _,
                14usize,
                Some(__napi__parse_file_sync),
                std::ptr::null_mut(),
                &mut fn_ptr,
            );
            match c {
                ::napi::sys::Status::napi_ok => Ok(()),
                _ => Err(::napi::Error::new(::napi::Status::from(c), {
                    let res = ::alloc::fmt::format(::core::fmt::Arguments::new_v1(
                        &["Failed to register function `", "`"],
                        &[::core::fmt::ArgumentV1::new_display(&"parse_file_sync")],
                    ));
                    res
                })),
            }
        }?;
        napi::bindgen_prelude::register_js_function(
            "parseFileSync\0",
            parse_file_sync_js_function,
            Some(__napi__parse_file_sync),
        );
        Ok(fn_ptr)
    }
    #[allow(clippy::all)]
    #[allow(non_snake_case)]
    #[cfg(all(not(test), not(feature = "noop")))]
    extern "C" fn __napi_register__parse_file_sync() {
        napi::bindgen_prelude::register_module_export(
            None,
            "parseFileSync\0",
            parse_file_sync_js_function,
        );
    }
    #[used]
    #[allow(non_upper_case_globals)]
    #[doc(hidden)]
    #[link_section = "__DATA,__mod_init_func"]
    static __napi_register__parse_file_sync___rust_ctor___ctor: unsafe extern "C" fn() = {
        unsafe extern "C" fn __napi_register__parse_file_sync___rust_ctor___ctor() {
            __napi_register__parse_file_sync()
        };
        __napi_register__parse_file_sync___rust_ctor___ctor
    };
    pub fn parse_file(
        path: String,
        options: Buffer,
        signal: Option<AbortSignal>,
    ) -> AsyncTask<ParseFileTask> {
        swc_nodejs_common::init_default_trace_subscriber();
        let c = get_compiler();
        let path = PathBuf::from(&path);
        let options = String::from_utf8_lossy(options.as_ref()).to_string();
        AsyncTask::with_optional_signal(ParseFileTask { c, path, options }, signal)
    }
    #[doc(hidden)]
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    extern "C" fn __napi__parse_file(
        env: napi::bindgen_prelude::sys::napi_env,
        cb: napi::bindgen_prelude::sys::napi_callback_info,
    ) -> napi::bindgen_prelude::sys::napi_value {
        unsafe {
            napi :: bindgen_prelude :: CallbackInfo :: < 3usize > :: new (env , cb , None) . and_then (| mut cb | { let arg0 = { < String as napi :: bindgen_prelude :: FromNapiValue > :: from_napi_value (env , cb . get_arg (0usize)) ? } ; let arg1 = { < Buffer as napi :: bindgen_prelude :: FromNapiValue > :: from_napi_value (env , cb . get_arg (1usize)) ? } ; let arg2 = { < Option < AbortSignal > as napi :: bindgen_prelude :: FromNapiValue > :: from_napi_value (env , cb . get_arg (2usize)) ? } ; let _ret = { parse_file (arg0 , arg1 , arg2) } ; < AsyncTask < ParseFileTask > as napi :: bindgen_prelude :: ToNapiValue > :: to_napi_value (env , _ret) }) . unwrap_or_else (| e | { napi :: bindgen_prelude :: JsError :: from (e) . throw_into (env) ; std :: ptr :: null_mut :: < napi :: bindgen_prelude :: sys :: napi_value__ > () })
        }
    }
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    unsafe fn parse_file_js_function(
        env: napi::bindgen_prelude::sys::napi_env,
    ) -> napi::bindgen_prelude::Result<napi::bindgen_prelude::sys::napi_value> {
        let mut fn_ptr = std::ptr::null_mut();
        {
            let c = napi::bindgen_prelude::sys::napi_create_function(
                env,
                "parseFile\0".as_ptr() as *const _,
                10usize,
                Some(__napi__parse_file),
                std::ptr::null_mut(),
                &mut fn_ptr,
            );
            match c {
                ::napi::sys::Status::napi_ok => Ok(()),
                _ => Err(::napi::Error::new(::napi::Status::from(c), {
                    let res = ::alloc::fmt::format(::core::fmt::Arguments::new_v1(
                        &["Failed to register function `", "`"],
                        &[::core::fmt::ArgumentV1::new_display(&"parse_file")],
                    ));
                    res
                })),
            }
        }?;
        napi::bindgen_prelude::register_js_function(
            "parseFile\0",
            parse_file_js_function,
            Some(__napi__parse_file),
        );
        Ok(fn_ptr)
    }
    #[allow(clippy::all)]
    #[allow(non_snake_case)]
    #[cfg(all(not(test), not(feature = "noop")))]
    extern "C" fn __napi_register__parse_file() {
        napi::bindgen_prelude::register_module_export(None, "parseFile\0", parse_file_js_function);
    }
    #[used]
    #[allow(non_upper_case_globals)]
    #[doc(hidden)]
    #[link_section = "__DATA,__mod_init_func"]
    static __napi_register__parse_file___rust_ctor___ctor: unsafe extern "C" fn() = {
        unsafe extern "C" fn __napi_register__parse_file___rust_ctor___ctor() {
            __napi_register__parse_file()
        };
        __napi_register__parse_file___rust_ctor___ctor
    };
}
mod print {
    use std::sync::Arc;

    use napi::{
        bindgen_prelude::{AbortSignal, AsyncTask, Buffer},
        Env, Task,
    };
    use swc::{
        config::{Options, SourceMapsConfig},
        Compiler, TransformOutput,
    };
    use swc_common::plugin::deserialize_from_ptr;
    use swc_ecma_ast::{EsVersion, Program};
    use swc_nodejs_common::{deserialize_json, get_deserialized, MapErr};

    use crate::get_compiler;
    pub struct PrintTask {
        pub c: Arc<Compiler>,
        pub program_json: String,
        pub options: String,
    }
    impl Task for PrintTask {
        type JsValue = TransformOutput;
        type Output = TransformOutput;

        fn compute(&mut self) -> napi::Result<Self::Output> {
            let program: Program = deserialize_json(&self.program_json)?;
            let options: Options = deserialize_json(&self.options)?;
            self.c
                .print(
                    &program,
                    None,
                    options.output_path.clone(),
                    true,
                    options.config.jsc.target.unwrap_or(EsVersion::Es2020),
                    options
                        .source_maps
                        .clone()
                        .unwrap_or(SourceMapsConfig::Bool(false)),
                    &Default::default(),
                    None,
                    options.config.minify.into_bool(),
                    None,
                    options.config.emit_source_map_columns.into_bool(),
                    false,
                )
                .convert_err()
        }

        fn resolve(&mut self, _env: Env, result: Self::Output) -> napi::Result<Self::JsValue> {
            Ok(result)
        }
    }
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    mod __napi_impl_helper__PrintTask__4 {
        use super::*;
        #[cfg(all(not(test), not(feature = "noop")))]
        extern "C" fn __napi_register__PrintTask_impl() {
            napi::__private::register_class(
                "PrintTask",
                None,
                "PrintTask\0",
                ::alloc::vec::Vec::new(),
            );
        }
        #[used]
        #[allow(non_upper_case_globals)]
        #[doc(hidden)]
        #[link_section = "__DATA,__mod_init_func"]
        static __napi_register__PrintTask_impl___rust_ctor___ctor: unsafe extern "C" fn() = {
            unsafe extern "C" fn __napi_register__PrintTask_impl___rust_ctor___ctor() {
                __napi_register__PrintTask_impl()
            };
            __napi_register__PrintTask_impl___rust_ctor___ctor
        };
    }
    pub fn print(
        program_json: String,
        options: Buffer,
        signal: Option<AbortSignal>,
    ) -> napi::Result<AsyncTask<PrintTask>> {
        swc_nodejs_common::init_default_trace_subscriber();
        let c = get_compiler();
        let options = String::from_utf8_lossy(&options).to_string();
        Ok(AsyncTask::with_optional_signal(
            PrintTask {
                c,
                program_json,
                options,
            },
            signal,
        ))
    }
    #[doc(hidden)]
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    extern "C" fn __napi__print(
        env: napi::bindgen_prelude::sys::napi_env,
        cb: napi::bindgen_prelude::sys::napi_callback_info,
    ) -> napi::bindgen_prelude::sys::napi_value {
        unsafe {
            napi :: bindgen_prelude :: CallbackInfo :: < 3usize > :: new (env , cb , None) . and_then (| mut cb | { let arg0 = { < String as napi :: bindgen_prelude :: FromNapiValue > :: from_napi_value (env , cb . get_arg (0usize)) ? } ; let arg1 = { < Buffer as napi :: bindgen_prelude :: FromNapiValue > :: from_napi_value (env , cb . get_arg (1usize)) ? } ; let arg2 = { < Option < AbortSignal > as napi :: bindgen_prelude :: FromNapiValue > :: from_napi_value (env , cb . get_arg (2usize)) ? } ; let _ret = { print (arg0 , arg1 , arg2) } ; match _ret { Ok (value) => napi :: bindgen_prelude :: ToNapiValue :: to_napi_value (env , value) , Err (err) => { napi :: bindgen_prelude :: JsError :: from (err) . throw_into (env) ; Ok (std :: ptr :: null_mut ()) } } }) . unwrap_or_else (| e | { napi :: bindgen_prelude :: JsError :: from (e) . throw_into (env) ; std :: ptr :: null_mut :: < napi :: bindgen_prelude :: sys :: napi_value__ > () })
        }
    }
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    unsafe fn print_js_function(
        env: napi::bindgen_prelude::sys::napi_env,
    ) -> napi::bindgen_prelude::Result<napi::bindgen_prelude::sys::napi_value> {
        let mut fn_ptr = std::ptr::null_mut();
        {
            let c = napi::bindgen_prelude::sys::napi_create_function(
                env,
                "print\0".as_ptr() as *const _,
                6usize,
                Some(__napi__print),
                std::ptr::null_mut(),
                &mut fn_ptr,
            );
            match c {
                ::napi::sys::Status::napi_ok => Ok(()),
                _ => Err(::napi::Error::new(::napi::Status::from(c), {
                    let res = ::alloc::fmt::format(::core::fmt::Arguments::new_v1(
                        &["Failed to register function `", "`"],
                        &[::core::fmt::ArgumentV1::new_display(&"print")],
                    ));
                    res
                })),
            }
        }?;
        napi::bindgen_prelude::register_js_function(
            "print\0",
            print_js_function,
            Some(__napi__print),
        );
        Ok(fn_ptr)
    }
    #[allow(clippy::all)]
    #[allow(non_snake_case)]
    #[cfg(all(not(test), not(feature = "noop")))]
    extern "C" fn __napi_register__print() {
        napi::bindgen_prelude::register_module_export(None, "print\0", print_js_function);
    }
    #[used]
    #[allow(non_upper_case_globals)]
    #[doc(hidden)]
    #[link_section = "__DATA,__mod_init_func"]
    static __napi_register__print___rust_ctor___ctor: unsafe extern "C" fn() = {
        unsafe extern "C" fn __napi_register__print___rust_ctor___ctor() {
            __napi_register__print()
        };
        __napi_register__print___rust_ctor___ctor
    };
    pub fn print_sync(program: String, options: Buffer) -> napi::Result<TransformOutput> {
        swc_nodejs_common::init_default_trace_subscriber();
        let c = get_compiler();
        let program: Program = deserialize_json(program.as_str())?;
        let options: Options = get_deserialized(&options)?;
        let codegen_target = options.codegen_target().unwrap_or_default();
        c.print(
            &program,
            None,
            options.output_path,
            true,
            codegen_target,
            options
                .source_maps
                .clone()
                .unwrap_or(SourceMapsConfig::Bool(false)),
            &Default::default(),
            None,
            options.config.minify.into_bool(),
            None,
            options.config.emit_source_map_columns.into_bool(),
            false,
        )
        .convert_err()
    }
    #[doc(hidden)]
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    extern "C" fn __napi__print_sync(
        env: napi::bindgen_prelude::sys::napi_env,
        cb: napi::bindgen_prelude::sys::napi_callback_info,
    ) -> napi::bindgen_prelude::sys::napi_value {
        unsafe {
            napi::bindgen_prelude::CallbackInfo::<2usize>::new(env, cb, None)
                .and_then(|mut cb| {
                    let arg0 = {
                        <String as napi::bindgen_prelude::FromNapiValue>::from_napi_value(
                            env,
                            cb.get_arg(0usize),
                        )?
                    };
                    let arg1 = {
                        <Buffer as napi::bindgen_prelude::FromNapiValue>::from_napi_value(
                            env,
                            cb.get_arg(1usize),
                        )?
                    };
                    let _ret = { print_sync(arg0, arg1) };
                    match _ret {
                        Ok(value) => napi::bindgen_prelude::ToNapiValue::to_napi_value(env, value),
                        Err(err) => {
                            napi::bindgen_prelude::JsError::from(err).throw_into(env);
                            Ok(std::ptr::null_mut())
                        }
                    }
                })
                .unwrap_or_else(|e| {
                    napi::bindgen_prelude::JsError::from(e).throw_into(env);
                    std::ptr::null_mut::<napi::bindgen_prelude::sys::napi_value__>()
                })
        }
    }
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    unsafe fn print_sync_js_function(
        env: napi::bindgen_prelude::sys::napi_env,
    ) -> napi::bindgen_prelude::Result<napi::bindgen_prelude::sys::napi_value> {
        let mut fn_ptr = std::ptr::null_mut();
        {
            let c = napi::bindgen_prelude::sys::napi_create_function(
                env,
                "printSync\0".as_ptr() as *const _,
                10usize,
                Some(__napi__print_sync),
                std::ptr::null_mut(),
                &mut fn_ptr,
            );
            match c {
                ::napi::sys::Status::napi_ok => Ok(()),
                _ => Err(::napi::Error::new(::napi::Status::from(c), {
                    let res = ::alloc::fmt::format(::core::fmt::Arguments::new_v1(
                        &["Failed to register function `", "`"],
                        &[::core::fmt::ArgumentV1::new_display(&"print_sync")],
                    ));
                    res
                })),
            }
        }?;
        napi::bindgen_prelude::register_js_function(
            "printSync\0",
            print_sync_js_function,
            Some(__napi__print_sync),
        );
        Ok(fn_ptr)
    }
    #[allow(clippy::all)]
    #[allow(non_snake_case)]
    #[cfg(all(not(test), not(feature = "noop")))]
    extern "C" fn __napi_register__print_sync() {
        napi::bindgen_prelude::register_module_export(None, "printSync\0", print_sync_js_function);
    }
    #[used]
    #[allow(non_upper_case_globals)]
    #[doc(hidden)]
    #[link_section = "__DATA,__mod_init_func"]
    static __napi_register__print_sync___rust_ctor___ctor: unsafe extern "C" fn() = {
        unsafe extern "C" fn __napi_register__print_sync___rust_ctor___ctor() {
            __napi_register__print_sync()
        };
        __napi_register__print_sync___rust_ctor___ctor
    };
    pub fn print_sync_from_buffer(buff: Buffer, options: Buffer) -> napi::Result<TransformOutput> {
        swc_nodejs_common::init_default_trace_subscriber();
        let c = get_compiler();
        let bytes: &[u8] = buff.as_ref();
        let ptr = bytes.as_ptr();
        let len: i32 = bytes
            .len()
            .try_into()
            .expect("Should able to convert ptr length");
        let program: Program = unsafe {
            deserialize_from_ptr(ptr, len)
                .map(|v| v.into_inner())
                .expect("Should able to deserialize")
        };
        let options: Options = get_deserialized(&options)?;
        let codegen_target = options.codegen_target().unwrap_or_default();
        c.print(
            &program,
            None,
            options.output_path,
            true,
            codegen_target,
            options
                .source_maps
                .clone()
                .unwrap_or(SourceMapsConfig::Bool(false)),
            &Default::default(),
            None,
            options.config.minify.into_bool(),
            None,
            options.config.emit_source_map_columns.into_bool(),
            false,
        )
        .convert_err()
    }
    #[doc(hidden)]
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    extern "C" fn __napi__print_sync_from_buffer(
        env: napi::bindgen_prelude::sys::napi_env,
        cb: napi::bindgen_prelude::sys::napi_callback_info,
    ) -> napi::bindgen_prelude::sys::napi_value {
        unsafe {
            napi::bindgen_prelude::CallbackInfo::<2usize>::new(env, cb, None)
                .and_then(|mut cb| {
                    let arg0 = {
                        <Buffer as napi::bindgen_prelude::FromNapiValue>::from_napi_value(
                            env,
                            cb.get_arg(0usize),
                        )?
                    };
                    let arg1 = {
                        <Buffer as napi::bindgen_prelude::FromNapiValue>::from_napi_value(
                            env,
                            cb.get_arg(1usize),
                        )?
                    };
                    let _ret = { print_sync_from_buffer(arg0, arg1) };
                    match _ret {
                        Ok(value) => napi::bindgen_prelude::ToNapiValue::to_napi_value(env, value),
                        Err(err) => {
                            napi::bindgen_prelude::JsError::from(err).throw_into(env);
                            Ok(std::ptr::null_mut())
                        }
                    }
                })
                .unwrap_or_else(|e| {
                    napi::bindgen_prelude::JsError::from(e).throw_into(env);
                    std::ptr::null_mut::<napi::bindgen_prelude::sys::napi_value__>()
                })
        }
    }
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    unsafe fn print_sync_from_buffer_js_function(
        env: napi::bindgen_prelude::sys::napi_env,
    ) -> napi::bindgen_prelude::Result<napi::bindgen_prelude::sys::napi_value> {
        let mut fn_ptr = std::ptr::null_mut();
        {
            let c = napi::bindgen_prelude::sys::napi_create_function(
                env,
                "printSyncFromBuffer\0".as_ptr() as *const _,
                20usize,
                Some(__napi__print_sync_from_buffer),
                std::ptr::null_mut(),
                &mut fn_ptr,
            );
            match c {
                ::napi::sys::Status::napi_ok => Ok(()),
                _ => Err(::napi::Error::new(::napi::Status::from(c), {
                    let res = ::alloc::fmt::format(::core::fmt::Arguments::new_v1(
                        &["Failed to register function `", "`"],
                        &[::core::fmt::ArgumentV1::new_display(
                            &"print_sync_from_buffer",
                        )],
                    ));
                    res
                })),
            }
        }?;
        napi::bindgen_prelude::register_js_function(
            "printSyncFromBuffer\0",
            print_sync_from_buffer_js_function,
            Some(__napi__print_sync_from_buffer),
        );
        Ok(fn_ptr)
    }
    #[allow(clippy::all)]
    #[allow(non_snake_case)]
    #[cfg(all(not(test), not(feature = "noop")))]
    extern "C" fn __napi_register__print_sync_from_buffer() {
        napi::bindgen_prelude::register_module_export(
            None,
            "printSyncFromBuffer\0",
            print_sync_from_buffer_js_function,
        );
    }
    #[used]
    #[allow(non_upper_case_globals)]
    #[doc(hidden)]
    #[link_section = "__DATA,__mod_init_func"]
    static __napi_register__print_sync_from_buffer___rust_ctor___ctor: unsafe extern "C" fn() = {
        unsafe extern "C" fn __napi_register__print_sync_from_buffer___rust_ctor___ctor() {
            __napi_register__print_sync_from_buffer()
        };
        __napi_register__print_sync_from_buffer___rust_ctor___ctor
    };
}
mod transform {
    use std::{
        path::{Path, PathBuf},
        sync::Arc,
    };

    use anyhow::Context as _;
    use napi::{
        bindgen_prelude::{AbortSignal, AsyncTask, Buffer},
        Env, JsBuffer, JsBufferValue, Ref, Task,
    };
    use path_clean::clean;
    use swc::{config::Options, Compiler, TransformOutput};
    use swc_common::{plugin::deserialize_from_ptr, FileName};
    use swc_ecma_ast::Program;
    use swc_nodejs_common::{deserialize_json, get_deserialized, MapErr};
    use tracing::instrument;

    use crate::{get_compiler, util::try_with};
    /// Input to transform
    pub enum Input {
        /// json string
        Program(String),
        /// Raw source code.
        Source { src: String },
        /// File
        File(PathBuf),
    }
    #[automatically_derived]
    #[allow(unused_qualifications)]
    impl ::core::fmt::Debug for Input {
        fn fmt(&self, f: &mut ::core::fmt::Formatter) -> ::core::fmt::Result {
            match (&*self,) {
                (&Input::Program(ref __self_0),) => {
                    let debug_trait_builder =
                        &mut ::core::fmt::Formatter::debug_tuple(f, "Program");
                    let _ = ::core::fmt::DebugTuple::field(debug_trait_builder, &&(*__self_0));
                    ::core::fmt::DebugTuple::finish(debug_trait_builder)
                }
                (&Input::Source { src: ref __self_0 },) => {
                    let debug_trait_builder =
                        &mut ::core::fmt::Formatter::debug_struct(f, "Source");
                    let _ =
                        ::core::fmt::DebugStruct::field(debug_trait_builder, "src", &&(*__self_0));
                    ::core::fmt::DebugStruct::finish(debug_trait_builder)
                }
                (&Input::File(ref __self_0),) => {
                    let debug_trait_builder = &mut ::core::fmt::Formatter::debug_tuple(f, "File");
                    let _ = ::core::fmt::DebugTuple::field(debug_trait_builder, &&(*__self_0));
                    ::core::fmt::DebugTuple::finish(debug_trait_builder)
                }
            }
        }
    }
    pub struct TransformTask {
        pub c: Arc<Compiler>,
        pub input: Input,
        pub options: Ref<JsBufferValue>,
    }
    impl Task for TransformTask {
        type JsValue = TransformOutput;
        type Output = TransformOutput;

        fn compute(&mut self) -> napi::Result<Self::Output> {
            {}
            #[allow(clippy::suspicious_else_formatting)]
            {
                let __tracing_attr_span;
                let __tracing_attr_guard;
                if tracing::Level::TRACE <= ::tracing::level_filters::STATIC_MAX_LEVEL
                    && tracing::Level::TRACE <= ::tracing::level_filters::LevelFilter::current()
                {
                    __tracing_attr_span = {
                        use tracing::__macro_support::Callsite as _;
                        static CALLSITE: ::tracing::__macro_support::MacroCallsite = {
                            use tracing::__macro_support::MacroCallsite;
                            static META: ::tracing::Metadata<'static> = {
                                ::tracing_core::metadata::Metadata::new(
                                    "compute",
                                    "binding_core_node::transform",
                                    tracing::Level::TRACE,
                                    Some("crates/binding_core_node/src/transform.rs"),
                                    Some(42u32),
                                    Some("binding_core_node::transform"),
                                    ::tracing_core::field::FieldSet::new(
                                        &[],
                                        ::tracing_core::callsite::Identifier(&CALLSITE),
                                    ),
                                    ::tracing::metadata::Kind::SPAN,
                                )
                            };
                            MacroCallsite::new(&META)
                        };
                        let mut interest = ::tracing::subscriber::Interest::never();
                        if tracing::Level::TRACE <= ::tracing::level_filters::STATIC_MAX_LEVEL
                            && tracing::Level::TRACE
                                <= ::tracing::level_filters::LevelFilter::current()
                            && {
                                interest = CALLSITE.interest();
                                !interest.is_never()
                            }
                            && CALLSITE.is_enabled(interest)
                        {
                            let meta = CALLSITE.metadata();
                            ::tracing::Span::new(meta, &{ meta.fields().value_set(&[]) })
                        } else {
                            let span = CALLSITE.disabled_span();
                            if match tracing::Level::TRACE {
                                ::tracing::Level::ERROR => ::tracing::log::Level::Error,
                                ::tracing::Level::WARN => ::tracing::log::Level::Warn,
                                ::tracing::Level::INFO => ::tracing::log::Level::Info,
                                ::tracing::Level::DEBUG => ::tracing::log::Level::Debug,
                                _ => ::tracing::log::Level::Trace,
                            } <= ::tracing::log::STATIC_MAX_LEVEL
                            {
                                if !::tracing::dispatcher::has_been_set() {
                                    {
                                        span.record_all(&{
                                            CALLSITE.metadata().fields().value_set(&[])
                                        });
                                    }
                                } else {
                                    {}
                                }
                            } else {
                                {}
                            };
                            span
                        }
                    };
                    __tracing_attr_guard = __tracing_attr_span.enter();
                }
                #[warn(clippy::suspicious_else_formatting)]
                {
                    let mut options: Options = serde_json::from_slice(self.options.as_ref())?;
                    if !options.filename.is_empty() {
                        options.config.adjust(Path::new(&options.filename));
                    }
                    let error_format = options.experimental.error_format.unwrap_or_default();
                    try_with(
                        self.c.cm.clone(),
                        !options.config.error.filename.into_bool(),
                        error_format,
                        |handler| {
                            self.c.run(|| match &self.input {
                                Input::Program(ref s) => {
                                    let program: Program =
                                        deserialize_json(s).expect("failed to deserialize Program");
                                    self.c.process_js(handler, program, &options)
                                }
                                Input::File(ref path) => {
                                    let fm =
                                        self.c.cm.load_file(path).context("failed to load file")?;
                                    self.c.process_js_file(fm, handler, &options)
                                }
                                Input::Source { src } => {
                                    let fm = self.c.cm.new_source_file(
                                        if options.filename.is_empty() {
                                            FileName::Anon
                                        } else {
                                            FileName::Real(options.filename.clone().into())
                                        },
                                        src.to_string(),
                                    );
                                    self.c.process_js_file(fm, handler, &options)
                                }
                            })
                        },
                    )
                    .convert_err()
                }
            }
        }

        fn resolve(&mut self, _env: Env, result: Self::Output) -> napi::Result<Self::JsValue> {
            Ok(result)
        }

        fn finally(&mut self, env: Env) -> napi::Result<()> {
            self.options.unref(env)?;
            Ok(())
        }
    }
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    mod __napi_impl_helper__TransformTask__5 {
        use super::*;
        #[cfg(all(not(test), not(feature = "noop")))]
        extern "C" fn __napi_register__TransformTask_impl() {
            napi::__private::register_class(
                "TransformTask",
                None,
                "TransformTask\0",
                ::alloc::vec::Vec::new(),
            );
        }
        #[used]
        #[allow(non_upper_case_globals)]
        #[doc(hidden)]
        #[link_section = "__DATA,__mod_init_func"]
        static __napi_register__TransformTask_impl___rust_ctor___ctor: unsafe extern "C" fn() = {
            unsafe extern "C" fn __napi_register__TransformTask_impl___rust_ctor___ctor() {
                __napi_register__TransformTask_impl()
            };
            __napi_register__TransformTask_impl___rust_ctor___ctor
        };
    }
    pub fn transform(
        src: String,
        is_module: bool,
        options: JsBuffer,
        signal: Option<AbortSignal>,
    ) -> napi::Result<AsyncTask<TransformTask>> {
        {}
        #[allow(clippy::suspicious_else_formatting)]
        {
            let __tracing_attr_span;
            let __tracing_attr_guard;
            if tracing::Level::TRACE <= ::tracing::level_filters::STATIC_MAX_LEVEL
                && tracing::Level::TRACE <= ::tracing::level_filters::LevelFilter::current()
            {
                __tracing_attr_span = {
                    use tracing::__macro_support::Callsite as _;
                    static CALLSITE: ::tracing::__macro_support::MacroCallsite = {
                        use tracing::__macro_support::MacroCallsite;
                        static META: ::tracing::Metadata<'static> = {
                            ::tracing_core::metadata::Metadata::new(
                                "transform",
                                "binding_core_node::transform",
                                tracing::Level::TRACE,
                                Some("crates/binding_core_node/src/transform.rs"),
                                Some(98u32),
                                Some("binding_core_node::transform"),
                                ::tracing_core::field::FieldSet::new(
                                    &[],
                                    ::tracing_core::callsite::Identifier(&CALLSITE),
                                ),
                                ::tracing::metadata::Kind::SPAN,
                            )
                        };
                        MacroCallsite::new(&META)
                    };
                    let mut interest = ::tracing::subscriber::Interest::never();
                    if tracing::Level::TRACE <= ::tracing::level_filters::STATIC_MAX_LEVEL
                        && tracing::Level::TRACE <= ::tracing::level_filters::LevelFilter::current()
                        && {
                            interest = CALLSITE.interest();
                            !interest.is_never()
                        }
                        && CALLSITE.is_enabled(interest)
                    {
                        let meta = CALLSITE.metadata();
                        ::tracing::Span::new(meta, &{ meta.fields().value_set(&[]) })
                    } else {
                        let span = CALLSITE.disabled_span();
                        if match tracing::Level::TRACE {
                            ::tracing::Level::ERROR => ::tracing::log::Level::Error,
                            ::tracing::Level::WARN => ::tracing::log::Level::Warn,
                            ::tracing::Level::INFO => ::tracing::log::Level::Info,
                            ::tracing::Level::DEBUG => ::tracing::log::Level::Debug,
                            _ => ::tracing::log::Level::Trace,
                        } <= ::tracing::log::STATIC_MAX_LEVEL
                        {
                            if !::tracing::dispatcher::has_been_set() {
                                {
                                    span.record_all(&{
                                        CALLSITE.metadata().fields().value_set(&[])
                                    });
                                }
                            } else {
                                {}
                            }
                        } else {
                            {}
                        };
                        span
                    }
                };
                __tracing_attr_guard = __tracing_attr_span.enter();
            }
            #[warn(clippy::suspicious_else_formatting)]
            {
                swc_nodejs_common::init_default_trace_subscriber();
                let c = get_compiler();
                let input = if is_module {
                    Input::Program(src)
                } else {
                    Input::Source { src }
                };
                let task = TransformTask {
                    c,
                    input,
                    options: options.into_ref()?,
                };
                Ok(AsyncTask::with_optional_signal(task, signal))
            }
        }
    }
    #[doc(hidden)]
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    extern "C" fn __napi__transform(
        env: napi::bindgen_prelude::sys::napi_env,
        cb: napi::bindgen_prelude::sys::napi_callback_info,
    ) -> napi::bindgen_prelude::sys::napi_value {
        {}
        #[allow(clippy::suspicious_else_formatting)]
        {
            let __tracing_attr_span;
            let __tracing_attr_guard;
            if tracing::Level::TRACE <= ::tracing::level_filters::STATIC_MAX_LEVEL
                && tracing::Level::TRACE <= ::tracing::level_filters::LevelFilter::current()
            {
                __tracing_attr_span = {
                    use tracing::__macro_support::Callsite as _;
                    static CALLSITE: ::tracing::__macro_support::MacroCallsite = {
                        use tracing::__macro_support::MacroCallsite;
                        static META: ::tracing::Metadata<'static> = {
                            ::tracing_core::metadata::Metadata::new(
                                "__napi__transform",
                                "binding_core_node::transform",
                                tracing::Level::TRACE,
                                Some("crates/binding_core_node/src/transform.rs"),
                                Some(98u32),
                                Some("binding_core_node::transform"),
                                ::tracing_core::field::FieldSet::new(
                                    &[],
                                    ::tracing_core::callsite::Identifier(&CALLSITE),
                                ),
                                ::tracing::metadata::Kind::SPAN,
                            )
                        };
                        MacroCallsite::new(&META)
                    };
                    let mut interest = ::tracing::subscriber::Interest::never();
                    if tracing::Level::TRACE <= ::tracing::level_filters::STATIC_MAX_LEVEL
                        && tracing::Level::TRACE <= ::tracing::level_filters::LevelFilter::current()
                        && {
                            interest = CALLSITE.interest();
                            !interest.is_never()
                        }
                        && CALLSITE.is_enabled(interest)
                    {
                        let meta = CALLSITE.metadata();
                        ::tracing::Span::new(meta, &{ meta.fields().value_set(&[]) })
                    } else {
                        let span = CALLSITE.disabled_span();
                        if match tracing::Level::TRACE {
                            ::tracing::Level::ERROR => ::tracing::log::Level::Error,
                            ::tracing::Level::WARN => ::tracing::log::Level::Warn,
                            ::tracing::Level::INFO => ::tracing::log::Level::Info,
                            ::tracing::Level::DEBUG => ::tracing::log::Level::Debug,
                            _ => ::tracing::log::Level::Trace,
                        } <= ::tracing::log::STATIC_MAX_LEVEL
                        {
                            if !::tracing::dispatcher::has_been_set() {
                                {
                                    span.record_all(&{
                                        CALLSITE.metadata().fields().value_set(&[])
                                    });
                                }
                            } else {
                                {}
                            }
                        } else {
                            {}
                        };
                        span
                    }
                };
                __tracing_attr_guard = __tracing_attr_span.enter();
            }
            #[warn(clippy::suspicious_else_formatting)]
            {
                unsafe {
                    napi :: bindgen_prelude :: CallbackInfo :: < 4usize > :: new (env , cb , None) . and_then (| mut cb | { let arg0 = { < String as napi :: bindgen_prelude :: FromNapiValue > :: from_napi_value (env , cb . get_arg (0usize)) ? } ; let arg1 = { < bool as napi :: bindgen_prelude :: FromNapiValue > :: from_napi_value (env , cb . get_arg (1usize)) ? } ; let arg2 = { < JsBuffer as napi :: bindgen_prelude :: FromNapiValue > :: from_napi_value (env , cb . get_arg (2usize)) ? } ; let arg3 = { < Option < AbortSignal > as napi :: bindgen_prelude :: FromNapiValue > :: from_napi_value (env , cb . get_arg (3usize)) ? } ; let _ret = { transform (arg0 , arg1 , arg2 , arg3) } ; match _ret { Ok (value) => napi :: bindgen_prelude :: ToNapiValue :: to_napi_value (env , value) , Err (err) => { napi :: bindgen_prelude :: JsError :: from (err) . throw_into (env) ; Ok (std :: ptr :: null_mut ()) } } }) . unwrap_or_else (| e | { napi :: bindgen_prelude :: JsError :: from (e) . throw_into (env) ; std :: ptr :: null_mut :: < napi :: bindgen_prelude :: sys :: napi_value__ > () })
                }
            }
        }
    }
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    unsafe fn transform_js_function(
        env: napi::bindgen_prelude::sys::napi_env,
    ) -> napi::bindgen_prelude::Result<napi::bindgen_prelude::sys::napi_value> {
        let mut fn_ptr = std::ptr::null_mut();
        {
            let c = napi::bindgen_prelude::sys::napi_create_function(
                env,
                "transform\0".as_ptr() as *const _,
                10usize,
                Some(__napi__transform),
                std::ptr::null_mut(),
                &mut fn_ptr,
            );
            match c {
                ::napi::sys::Status::napi_ok => Ok(()),
                _ => Err(::napi::Error::new(::napi::Status::from(c), {
                    let res = ::alloc::fmt::format(::core::fmt::Arguments::new_v1(
                        &["Failed to register function `", "`"],
                        &[::core::fmt::ArgumentV1::new_display(&"transform")],
                    ));
                    res
                })),
            }
        }?;
        napi::bindgen_prelude::register_js_function(
            "transform\0",
            transform_js_function,
            Some(__napi__transform),
        );
        Ok(fn_ptr)
    }
    #[allow(clippy::all)]
    #[allow(non_snake_case)]
    #[cfg(all(not(test), not(feature = "noop")))]
    extern "C" fn __napi_register__transform() {
        napi::bindgen_prelude::register_module_export(None, "transform\0", transform_js_function);
    }
    #[used]
    #[allow(non_upper_case_globals)]
    #[doc(hidden)]
    #[link_section = "__DATA,__mod_init_func"]
    static __napi_register__transform___rust_ctor___ctor: unsafe extern "C" fn() = {
        unsafe extern "C" fn __napi_register__transform___rust_ctor___ctor() {
            __napi_register__transform()
        };
        __napi_register__transform___rust_ctor___ctor
    };
    pub fn transform_sync(
        s: String,
        is_module: bool,
        opts: Buffer,
    ) -> napi::Result<TransformOutput> {
        {}
        #[allow(clippy::suspicious_else_formatting)]
        {
            let __tracing_attr_span;
            let __tracing_attr_guard;
            if tracing::Level::TRACE <= ::tracing::level_filters::STATIC_MAX_LEVEL
                && tracing::Level::TRACE <= ::tracing::level_filters::LevelFilter::current()
            {
                __tracing_attr_span = {
                    use tracing::__macro_support::Callsite as _;
                    static CALLSITE: ::tracing::__macro_support::MacroCallsite = {
                        use tracing::__macro_support::MacroCallsite;
                        static META: ::tracing::Metadata<'static> = {
                            ::tracing_core::metadata::Metadata::new(
                                "transform_sync",
                                "binding_core_node::transform",
                                tracing::Level::TRACE,
                                Some("crates/binding_core_node/src/transform.rs"),
                                Some(124u32),
                                Some("binding_core_node::transform"),
                                ::tracing_core::field::FieldSet::new(
                                    &[],
                                    ::tracing_core::callsite::Identifier(&CALLSITE),
                                ),
                                ::tracing::metadata::Kind::SPAN,
                            )
                        };
                        MacroCallsite::new(&META)
                    };
                    let mut interest = ::tracing::subscriber::Interest::never();
                    if tracing::Level::TRACE <= ::tracing::level_filters::STATIC_MAX_LEVEL
                        && tracing::Level::TRACE <= ::tracing::level_filters::LevelFilter::current()
                        && {
                            interest = CALLSITE.interest();
                            !interest.is_never()
                        }
                        && CALLSITE.is_enabled(interest)
                    {
                        let meta = CALLSITE.metadata();
                        ::tracing::Span::new(meta, &{ meta.fields().value_set(&[]) })
                    } else {
                        let span = CALLSITE.disabled_span();
                        if match tracing::Level::TRACE {
                            ::tracing::Level::ERROR => ::tracing::log::Level::Error,
                            ::tracing::Level::WARN => ::tracing::log::Level::Warn,
                            ::tracing::Level::INFO => ::tracing::log::Level::Info,
                            ::tracing::Level::DEBUG => ::tracing::log::Level::Debug,
                            _ => ::tracing::log::Level::Trace,
                        } <= ::tracing::log::STATIC_MAX_LEVEL
                        {
                            if !::tracing::dispatcher::has_been_set() {
                                {
                                    span.record_all(&{
                                        CALLSITE.metadata().fields().value_set(&[])
                                    });
                                }
                            } else {
                                {}
                            }
                        } else {
                            {}
                        };
                        span
                    }
                };
                __tracing_attr_guard = __tracing_attr_span.enter();
            }
            #[warn(clippy::suspicious_else_formatting)]
            {
                swc_nodejs_common::init_default_trace_subscriber();
                let c = get_compiler();
                let mut options: Options = get_deserialized(&opts)?;
                if !options.filename.is_empty() {
                    options.config.adjust(Path::new(&options.filename));
                }
                let error_format = options.experimental.error_format.unwrap_or_default();
                try_with(
                    c.cm.clone(),
                    !options.config.error.filename.into_bool(),
                    error_format,
                    |handler| {
                        c.run(|| {
                            if is_module {
                                let program: Program = deserialize_json(s.as_str())
                                    .context("failed to deserialize Program")?;
                                c.process_js(handler, program, &options)
                            } else {
                                let fm = c.cm.new_source_file(
                                    if options.filename.is_empty() {
                                        FileName::Anon
                                    } else {
                                        FileName::Real(options.filename.clone().into())
                                    },
                                    s,
                                );
                                c.process_js_file(fm, handler, &options)
                            }
                        })
                    },
                )
                .convert_err()
            }
        }
    }
    #[doc(hidden)]
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    extern "C" fn __napi__transform_sync(
        env: napi::bindgen_prelude::sys::napi_env,
        cb: napi::bindgen_prelude::sys::napi_callback_info,
    ) -> napi::bindgen_prelude::sys::napi_value {
        {}
        #[allow(clippy::suspicious_else_formatting)]
        {
            let __tracing_attr_span;
            let __tracing_attr_guard;
            if tracing::Level::TRACE <= ::tracing::level_filters::STATIC_MAX_LEVEL
                && tracing::Level::TRACE <= ::tracing::level_filters::LevelFilter::current()
            {
                __tracing_attr_span = {
                    use tracing::__macro_support::Callsite as _;
                    static CALLSITE: ::tracing::__macro_support::MacroCallsite = {
                        use tracing::__macro_support::MacroCallsite;
                        static META: ::tracing::Metadata<'static> = {
                            ::tracing_core::metadata::Metadata::new(
                                "__napi__transform_sync",
                                "binding_core_node::transform",
                                tracing::Level::TRACE,
                                Some("crates/binding_core_node/src/transform.rs"),
                                Some(124u32),
                                Some("binding_core_node::transform"),
                                ::tracing_core::field::FieldSet::new(
                                    &[],
                                    ::tracing_core::callsite::Identifier(&CALLSITE),
                                ),
                                ::tracing::metadata::Kind::SPAN,
                            )
                        };
                        MacroCallsite::new(&META)
                    };
                    let mut interest = ::tracing::subscriber::Interest::never();
                    if tracing::Level::TRACE <= ::tracing::level_filters::STATIC_MAX_LEVEL
                        && tracing::Level::TRACE <= ::tracing::level_filters::LevelFilter::current()
                        && {
                            interest = CALLSITE.interest();
                            !interest.is_never()
                        }
                        && CALLSITE.is_enabled(interest)
                    {
                        let meta = CALLSITE.metadata();
                        ::tracing::Span::new(meta, &{ meta.fields().value_set(&[]) })
                    } else {
                        let span = CALLSITE.disabled_span();
                        if match tracing::Level::TRACE {
                            ::tracing::Level::ERROR => ::tracing::log::Level::Error,
                            ::tracing::Level::WARN => ::tracing::log::Level::Warn,
                            ::tracing::Level::INFO => ::tracing::log::Level::Info,
                            ::tracing::Level::DEBUG => ::tracing::log::Level::Debug,
                            _ => ::tracing::log::Level::Trace,
                        } <= ::tracing::log::STATIC_MAX_LEVEL
                        {
                            if !::tracing::dispatcher::has_been_set() {
                                {
                                    span.record_all(&{
                                        CALLSITE.metadata().fields().value_set(&[])
                                    });
                                }
                            } else {
                                {}
                            }
                        } else {
                            {}
                        };
                        span
                    }
                };
                __tracing_attr_guard = __tracing_attr_span.enter();
            }
            #[warn(clippy::suspicious_else_formatting)]
            {
                unsafe {
                    napi::bindgen_prelude::CallbackInfo::<3usize>::new(env, cb, None)
                        .and_then(|mut cb| {
                            let arg0 = {
                                <String as napi::bindgen_prelude::FromNapiValue>::from_napi_value(
                                    env,
                                    cb.get_arg(0usize),
                                )?
                            };
                            let arg1 = {
                                <bool as napi::bindgen_prelude::FromNapiValue>::from_napi_value(
                                    env,
                                    cb.get_arg(1usize),
                                )?
                            };
                            let arg2 = {
                                <Buffer as napi::bindgen_prelude::FromNapiValue>::from_napi_value(
                                    env,
                                    cb.get_arg(2usize),
                                )?
                            };
                            let _ret = { transform_sync(arg0, arg1, arg2) };
                            match _ret {
                                Ok(value) => {
                                    napi::bindgen_prelude::ToNapiValue::to_napi_value(env, value)
                                }
                                Err(err) => {
                                    napi::bindgen_prelude::JsError::from(err).throw_into(env);
                                    Ok(std::ptr::null_mut())
                                }
                            }
                        })
                        .unwrap_or_else(|e| {
                            napi::bindgen_prelude::JsError::from(e).throw_into(env);
                            std::ptr::null_mut::<napi::bindgen_prelude::sys::napi_value__>()
                        })
                }
            }
        }
    }
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    unsafe fn transform_sync_js_function(
        env: napi::bindgen_prelude::sys::napi_env,
    ) -> napi::bindgen_prelude::Result<napi::bindgen_prelude::sys::napi_value> {
        let mut fn_ptr = std::ptr::null_mut();
        {
            let c = napi::bindgen_prelude::sys::napi_create_function(
                env,
                "transformSync\0".as_ptr() as *const _,
                14usize,
                Some(__napi__transform_sync),
                std::ptr::null_mut(),
                &mut fn_ptr,
            );
            match c {
                ::napi::sys::Status::napi_ok => Ok(()),
                _ => Err(::napi::Error::new(::napi::Status::from(c), {
                    let res = ::alloc::fmt::format(::core::fmt::Arguments::new_v1(
                        &["Failed to register function `", "`"],
                        &[::core::fmt::ArgumentV1::new_display(&"transform_sync")],
                    ));
                    res
                })),
            }
        }?;
        napi::bindgen_prelude::register_js_function(
            "transformSync\0",
            transform_sync_js_function,
            Some(__napi__transform_sync),
        );
        Ok(fn_ptr)
    }
    #[allow(clippy::all)]
    #[allow(non_snake_case)]
    #[cfg(all(not(test), not(feature = "noop")))]
    extern "C" fn __napi_register__transform_sync() {
        napi::bindgen_prelude::register_module_export(
            None,
            "transformSync\0",
            transform_sync_js_function,
        );
    }
    #[used]
    #[allow(non_upper_case_globals)]
    #[doc(hidden)]
    #[link_section = "__DATA,__mod_init_func"]
    static __napi_register__transform_sync___rust_ctor___ctor: unsafe extern "C" fn() = {
        unsafe extern "C" fn __napi_register__transform_sync___rust_ctor___ctor() {
            __napi_register__transform_sync()
        };
        __napi_register__transform_sync___rust_ctor___ctor
    };
    pub fn transform_sync_from_buffer(buff: Buffer, opts: Buffer) -> napi::Result<TransformOutput> {
        {}
        #[allow(clippy::suspicious_else_formatting)]
        {
            let __tracing_attr_span;
            let __tracing_attr_guard;
            if tracing::Level::TRACE <= ::tracing::level_filters::STATIC_MAX_LEVEL
                && tracing::Level::TRACE <= ::tracing::level_filters::LevelFilter::current()
            {
                __tracing_attr_span = {
                    use tracing::__macro_support::Callsite as _;
                    static CALLSITE: ::tracing::__macro_support::MacroCallsite = {
                        use tracing::__macro_support::MacroCallsite;
                        static META: ::tracing::Metadata<'static> = {
                            ::tracing_core::metadata::Metadata::new(
                                "transform_sync_from_buffer",
                                "binding_core_node::transform",
                                tracing::Level::TRACE,
                                Some("crates/binding_core_node/src/transform.rs"),
                                Some(166u32),
                                Some("binding_core_node::transform"),
                                ::tracing_core::field::FieldSet::new(
                                    &[],
                                    ::tracing_core::callsite::Identifier(&CALLSITE),
                                ),
                                ::tracing::metadata::Kind::SPAN,
                            )
                        };
                        MacroCallsite::new(&META)
                    };
                    let mut interest = ::tracing::subscriber::Interest::never();
                    if tracing::Level::TRACE <= ::tracing::level_filters::STATIC_MAX_LEVEL
                        && tracing::Level::TRACE <= ::tracing::level_filters::LevelFilter::current()
                        && {
                            interest = CALLSITE.interest();
                            !interest.is_never()
                        }
                        && CALLSITE.is_enabled(interest)
                    {
                        let meta = CALLSITE.metadata();
                        ::tracing::Span::new(meta, &{ meta.fields().value_set(&[]) })
                    } else {
                        let span = CALLSITE.disabled_span();
                        if match tracing::Level::TRACE {
                            ::tracing::Level::ERROR => ::tracing::log::Level::Error,
                            ::tracing::Level::WARN => ::tracing::log::Level::Warn,
                            ::tracing::Level::INFO => ::tracing::log::Level::Info,
                            ::tracing::Level::DEBUG => ::tracing::log::Level::Debug,
                            _ => ::tracing::log::Level::Trace,
                        } <= ::tracing::log::STATIC_MAX_LEVEL
                        {
                            if !::tracing::dispatcher::has_been_set() {
                                {
                                    span.record_all(&{
                                        CALLSITE.metadata().fields().value_set(&[])
                                    });
                                }
                            } else {
                                {}
                            }
                        } else {
                            {}
                        };
                        span
                    }
                };
                __tracing_attr_guard = __tracing_attr_span.enter();
            }
            #[warn(clippy::suspicious_else_formatting)]
            {
                swc_nodejs_common::init_default_trace_subscriber();
                let c = get_compiler();
                let mut options: Options = get_deserialized(&opts)?;
                if !options.filename.is_empty() {
                    options.config.adjust(Path::new(&options.filename));
                }
                let error_format = options.experimental.error_format.unwrap_or_default();
                try_with(
                    c.cm.clone(),
                    !options.config.error.filename.into_bool(),
                    error_format,
                    |handler| {
                        c.run(|| {
                            let bytes: &[u8] = buff.as_ref();
                            let ptr = bytes.as_ptr();
                            let len: i32 = bytes
                                .len()
                                .try_into()
                                .expect("Should able to convert ptr length");
                            let program = unsafe {
                                deserialize_from_ptr(ptr, len)
                                    .map(|v| v.into_inner())
                                    .expect("Should able to deserialize")
                            };
                            c.process_js(handler, program, &options)
                        })
                    },
                )
                .convert_err()
            }
        }
    }
    #[doc(hidden)]
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    extern "C" fn __napi__transform_sync_from_buffer(
        env: napi::bindgen_prelude::sys::napi_env,
        cb: napi::bindgen_prelude::sys::napi_callback_info,
    ) -> napi::bindgen_prelude::sys::napi_value {
        {}
        #[allow(clippy::suspicious_else_formatting)]
        {
            let __tracing_attr_span;
            let __tracing_attr_guard;
            if tracing::Level::TRACE <= ::tracing::level_filters::STATIC_MAX_LEVEL
                && tracing::Level::TRACE <= ::tracing::level_filters::LevelFilter::current()
            {
                __tracing_attr_span = {
                    use tracing::__macro_support::Callsite as _;
                    static CALLSITE: ::tracing::__macro_support::MacroCallsite = {
                        use tracing::__macro_support::MacroCallsite;
                        static META: ::tracing::Metadata<'static> = {
                            ::tracing_core::metadata::Metadata::new(
                                "__napi__transform_sync_from_buffer",
                                "binding_core_node::transform",
                                tracing::Level::TRACE,
                                Some("crates/binding_core_node/src/transform.rs"),
                                Some(166u32),
                                Some("binding_core_node::transform"),
                                ::tracing_core::field::FieldSet::new(
                                    &[],
                                    ::tracing_core::callsite::Identifier(&CALLSITE),
                                ),
                                ::tracing::metadata::Kind::SPAN,
                            )
                        };
                        MacroCallsite::new(&META)
                    };
                    let mut interest = ::tracing::subscriber::Interest::never();
                    if tracing::Level::TRACE <= ::tracing::level_filters::STATIC_MAX_LEVEL
                        && tracing::Level::TRACE <= ::tracing::level_filters::LevelFilter::current()
                        && {
                            interest = CALLSITE.interest();
                            !interest.is_never()
                        }
                        && CALLSITE.is_enabled(interest)
                    {
                        let meta = CALLSITE.metadata();
                        ::tracing::Span::new(meta, &{ meta.fields().value_set(&[]) })
                    } else {
                        let span = CALLSITE.disabled_span();
                        if match tracing::Level::TRACE {
                            ::tracing::Level::ERROR => ::tracing::log::Level::Error,
                            ::tracing::Level::WARN => ::tracing::log::Level::Warn,
                            ::tracing::Level::INFO => ::tracing::log::Level::Info,
                            ::tracing::Level::DEBUG => ::tracing::log::Level::Debug,
                            _ => ::tracing::log::Level::Trace,
                        } <= ::tracing::log::STATIC_MAX_LEVEL
                        {
                            if !::tracing::dispatcher::has_been_set() {
                                {
                                    span.record_all(&{
                                        CALLSITE.metadata().fields().value_set(&[])
                                    });
                                }
                            } else {
                                {}
                            }
                        } else {
                            {}
                        };
                        span
                    }
                };
                __tracing_attr_guard = __tracing_attr_span.enter();
            }
            #[warn(clippy::suspicious_else_formatting)]
            {
                unsafe {
                    napi::bindgen_prelude::CallbackInfo::<2usize>::new(env, cb, None)
                        .and_then(|mut cb| {
                            let arg0 = {
                                <Buffer as napi::bindgen_prelude::FromNapiValue>::from_napi_value(
                                    env,
                                    cb.get_arg(0usize),
                                )?
                            };
                            let arg1 = {
                                <Buffer as napi::bindgen_prelude::FromNapiValue>::from_napi_value(
                                    env,
                                    cb.get_arg(1usize),
                                )?
                            };
                            let _ret = { transform_sync_from_buffer(arg0, arg1) };
                            match _ret {
                                Ok(value) => {
                                    napi::bindgen_prelude::ToNapiValue::to_napi_value(env, value)
                                }
                                Err(err) => {
                                    napi::bindgen_prelude::JsError::from(err).throw_into(env);
                                    Ok(std::ptr::null_mut())
                                }
                            }
                        })
                        .unwrap_or_else(|e| {
                            napi::bindgen_prelude::JsError::from(e).throw_into(env);
                            std::ptr::null_mut::<napi::bindgen_prelude::sys::napi_value__>()
                        })
                }
            }
        }
    }
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    unsafe fn transform_sync_from_buffer_js_function(
        env: napi::bindgen_prelude::sys::napi_env,
    ) -> napi::bindgen_prelude::Result<napi::bindgen_prelude::sys::napi_value> {
        let mut fn_ptr = std::ptr::null_mut();
        {
            let c = napi::bindgen_prelude::sys::napi_create_function(
                env,
                "transformSyncFromBuffer\0".as_ptr() as *const _,
                24usize,
                Some(__napi__transform_sync_from_buffer),
                std::ptr::null_mut(),
                &mut fn_ptr,
            );
            match c {
                ::napi::sys::Status::napi_ok => Ok(()),
                _ => Err(::napi::Error::new(::napi::Status::from(c), {
                    let res = ::alloc::fmt::format(::core::fmt::Arguments::new_v1(
                        &["Failed to register function `", "`"],
                        &[::core::fmt::ArgumentV1::new_display(
                            &"transform_sync_from_buffer",
                        )],
                    ));
                    res
                })),
            }
        }?;
        napi::bindgen_prelude::register_js_function(
            "transformSyncFromBuffer\0",
            transform_sync_from_buffer_js_function,
            Some(__napi__transform_sync_from_buffer),
        );
        Ok(fn_ptr)
    }
    #[allow(clippy::all)]
    #[allow(non_snake_case)]
    #[cfg(all(not(test), not(feature = "noop")))]
    extern "C" fn __napi_register__transform_sync_from_buffer() {
        napi::bindgen_prelude::register_module_export(
            None,
            "transformSyncFromBuffer\0",
            transform_sync_from_buffer_js_function,
        );
    }
    #[used]
    #[allow(non_upper_case_globals)]
    #[doc(hidden)]
    #[link_section = "__DATA,__mod_init_func"]
    static __napi_register__transform_sync_from_buffer___rust_ctor___ctor:
        unsafe extern "C" fn() = {
        unsafe extern "C" fn __napi_register__transform_sync_from_buffer___rust_ctor___ctor() {
            __napi_register__transform_sync_from_buffer()
        };
        __napi_register__transform_sync_from_buffer___rust_ctor___ctor
    };
    pub fn transform_file(
        src: String,
        _is_module: bool,
        options: JsBuffer,
        signal: Option<AbortSignal>,
    ) -> napi::Result<AsyncTask<TransformTask>> {
        {}
        #[allow(clippy::suspicious_else_formatting)]
        {
            let __tracing_attr_span;
            let __tracing_attr_guard;
            if tracing::Level::TRACE <= ::tracing::level_filters::STATIC_MAX_LEVEL
                && tracing::Level::TRACE <= ::tracing::level_filters::LevelFilter::current()
            {
                __tracing_attr_span = {
                    use tracing::__macro_support::Callsite as _;
                    static CALLSITE: ::tracing::__macro_support::MacroCallsite = {
                        use tracing::__macro_support::MacroCallsite;
                        static META: ::tracing::Metadata<'static> = {
                            ::tracing_core::metadata::Metadata::new(
                                "transform_file",
                                "binding_core_node::transform",
                                tracing::Level::TRACE,
                                Some("crates/binding_core_node/src/transform.rs"),
                                Some(206u32),
                                Some("binding_core_node::transform"),
                                ::tracing_core::field::FieldSet::new(
                                    &[],
                                    ::tracing_core::callsite::Identifier(&CALLSITE),
                                ),
                                ::tracing::metadata::Kind::SPAN,
                            )
                        };
                        MacroCallsite::new(&META)
                    };
                    let mut interest = ::tracing::subscriber::Interest::never();
                    if tracing::Level::TRACE <= ::tracing::level_filters::STATIC_MAX_LEVEL
                        && tracing::Level::TRACE <= ::tracing::level_filters::LevelFilter::current()
                        && {
                            interest = CALLSITE.interest();
                            !interest.is_never()
                        }
                        && CALLSITE.is_enabled(interest)
                    {
                        let meta = CALLSITE.metadata();
                        ::tracing::Span::new(meta, &{ meta.fields().value_set(&[]) })
                    } else {
                        let span = CALLSITE.disabled_span();
                        if match tracing::Level::TRACE {
                            ::tracing::Level::ERROR => ::tracing::log::Level::Error,
                            ::tracing::Level::WARN => ::tracing::log::Level::Warn,
                            ::tracing::Level::INFO => ::tracing::log::Level::Info,
                            ::tracing::Level::DEBUG => ::tracing::log::Level::Debug,
                            _ => ::tracing::log::Level::Trace,
                        } <= ::tracing::log::STATIC_MAX_LEVEL
                        {
                            if !::tracing::dispatcher::has_been_set() {
                                {
                                    span.record_all(&{
                                        CALLSITE.metadata().fields().value_set(&[])
                                    });
                                }
                            } else {
                                {}
                            }
                        } else {
                            {}
                        };
                        span
                    }
                };
                __tracing_attr_guard = __tracing_attr_span.enter();
            }
            #[warn(clippy::suspicious_else_formatting)]
            {
                swc_nodejs_common::init_default_trace_subscriber();
                let c = get_compiler();
                let path = clean(&src);
                let task = TransformTask {
                    c,
                    input: Input::File(path.into()),
                    options: options.into_ref()?,
                };
                Ok(AsyncTask::with_optional_signal(task, signal))
            }
        }
    }
    #[doc(hidden)]
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    extern "C" fn __napi__transform_file(
        env: napi::bindgen_prelude::sys::napi_env,
        cb: napi::bindgen_prelude::sys::napi_callback_info,
    ) -> napi::bindgen_prelude::sys::napi_value {
        {}
        #[allow(clippy::suspicious_else_formatting)]
        {
            let __tracing_attr_span;
            let __tracing_attr_guard;
            if tracing::Level::TRACE <= ::tracing::level_filters::STATIC_MAX_LEVEL
                && tracing::Level::TRACE <= ::tracing::level_filters::LevelFilter::current()
            {
                __tracing_attr_span = {
                    use tracing::__macro_support::Callsite as _;
                    static CALLSITE: ::tracing::__macro_support::MacroCallsite = {
                        use tracing::__macro_support::MacroCallsite;
                        static META: ::tracing::Metadata<'static> = {
                            ::tracing_core::metadata::Metadata::new(
                                "__napi__transform_file",
                                "binding_core_node::transform",
                                tracing::Level::TRACE,
                                Some("crates/binding_core_node/src/transform.rs"),
                                Some(206u32),
                                Some("binding_core_node::transform"),
                                ::tracing_core::field::FieldSet::new(
                                    &[],
                                    ::tracing_core::callsite::Identifier(&CALLSITE),
                                ),
                                ::tracing::metadata::Kind::SPAN,
                            )
                        };
                        MacroCallsite::new(&META)
                    };
                    let mut interest = ::tracing::subscriber::Interest::never();
                    if tracing::Level::TRACE <= ::tracing::level_filters::STATIC_MAX_LEVEL
                        && tracing::Level::TRACE <= ::tracing::level_filters::LevelFilter::current()
                        && {
                            interest = CALLSITE.interest();
                            !interest.is_never()
                        }
                        && CALLSITE.is_enabled(interest)
                    {
                        let meta = CALLSITE.metadata();
                        ::tracing::Span::new(meta, &{ meta.fields().value_set(&[]) })
                    } else {
                        let span = CALLSITE.disabled_span();
                        if match tracing::Level::TRACE {
                            ::tracing::Level::ERROR => ::tracing::log::Level::Error,
                            ::tracing::Level::WARN => ::tracing::log::Level::Warn,
                            ::tracing::Level::INFO => ::tracing::log::Level::Info,
                            ::tracing::Level::DEBUG => ::tracing::log::Level::Debug,
                            _ => ::tracing::log::Level::Trace,
                        } <= ::tracing::log::STATIC_MAX_LEVEL
                        {
                            if !::tracing::dispatcher::has_been_set() {
                                {
                                    span.record_all(&{
                                        CALLSITE.metadata().fields().value_set(&[])
                                    });
                                }
                            } else {
                                {}
                            }
                        } else {
                            {}
                        };
                        span
                    }
                };
                __tracing_attr_guard = __tracing_attr_span.enter();
            }
            #[warn(clippy::suspicious_else_formatting)]
            {
                unsafe {
                    napi :: bindgen_prelude :: CallbackInfo :: < 4usize > :: new (env , cb , None) . and_then (| mut cb | { let arg0 = { < String as napi :: bindgen_prelude :: FromNapiValue > :: from_napi_value (env , cb . get_arg (0usize)) ? } ; let arg1 = { < bool as napi :: bindgen_prelude :: FromNapiValue > :: from_napi_value (env , cb . get_arg (1usize)) ? } ; let arg2 = { < JsBuffer as napi :: bindgen_prelude :: FromNapiValue > :: from_napi_value (env , cb . get_arg (2usize)) ? } ; let arg3 = { < Option < AbortSignal > as napi :: bindgen_prelude :: FromNapiValue > :: from_napi_value (env , cb . get_arg (3usize)) ? } ; let _ret = { transform_file (arg0 , arg1 , arg2 , arg3) } ; match _ret { Ok (value) => napi :: bindgen_prelude :: ToNapiValue :: to_napi_value (env , value) , Err (err) => { napi :: bindgen_prelude :: JsError :: from (err) . throw_into (env) ; Ok (std :: ptr :: null_mut ()) } } }) . unwrap_or_else (| e | { napi :: bindgen_prelude :: JsError :: from (e) . throw_into (env) ; std :: ptr :: null_mut :: < napi :: bindgen_prelude :: sys :: napi_value__ > () })
                }
            }
        }
    }
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    unsafe fn transform_file_js_function(
        env: napi::bindgen_prelude::sys::napi_env,
    ) -> napi::bindgen_prelude::Result<napi::bindgen_prelude::sys::napi_value> {
        let mut fn_ptr = std::ptr::null_mut();
        {
            let c = napi::bindgen_prelude::sys::napi_create_function(
                env,
                "transformFile\0".as_ptr() as *const _,
                14usize,
                Some(__napi__transform_file),
                std::ptr::null_mut(),
                &mut fn_ptr,
            );
            match c {
                ::napi::sys::Status::napi_ok => Ok(()),
                _ => Err(::napi::Error::new(::napi::Status::from(c), {
                    let res = ::alloc::fmt::format(::core::fmt::Arguments::new_v1(
                        &["Failed to register function `", "`"],
                        &[::core::fmt::ArgumentV1::new_display(&"transform_file")],
                    ));
                    res
                })),
            }
        }?;
        napi::bindgen_prelude::register_js_function(
            "transformFile\0",
            transform_file_js_function,
            Some(__napi__transform_file),
        );
        Ok(fn_ptr)
    }
    #[allow(clippy::all)]
    #[allow(non_snake_case)]
    #[cfg(all(not(test), not(feature = "noop")))]
    extern "C" fn __napi_register__transform_file() {
        napi::bindgen_prelude::register_module_export(
            None,
            "transformFile\0",
            transform_file_js_function,
        );
    }
    #[used]
    #[allow(non_upper_case_globals)]
    #[doc(hidden)]
    #[link_section = "__DATA,__mod_init_func"]
    static __napi_register__transform_file___rust_ctor___ctor: unsafe extern "C" fn() = {
        unsafe extern "C" fn __napi_register__transform_file___rust_ctor___ctor() {
            __napi_register__transform_file()
        };
        __napi_register__transform_file___rust_ctor___ctor
    };
    pub fn transform_file_sync(
        s: String,
        is_module: bool,
        opts: Buffer,
    ) -> napi::Result<TransformOutput> {
        swc_nodejs_common::init_default_trace_subscriber();
        let c = get_compiler();
        let mut options: Options = get_deserialized(&opts)?;
        if !options.filename.is_empty() {
            options.config.adjust(Path::new(&options.filename));
        }
        let error_format = options.experimental.error_format.unwrap_or_default();
        try_with(
            c.cm.clone(),
            !options.config.error.filename.into_bool(),
            error_format,
            |handler| {
                c.run(|| {
                    if is_module {
                        let program: Program = deserialize_json(s.as_str())
                            .context("failed to deserialize Program")?;
                        c.process_js(handler, program, &options)
                    } else {
                        let fm = c.cm.load_file(Path::new(&s)).expect("failed to load file");
                        c.process_js_file(fm, handler, &options)
                    }
                })
            },
        )
        .convert_err()
    }
    #[doc(hidden)]
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    extern "C" fn __napi__transform_file_sync(
        env: napi::bindgen_prelude::sys::napi_env,
        cb: napi::bindgen_prelude::sys::napi_callback_info,
    ) -> napi::bindgen_prelude::sys::napi_value {
        unsafe {
            napi::bindgen_prelude::CallbackInfo::<3usize>::new(env, cb, None)
                .and_then(|mut cb| {
                    let arg0 = {
                        <String as napi::bindgen_prelude::FromNapiValue>::from_napi_value(
                            env,
                            cb.get_arg(0usize),
                        )?
                    };
                    let arg1 = {
                        <bool as napi::bindgen_prelude::FromNapiValue>::from_napi_value(
                            env,
                            cb.get_arg(1usize),
                        )?
                    };
                    let arg2 = {
                        <Buffer as napi::bindgen_prelude::FromNapiValue>::from_napi_value(
                            env,
                            cb.get_arg(2usize),
                        )?
                    };
                    let _ret = { transform_file_sync(arg0, arg1, arg2) };
                    match _ret {
                        Ok(value) => napi::bindgen_prelude::ToNapiValue::to_napi_value(env, value),
                        Err(err) => {
                            napi::bindgen_prelude::JsError::from(err).throw_into(env);
                            Ok(std::ptr::null_mut())
                        }
                    }
                })
                .unwrap_or_else(|e| {
                    napi::bindgen_prelude::JsError::from(e).throw_into(env);
                    std::ptr::null_mut::<napi::bindgen_prelude::sys::napi_value__>()
                })
        }
    }
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    unsafe fn transform_file_sync_js_function(
        env: napi::bindgen_prelude::sys::napi_env,
    ) -> napi::bindgen_prelude::Result<napi::bindgen_prelude::sys::napi_value> {
        let mut fn_ptr = std::ptr::null_mut();
        {
            let c = napi::bindgen_prelude::sys::napi_create_function(
                env,
                "transformFileSync\0".as_ptr() as *const _,
                18usize,
                Some(__napi__transform_file_sync),
                std::ptr::null_mut(),
                &mut fn_ptr,
            );
            match c {
                ::napi::sys::Status::napi_ok => Ok(()),
                _ => Err(::napi::Error::new(::napi::Status::from(c), {
                    let res = ::alloc::fmt::format(::core::fmt::Arguments::new_v1(
                        &["Failed to register function `", "`"],
                        &[::core::fmt::ArgumentV1::new_display(&"transform_file_sync")],
                    ));
                    res
                })),
            }
        }?;
        napi::bindgen_prelude::register_js_function(
            "transformFileSync\0",
            transform_file_sync_js_function,
            Some(__napi__transform_file_sync),
        );
        Ok(fn_ptr)
    }
    #[allow(clippy::all)]
    #[allow(non_snake_case)]
    #[cfg(all(not(test), not(feature = "noop")))]
    extern "C" fn __napi_register__transform_file_sync() {
        napi::bindgen_prelude::register_module_export(
            None,
            "transformFileSync\0",
            transform_file_sync_js_function,
        );
    }
    #[used]
    #[allow(non_upper_case_globals)]
    #[doc(hidden)]
    #[link_section = "__DATA,__mod_init_func"]
    static __napi_register__transform_file_sync___rust_ctor___ctor: unsafe extern "C" fn() = {
        unsafe extern "C" fn __napi_register__transform_file_sync___rust_ctor___ctor() {
            __napi_register__transform_file_sync()
        };
        __napi_register__transform_file_sync___rust_ctor___ctor
    };
}
mod util {
    #![deny(warnings)]
    use std::panic::{catch_unwind, AssertUnwindSafe};

    use anyhow::{anyhow, Error};
    use napi::Env;
    use swc::{config::ErrorFormat, try_with_handler};
    use swc_common::{
        errors::Handler,
        sync::{Lrc, OnceCell},
        SourceMap,
    };
    use tracing::instrument;
    use tracing_chrome::ChromeLayerBuilder;
    use tracing_subscriber::{
        filter, prelude::__tracing_subscriber_SubscriberExt, util::SubscriberInitExt, Layer,
    };
    static TARGET_TRIPLE: &str = "aarch64-apple-darwin";
    static CUSTOM_TRACE_SUBSCRIBER: OnceCell<bool> = OnceCell::new();
    pub fn get_target_triple() -> napi::Result<String> {
        Ok(TARGET_TRIPLE.to_string())
    }
    #[doc(hidden)]
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    extern "C" fn __napi__get_target_triple(
        env: napi::bindgen_prelude::sys::napi_env,
        cb: napi::bindgen_prelude::sys::napi_callback_info,
    ) -> napi::bindgen_prelude::sys::napi_value {
        unsafe {
            let _ret = { get_target_triple() };
            match _ret {
                Ok(value) => napi::bindgen_prelude::ToNapiValue::to_napi_value(env, value),
                Err(err) => {
                    napi::bindgen_prelude::JsError::from(err).throw_into(env);
                    Ok(std::ptr::null_mut())
                }
            }
            .unwrap_or_else(|e| {
                napi::bindgen_prelude::JsError::from(e).throw_into(env);
                std::ptr::null_mut::<napi::bindgen_prelude::sys::napi_value__>()
            })
        }
    }
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    unsafe fn get_target_triple_js_function(
        env: napi::bindgen_prelude::sys::napi_env,
    ) -> napi::bindgen_prelude::Result<napi::bindgen_prelude::sys::napi_value> {
        let mut fn_ptr = std::ptr::null_mut();
        {
            let c = napi::bindgen_prelude::sys::napi_create_function(
                env,
                "getTargetTriple\0".as_ptr() as *const _,
                16usize,
                Some(__napi__get_target_triple),
                std::ptr::null_mut(),
                &mut fn_ptr,
            );
            match c {
                ::napi::sys::Status::napi_ok => Ok(()),
                _ => Err(::napi::Error::new(::napi::Status::from(c), {
                    let res = ::alloc::fmt::format(::core::fmt::Arguments::new_v1(
                        &["Failed to register function `", "`"],
                        &[::core::fmt::ArgumentV1::new_display(&"get_target_triple")],
                    ));
                    res
                })),
            }
        }?;
        napi::bindgen_prelude::register_js_function(
            "getTargetTriple\0",
            get_target_triple_js_function,
            Some(__napi__get_target_triple),
        );
        Ok(fn_ptr)
    }
    #[allow(clippy::all)]
    #[allow(non_snake_case)]
    #[cfg(all(not(test), not(feature = "noop")))]
    extern "C" fn __napi_register__get_target_triple() {
        napi::bindgen_prelude::register_module_export(
            None,
            "getTargetTriple\0",
            get_target_triple_js_function,
        );
    }
    #[used]
    #[allow(non_upper_case_globals)]
    #[doc(hidden)]
    #[link_section = "__DATA,__mod_init_func"]
    static __napi_register__get_target_triple___rust_ctor___ctor: unsafe extern "C" fn() = {
        unsafe extern "C" fn __napi_register__get_target_triple___rust_ctor___ctor() {
            __napi_register__get_target_triple()
        };
        __napi_register__get_target_triple___rust_ctor___ctor
    };
    pub fn init_custom_trace_subscriber(
        mut env: Env,
        trace_out_file_path: Option<String>,
    ) -> napi::Result<()> {
        CUSTOM_TRACE_SUBSCRIBER.get_or_init(|| {
            let mut layer = ChromeLayerBuilder::new().include_args(true);
            if let Some(trace_out_file) = trace_out_file_path {
                layer = layer.file(trace_out_file);
            }
            let (chrome_layer, guard) = layer.build();
            tracing_subscriber::registry()
                .with(chrome_layer.with_filter(filter::filter_fn(|metadata| {
                    !metadata.target().contains("cranelift") && !metadata.name().contains("log ")
                })))
                .try_init()
                .expect("Failed to register tracing subscriber");
            env.add_env_cleanup_hook(guard, |flush_guard| {
                flush_guard.flush();
                drop(flush_guard);
            })
            .expect("Should able to initialize cleanup for custom trace subscriber");
            true
        });
        Ok(())
    }
    #[doc(hidden)]
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    extern "C" fn __napi__init_custom_trace_subscriber(
        env: napi::bindgen_prelude::sys::napi_env,
        cb: napi::bindgen_prelude::sys::napi_callback_info,
    ) -> napi::bindgen_prelude::sys::napi_value {
        unsafe {
            napi::bindgen_prelude::CallbackInfo::<2usize>::new(env, cb, None)
                .and_then(|mut cb| {
                    let arg0 = {
                        <Option<String> as napi::bindgen_prelude::FromNapiValue>::from_napi_value(
                            env,
                            cb.get_arg(0usize),
                        )?
                    };
                    let _ret = {
                        init_custom_trace_subscriber(napi::bindgen_prelude::Env::from(env), arg0)
                    };
                    match _ret {
                        Ok(value) => napi::bindgen_prelude::ToNapiValue::to_napi_value(env, value),
                        Err(err) => {
                            napi::bindgen_prelude::JsError::from(err).throw_into(env);
                            Ok(std::ptr::null_mut())
                        }
                    }
                })
                .unwrap_or_else(|e| {
                    napi::bindgen_prelude::JsError::from(e).throw_into(env);
                    std::ptr::null_mut::<napi::bindgen_prelude::sys::napi_value__>()
                })
        }
    }
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    unsafe fn init_custom_trace_subscriber_js_function(
        env: napi::bindgen_prelude::sys::napi_env,
    ) -> napi::bindgen_prelude::Result<napi::bindgen_prelude::sys::napi_value> {
        let mut fn_ptr = std::ptr::null_mut();
        {
            let c = napi::bindgen_prelude::sys::napi_create_function(
                env,
                "initCustomTraceSubscriber\0".as_ptr() as *const _,
                26usize,
                Some(__napi__init_custom_trace_subscriber),
                std::ptr::null_mut(),
                &mut fn_ptr,
            );
            match c {
                ::napi::sys::Status::napi_ok => Ok(()),
                _ => Err(::napi::Error::new(::napi::Status::from(c), {
                    let res = ::alloc::fmt::format(::core::fmt::Arguments::new_v1(
                        &["Failed to register function `", "`"],
                        &[::core::fmt::ArgumentV1::new_display(
                            &"init_custom_trace_subscriber",
                        )],
                    ));
                    res
                })),
            }
        }?;
        napi::bindgen_prelude::register_js_function(
            "initCustomTraceSubscriber\0",
            init_custom_trace_subscriber_js_function,
            Some(__napi__init_custom_trace_subscriber),
        );
        Ok(fn_ptr)
    }
    #[allow(clippy::all)]
    #[allow(non_snake_case)]
    #[cfg(all(not(test), not(feature = "noop")))]
    extern "C" fn __napi_register__init_custom_trace_subscriber() {
        napi::bindgen_prelude::register_module_export(
            None,
            "initCustomTraceSubscriber\0",
            init_custom_trace_subscriber_js_function,
        );
    }
    #[used]
    #[allow(non_upper_case_globals)]
    #[doc(hidden)]
    #[link_section = "__DATA,__mod_init_func"]
    static __napi_register__init_custom_trace_subscriber___rust_ctor___ctor:
        unsafe extern "C" fn() = {
        unsafe extern "C" fn __napi_register__init_custom_trace_subscriber___rust_ctor___ctor() {
            __napi_register__init_custom_trace_subscriber()
        };
        __napi_register__init_custom_trace_subscriber___rust_ctor___ctor
    };
    pub fn try_with<F, Ret>(
        cm: Lrc<SourceMap>,
        skip_filename: bool,
        _error_format: ErrorFormat,
        op: F,
    ) -> Result<Ret, Error>
    where
        F: FnOnce(&Handler) -> Result<Ret, Error>,
    {
        {}
        #[allow(clippy::suspicious_else_formatting)]
        {
            let __tracing_attr_span;
            let __tracing_attr_guard;
            if tracing::Level::TRACE <= ::tracing::level_filters::STATIC_MAX_LEVEL
                && tracing::Level::TRACE <= ::tracing::level_filters::LevelFilter::current()
            {
                __tracing_attr_span = {
                    use tracing::__macro_support::Callsite as _;
                    static CALLSITE: ::tracing::__macro_support::MacroCallsite = {
                        use tracing::__macro_support::MacroCallsite;
                        static META: ::tracing::Metadata<'static> = {
                            ::tracing_core::metadata::Metadata::new(
                                "try_with",
                                "binding_core_node::util",
                                tracing::Level::TRACE,
                                Some("crates/binding_core_node/src/util.rs"),
                                Some(58u32),
                                Some("binding_core_node::util"),
                                ::tracing_core::field::FieldSet::new(
                                    &[],
                                    ::tracing_core::callsite::Identifier(&CALLSITE),
                                ),
                                ::tracing::metadata::Kind::SPAN,
                            )
                        };
                        MacroCallsite::new(&META)
                    };
                    let mut interest = ::tracing::subscriber::Interest::never();
                    if tracing::Level::TRACE <= ::tracing::level_filters::STATIC_MAX_LEVEL
                        && tracing::Level::TRACE <= ::tracing::level_filters::LevelFilter::current()
                        && {
                            interest = CALLSITE.interest();
                            !interest.is_never()
                        }
                        && CALLSITE.is_enabled(interest)
                    {
                        let meta = CALLSITE.metadata();
                        ::tracing::Span::new(meta, &{ meta.fields().value_set(&[]) })
                    } else {
                        let span = CALLSITE.disabled_span();
                        if match tracing::Level::TRACE {
                            ::tracing::Level::ERROR => ::tracing::log::Level::Error,
                            ::tracing::Level::WARN => ::tracing::log::Level::Warn,
                            ::tracing::Level::INFO => ::tracing::log::Level::Info,
                            ::tracing::Level::DEBUG => ::tracing::log::Level::Debug,
                            _ => ::tracing::log::Level::Trace,
                        } <= ::tracing::log::STATIC_MAX_LEVEL
                        {
                            if !::tracing::dispatcher::has_been_set() {
                                {
                                    span.record_all(&{
                                        CALLSITE.metadata().fields().value_set(&[])
                                    });
                                }
                            } else {
                                {}
                            }
                        } else {
                            {}
                        };
                        span
                    }
                };
                __tracing_attr_guard = __tracing_attr_span.enter();
            }
            #[warn(clippy::suspicious_else_formatting)]
            {
                try_with_handler(
                    cm,
                    swc::HandlerOpts {
                        skip_filename,
                        ..Default::default()
                    },
                    |handler| {
                        let result = catch_unwind(AssertUnwindSafe(|| op(handler)));
                        let p = match result {
                            Ok(v) => return v,
                            Err(v) => v,
                        };
                        if let Some(s) = p.downcast_ref::<String>() {
                            Err(::anyhow::Error::msg({
                                let res = ::alloc::fmt::format(::core::fmt::Arguments::new_v1(
                                    &["failed to handle: "],
                                    &[::core::fmt::ArgumentV1::new_display(&s)],
                                ));
                                res
                            }))
                        } else if let Some(s) = p.downcast_ref::<&str>() {
                            Err(::anyhow::Error::msg({
                                let res = ::alloc::fmt::format(::core::fmt::Arguments::new_v1(
                                    &["failed to handle: "],
                                    &[::core::fmt::ArgumentV1::new_display(&s)],
                                ));
                                res
                            }))
                        } else {
                            Err(::anyhow::private::must_use({
                                let error =
                                    ::anyhow::private::format_err(::core::fmt::Arguments::new_v1(
                                        &["failed to handle with unknown panic message"],
                                        &[],
                                    ));
                                error
                            }))
                        }
                    },
                )
            }
        }
    }
}
static COMPILER: Lazy<Arc<Compiler>> = Lazy::new(|| {
    let cm = Arc::new(SourceMap::new(FilePathMapping::empty()));
    Arc::new(Compiler::new(cm))
});
extern "C" fn init() {
    if true || env::var("SWC_DEBUG").unwrap_or_default() == "1" {
        set_hook(Box::new(|panic_info| {
            let backtrace = Backtrace::new();
            {
                ::std::io::_print(::core::fmt::Arguments::new_v1(
                    &["Panic: ", "\nBacktrace: ", "\n"],
                    &[
                        ::core::fmt::ArgumentV1::new_debug(&panic_info),
                        ::core::fmt::ArgumentV1::new_debug(&backtrace),
                    ],
                ));
            };
        }));
    }
}
#[used]
#[allow(non_upper_case_globals)]
#[doc(hidden)]
#[link_section = "__DATA,__mod_init_func"]
static init___rust_ctor___ctor: unsafe extern "C" fn() = {
    unsafe extern "C" fn init___rust_ctor___ctor() {
        init()
    };
    init___rust_ctor___ctor
};
fn get_compiler() -> Arc<Compiler> {
    COMPILER.clone()
}
pub struct JsCompiler {
    _compiler: Arc<Compiler>,
}
impl napi::bindgen_prelude::TypeName for JsCompiler {
    fn type_name() -> &'static str {
        "JsCompiler"
    }

    fn value_type() -> napi::ValueType {
        napi::ValueType::Function
    }
}
impl napi::bindgen_prelude::TypeName for &JsCompiler {
    fn type_name() -> &'static str {
        "JsCompiler"
    }

    fn value_type() -> napi::ValueType {
        napi::ValueType::Object
    }
}
impl napi::bindgen_prelude::TypeName for &mut JsCompiler {
    fn type_name() -> &'static str {
        "JsCompiler"
    }

    fn value_type() -> napi::ValueType {
        napi::ValueType::Object
    }
}
impl napi::bindgen_prelude::ToNapiValue for JsCompiler {
    unsafe fn to_napi_value(
        env: napi::sys::napi_env,
        val: JsCompiler,
    ) -> napi::Result<napi::bindgen_prelude::sys::napi_value> {
        if let Some(ctor_ref) = napi::__private::get_class_constructor("Compiler\0") {
            let wrapped_value = Box::into_raw(Box::new(val));
            let instance_value =
                JsCompiler::new_instance(env, wrapped_value as *mut std::ffi::c_void, ctor_ref)?;
            Ok(instance_value)
        } else {
            Err(napi::bindgen_prelude::Error::new(
                napi::bindgen_prelude::Status::InvalidArg,
                {
                    let res = ::alloc::fmt::format(::core::fmt::Arguments::new_v1(
                        &["Failed to get constructor of class `", "` in `ToNapiValue`"],
                        &[::core::fmt::ArgumentV1::new_display(&"Compiler")],
                    ));
                    res
                },
            ))
        }
    }
}
impl JsCompiler {
    pub fn into_reference(
        val: JsCompiler,
        env: napi::Env,
    ) -> napi::Result<napi::bindgen_prelude::Reference<JsCompiler>> {
        if let Some(ctor_ref) = napi::bindgen_prelude::get_class_constructor("Compiler\0") {
            unsafe {
                let wrapped_value = Box::into_raw(Box::new(val));
                let instance_value = JsCompiler::new_instance(
                    env.raw(),
                    wrapped_value as *mut std::ffi::c_void,
                    ctor_ref,
                )?;
                {
                    let env = env.raw();
                }
                napi::bindgen_prelude::Reference::<JsCompiler>::from_value_ptr(
                    wrapped_value as *mut std::ffi::c_void,
                    env.raw(),
                )
            }
        } else {
            Err(napi::bindgen_prelude::Error::new(
                napi::bindgen_prelude::Status::InvalidArg,
                {
                    let res = ::alloc::fmt::format(::core::fmt::Arguments::new_v1(
                        &["Failed to get constructor of class `", "`"],
                        &[::core::fmt::ArgumentV1::new_display(&"Compiler")],
                    ));
                    res
                },
            ))
        }
    }

    pub fn into_instance(
        self,
        env: napi::Env,
    ) -> napi::Result<napi::bindgen_prelude::ClassInstance<JsCompiler>> {
        if let Some(ctor_ref) = napi::bindgen_prelude::get_class_constructor("Compiler\0") {
            unsafe {
                let wrapped_value = Box::leak(Box::new(self));
                let instance_value = JsCompiler::new_instance(
                    env.raw(),
                    wrapped_value as *mut _ as *mut std::ffi::c_void,
                    ctor_ref,
                )?;
                Ok(napi::bindgen_prelude::ClassInstance::<JsCompiler>::new(
                    instance_value,
                    wrapped_value,
                ))
            }
        } else {
            Err(napi::bindgen_prelude::Error::new(
                napi::bindgen_prelude::Status::InvalidArg,
                {
                    let res = ::alloc::fmt::format(::core::fmt::Arguments::new_v1(
                        &["Failed to get constructor of class `", "`"],
                        &[::core::fmt::ArgumentV1::new_display(&"Compiler")],
                    ));
                    res
                },
            ))
        }
    }

    unsafe fn new_instance(
        env: napi::sys::napi_env,
        wrapped_value: *mut std::ffi::c_void,
        ctor_ref: napi::sys::napi_ref,
    ) -> napi::Result<napi::bindgen_prelude::sys::napi_value> {
        let mut ctor = std::ptr::null_mut();
        {
            let c = napi::sys::napi_get_reference_value(env, ctor_ref, &mut ctor);
            match c {
                ::napi::sys::Status::napi_ok => Ok(()),
                _ => Err(::napi::Error::new(::napi::Status::from(c), {
                    let res = ::alloc::fmt::format(::core::fmt::Arguments::new_v1(
                        &["Failed to get constructor reference of class `", "`"],
                        &[::core::fmt::ArgumentV1::new_display(&"Compiler")],
                    ));
                    res
                })),
            }
        }?;
        let mut result = std::ptr::null_mut();
        let inner = napi::__private::___CALL_FROM_FACTORY.get_or_default();
        inner.store(true, std::sync::atomic::Ordering::Relaxed);
        {
            let c = napi::sys::napi_new_instance(env, ctor, 0, std::ptr::null_mut(), &mut result);
            match c {
                ::napi::sys::Status::napi_ok => Ok(()),
                _ => Err(::napi::Error::new(::napi::Status::from(c), {
                    let res = ::alloc::fmt::format(::core::fmt::Arguments::new_v1(
                        &["Failed to construct class `", "`"],
                        &[::core::fmt::ArgumentV1::new_display(&"Compiler")],
                    ));
                    res
                })),
            }
        }?;
        inner.store(false, std::sync::atomic::Ordering::Relaxed);
        let mut object_ref = std::ptr::null_mut();
        let initial_finalize: Box<dyn FnOnce()> = Box::new(|| {});
        let finalize_callbacks_ptr = std::rc::Rc::into_raw(std::rc::Rc::new(std::cell::Cell::new(
            Box::into_raw(initial_finalize),
        )));
        {
            let c = napi::sys::napi_wrap(
                env,
                result,
                wrapped_value,
                Some(napi::bindgen_prelude::raw_finalize_unchecked::<JsCompiler>),
                std::ptr::null_mut(),
                &mut object_ref,
            );
            match c {
                ::napi::sys::Status::napi_ok => Ok(()),
                _ => Err(::napi::Error::new(::napi::Status::from(c), {
                    let res = ::alloc::fmt::format(::core::fmt::Arguments::new_v1(
                        &["Failed to wrap native object of class `", "`"],
                        &[::core::fmt::ArgumentV1::new_display(&"Compiler")],
                    ));
                    res
                })),
            }
        }?;
        napi::bindgen_prelude::Reference::<JsCompiler>::add_ref(
            wrapped_value,
            (wrapped_value, object_ref, finalize_callbacks_ptr),
        );
        Ok(result)
    }
}
impl napi::bindgen_prelude::FromNapiRef for JsCompiler {
    unsafe fn from_napi_ref(
        env: napi::bindgen_prelude::sys::napi_env,
        napi_val: napi::bindgen_prelude::sys::napi_value,
    ) -> napi::bindgen_prelude::Result<&'static Self> {
        let mut wrapped_val: *mut std::ffi::c_void = std::ptr::null_mut();
        {
            let c = napi::bindgen_prelude::sys::napi_unwrap(env, napi_val, &mut wrapped_val);
            match c {
                ::napi::sys::Status::napi_ok => Ok(()),
                _ => Err(::napi::Error::new(::napi::Status::from(c), {
                    let res = ::alloc::fmt::format(::core::fmt::Arguments::new_v1(
                        &["Failed to recover `", "` type from napi value"],
                        &[::core::fmt::ArgumentV1::new_display(&"JsCompiler")],
                    ));
                    res
                })),
            }
        }?;
        Ok(&*(wrapped_val as *const JsCompiler))
    }
}
impl napi::bindgen_prelude::FromNapiMutRef for JsCompiler {
    unsafe fn from_napi_mut_ref(
        env: napi::bindgen_prelude::sys::napi_env,
        napi_val: napi::bindgen_prelude::sys::napi_value,
    ) -> napi::bindgen_prelude::Result<&'static mut Self> {
        let mut wrapped_val: *mut std::ffi::c_void = std::ptr::null_mut();
        {
            let c = napi::bindgen_prelude::sys::napi_unwrap(env, napi_val, &mut wrapped_val);
            match c {
                ::napi::sys::Status::napi_ok => Ok(()),
                _ => Err(::napi::Error::new(::napi::Status::from(c), {
                    let res = ::alloc::fmt::format(::core::fmt::Arguments::new_v1(
                        &["Failed to recover `", "` type from napi value"],
                        &[::core::fmt::ArgumentV1::new_display(&"JsCompiler")],
                    ));
                    res
                })),
            }
        }?;
        Ok(&mut *(wrapped_val as *mut JsCompiler))
    }
}
impl napi::bindgen_prelude::FromNapiValue for &JsCompiler {
    unsafe fn from_napi_value(
        env: napi::bindgen_prelude::sys::napi_env,
        napi_val: napi::bindgen_prelude::sys::napi_value,
    ) -> napi::bindgen_prelude::Result<Self> {
        napi::bindgen_prelude::FromNapiRef::from_napi_ref(env, napi_val)
    }
}
impl napi::bindgen_prelude::FromNapiValue for &mut JsCompiler {
    unsafe fn from_napi_value(
        env: napi::bindgen_prelude::sys::napi_env,
        napi_val: napi::bindgen_prelude::sys::napi_value,
    ) -> napi::bindgen_prelude::Result<Self> {
        napi::bindgen_prelude::FromNapiMutRef::from_napi_mut_ref(env, napi_val)
    }
}
impl napi::NapiRaw for &JsCompiler {
    unsafe fn raw(&self) -> napi::sys::napi_value {
        ::core::panicking::panic("internal error: entered unreachable code")
    }
}
impl napi::NapiRaw for &mut JsCompiler {
    unsafe fn raw(&self) -> napi::sys::napi_value {
        ::core::panicking::panic("internal error: entered unreachable code")
    }
}
#[allow(clippy::all)]
#[allow(non_snake_case)]
mod __napi_helper__JsCompiler {
    use std::ptr;

    use super::*;
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    #[cfg(all(not(test), not(feature = "noop")))]
    extern "C" fn __napi_register__JsCompiler_struct() {
        napi::__private::register_class("JsCompiler", None, "Compiler\0", ::alloc::vec::Vec::new());
    }
    #[used]
    #[allow(non_upper_case_globals)]
    #[doc(hidden)]
    #[link_section = "__DATA,__mod_init_func"]
    static __napi_register__JsCompiler_struct___rust_ctor___ctor: unsafe extern "C" fn() = {
        unsafe extern "C" fn __napi_register__JsCompiler_struct___rust_ctor___ctor() {
            __napi_register__JsCompiler_struct()
        };
        __napi_register__JsCompiler_struct___rust_ctor___ctor
    };
}
impl JsCompiler {
    #[allow(clippy::new_without_default)]
    pub fn new() -> Self {
        {}
        #[allow(clippy::suspicious_else_formatting)]
        {
            let __tracing_attr_span;
            let __tracing_attr_guard;
            if tracing::Level::INFO <= ::tracing::level_filters::STATIC_MAX_LEVEL
                && tracing::Level::INFO <= ::tracing::level_filters::LevelFilter::current()
            {
                __tracing_attr_span = {
                    use tracing::__macro_support::Callsite as _;
                    static CALLSITE: ::tracing::__macro_support::MacroCallsite = {
                        use tracing::__macro_support::MacroCallsite;
                        static META: ::tracing::Metadata<'static> = {
                            ::tracing_core::metadata::Metadata::new(
                                "new",
                                "binding_core_node",
                                tracing::Level::INFO,
                                Some("crates/binding_core_node/src/lib.rs"),
                                Some(49u32),
                                Some("binding_core_node"),
                                ::tracing_core::field::FieldSet::new(
                                    &[],
                                    ::tracing_core::callsite::Identifier(&CALLSITE),
                                ),
                                ::tracing::metadata::Kind::SPAN,
                            )
                        };
                        MacroCallsite::new(&META)
                    };
                    let mut interest = ::tracing::subscriber::Interest::never();
                    if tracing::Level::INFO <= ::tracing::level_filters::STATIC_MAX_LEVEL
                        && tracing::Level::INFO <= ::tracing::level_filters::LevelFilter::current()
                        && {
                            interest = CALLSITE.interest();
                            !interest.is_never()
                        }
                        && CALLSITE.is_enabled(interest)
                    {
                        let meta = CALLSITE.metadata();
                        ::tracing::Span::new(meta, &{ meta.fields().value_set(&[]) })
                    } else {
                        let span = CALLSITE.disabled_span();
                        if match tracing::Level::INFO {
                            ::tracing::Level::ERROR => ::tracing::log::Level::Error,
                            ::tracing::Level::WARN => ::tracing::log::Level::Warn,
                            ::tracing::Level::INFO => ::tracing::log::Level::Info,
                            ::tracing::Level::DEBUG => ::tracing::log::Level::Debug,
                            _ => ::tracing::log::Level::Trace,
                        } <= ::tracing::log::STATIC_MAX_LEVEL
                        {
                            if !::tracing::dispatcher::has_been_set() {
                                {
                                    span.record_all(&{
                                        CALLSITE.metadata().fields().value_set(&[])
                                    });
                                }
                            } else {
                                {}
                            }
                        } else {
                            {}
                        };
                        span
                    }
                };
                __tracing_attr_guard = __tracing_attr_span.enter();
            }
            #[warn(clippy::suspicious_else_formatting)]
            {
                Self {
                    _compiler: COMPILER.clone(),
                }
            }
        }
    }
}
#[allow(non_snake_case)]
#[allow(clippy::all)]
mod __napi_impl_helper__JsCompiler__6 {
    use super::*;
    #[allow(clippy::new_without_default)]
    #[doc(hidden)]
    #[allow(non_snake_case)]
    #[allow(clippy::all)]
    extern "C" fn __napi__new(
        env: napi::bindgen_prelude::sys::napi_env,
        cb: napi::bindgen_prelude::sys::napi_callback_info,
    ) -> napi::bindgen_prelude::sys::napi_value {
        {}
        #[allow(clippy::suspicious_else_formatting)]
        {
            let __tracing_attr_span;
            let __tracing_attr_guard;
            if tracing::Level::INFO <= ::tracing::level_filters::STATIC_MAX_LEVEL
                && tracing::Level::INFO <= ::tracing::level_filters::LevelFilter::current()
            {
                __tracing_attr_span = {
                    use tracing::__macro_support::Callsite as _;
                    static CALLSITE: ::tracing::__macro_support::MacroCallsite = {
                        use tracing::__macro_support::MacroCallsite;
                        static META: ::tracing::Metadata<'static> = {
                            ::tracing_core::metadata::Metadata::new(
                                "__napi__new",
                                "binding_core_node::__napi_impl_helper__JsCompiler__6",
                                tracing::Level::INFO,
                                Some("crates/binding_core_node/src/lib.rs"),
                                Some(49u32),
                                Some("binding_core_node::__napi_impl_helper__JsCompiler__6"),
                                ::tracing_core::field::FieldSet::new(
                                    &[],
                                    ::tracing_core::callsite::Identifier(&CALLSITE),
                                ),
                                ::tracing::metadata::Kind::SPAN,
                            )
                        };
                        MacroCallsite::new(&META)
                    };
                    let mut interest = ::tracing::subscriber::Interest::never();
                    if tracing::Level::INFO <= ::tracing::level_filters::STATIC_MAX_LEVEL
                        && tracing::Level::INFO <= ::tracing::level_filters::LevelFilter::current()
                        && {
                            interest = CALLSITE.interest();
                            !interest.is_never()
                        }
                        && CALLSITE.is_enabled(interest)
                    {
                        let meta = CALLSITE.metadata();
                        ::tracing::Span::new(meta, &{ meta.fields().value_set(&[]) })
                    } else {
                        let span = CALLSITE.disabled_span();
                        if match tracing::Level::INFO {
                            ::tracing::Level::ERROR => ::tracing::log::Level::Error,
                            ::tracing::Level::WARN => ::tracing::log::Level::Warn,
                            ::tracing::Level::INFO => ::tracing::log::Level::Info,
                            ::tracing::Level::DEBUG => ::tracing::log::Level::Debug,
                            _ => ::tracing::log::Level::Trace,
                        } <= ::tracing::log::STATIC_MAX_LEVEL
                        {
                            if !::tracing::dispatcher::has_been_set() {
                                {
                                    span.record_all(&{
                                        CALLSITE.metadata().fields().value_set(&[])
                                    });
                                }
                            } else {
                                {}
                            }
                        } else {
                            {}
                        };
                        span
                    }
                };
                __tracing_attr_guard = __tracing_attr_span.enter();
            }
            #[warn(clippy::suspicious_else_formatting)]
            {
                unsafe {
                    let inner = napi::__private::___CALL_FROM_FACTORY.get_or_default();
                    if inner.load(std::sync::atomic::Ordering::Relaxed) {
                        return std::ptr::null_mut();
                    }
                    napi::bindgen_prelude::CallbackInfo::<0usize>::new(env, cb, None)
                        .and_then(|mut cb| {
                            let _ret = { JsCompiler::new() };
                            cb.construct("constructor", _ret)
                        })
                        .unwrap_or_else(|e| {
                            napi::bindgen_prelude::JsError::from(e).throw_into(env);
                            std::ptr::null_mut::<napi::bindgen_prelude::sys::napi_value__>()
                        })
                }
            }
        }
    }
    #[cfg(all(not(test), not(feature = "noop")))]
    extern "C" fn __napi_register__JsCompiler_impl() {
        napi::__private::register_class(
            "JsCompiler",
            None,
            "Compiler\0",
            <[_]>::into_vec(
                #[rustc_box]
                ::alloc::boxed::Box::new([napi::bindgen_prelude::Property::new("constructor")
                    .unwrap()
                    .with_ctor(__napi__new)]),
            ),
        );
    }
    #[used]
    #[allow(non_upper_case_globals)]
    #[doc(hidden)]
    #[link_section = "__DATA,__mod_init_func"]
    static __napi_register__JsCompiler_impl___rust_ctor___ctor: unsafe extern "C" fn() = {
        unsafe extern "C" fn __napi_register__JsCompiler_impl___rust_ctor___ctor() {
            __napi_register__JsCompiler_impl()
        };
        __napi_register__JsCompiler_impl___rust_ctor___ctor
    };
}
pub type ArcCompiler = Arc<Compiler>;
/// Hack for `Type Generation`
pub struct TransformOutput {
    pub code: String,
    pub map: Option<String>,
}
impl napi::bindgen_prelude::TypeName for TransformOutput {
    fn type_name() -> &'static str {
        "TransformOutput"
    }

    fn value_type() -> napi::ValueType {
        napi::ValueType::Object
    }
}
impl napi::bindgen_prelude::ToNapiValue for TransformOutput {
    unsafe fn to_napi_value(
        env: napi::bindgen_prelude::sys::napi_env,
        val: TransformOutput,
    ) -> napi::bindgen_prelude::Result<napi::bindgen_prelude::sys::napi_value> {
        let env_wrapper = napi::bindgen_prelude::Env::from(env);
        let mut obj = env_wrapper.create_object()?;
        let Self { code, map } = val;
        obj.set("code", code)?;
        if map.is_some() {
            obj.set("map", map)?;
        }
        napi::bindgen_prelude::Object::to_napi_value(env, obj)
    }
}
impl napi::bindgen_prelude::FromNapiValue for TransformOutput {
    unsafe fn from_napi_value(
        env: napi::bindgen_prelude::sys::napi_env,
        napi_val: napi::bindgen_prelude::sys::napi_value,
    ) -> napi::bindgen_prelude::Result<Self> {
        let env_wrapper = napi::bindgen_prelude::Env::from(env);
        let mut obj = napi::bindgen_prelude::Object::from_napi_value(env, napi_val)?;
        let code: String = obj.get("code")?.ok_or_else(|| {
            napi::bindgen_prelude::Error::new(napi::bindgen_prelude::Status::InvalidArg, {
                let res = ::alloc::fmt::format(::core::fmt::Arguments::new_v1(
                    &["Missing field `", "`"],
                    &[::core::fmt::ArgumentV1::new_display(&"code")],
                ));
                res
            })
        })?;
        let map: Option<String> = obj.get("map")?;
        let val = Self { code, map };
        Ok(val)
    }
}

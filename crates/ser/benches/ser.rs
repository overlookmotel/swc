extern crate swc_node_base;

// use std::path::Path;

use abomonation::encode;
use criterion::{black_box, criterion_group, criterion_main, Criterion};
use rkyv::{
    ser::{
        serializers::{
            AlignedSerializer, AllocScratch, AllocSerializer, FallbackScratch, HeapScratch,
            SharedSerializeMap,
        },
        Serializer,
    },
    AlignedVec,
};
use ser_raw::serialize_unaligned;
use swc_common::{sync::Lrc, FileName, SourceMap};
use swc_ecma_ast::Program;
use swc_ecma_parser::{lexer::Lexer, Parser, StringInput, Syntax};

fn bench_serializers(c: &mut Criterion) {
    let program = get_ast();

    c.bench_function("serde", |b| {
        b.iter(|| {
            let _ = black_box(serialize_serde(&program));
        });
    });

    c.bench_function("RKYV", |b| {
        b.iter(|| {
            let _ = black_box(serialize_rkyv(&program));
        });
    });

    c.bench_function("abomonation", |b| {
        b.iter(|| {
            let _ = black_box(serialize_abomonation(&program));
        });
    });

    c.bench_function("ser_raw", |b| {
        b.iter(|| {
            let _ = black_box(serialize_raw(&program));
        });
    });
}

fn get_ast() -> Program {
    let cm: Lrc<SourceMap> = Default::default();

    let code = include_str!("../../../node_modules/react/cjs/react.production.min.js");
    // let code = "function foo() {}";
    let fm = cm.new_source_file(FileName::Custom("test.js".into()), code.into());

    /*
    let fm = cm
        .load_file(Path::new("node_modules/react/cjs/react.production.min.js"))
        .expect("failed to load file");
    */

    let lexer = Lexer::new(
        Syntax::Es(Default::default()),
        Default::default(),
        StringInput::from(&*fm),
        None,
    );
    let mut parser = Parser::new_from(lexer);
    parser.parse_program().expect("failed to parse")
}

pub fn serialize_serde(program: &Program) -> String {
    serde_json::to_string(&program).unwrap()
}

pub fn serialize_rkyv(program: &Program) -> AlignedVec {
    let aligned_vec = AlignedVec::new();
    let aligned_serializer = AlignedSerializer::new(aligned_vec);
    let scratch = FallbackScratch::<HeapScratch<512>, AllocScratch>::default();
    let shared = SharedSerializeMap::default();
    let mut serializer = AllocSerializer::<512>::new(aligned_serializer, scratch, shared);
    serializer.serialize_value(program).unwrap();
    serializer.into_serializer().into_inner()
}

pub fn serialize_abomonation(program: &Program) -> Vec<u8> {
    let mut bytes = Vec::new();
    unsafe {
        encode(program, &mut bytes).unwrap();
    }
    bytes
}

pub fn serialize_raw(program: &Program) -> Vec<u8> {
    serialize_unaligned(program)
}

criterion_group!(benches, bench_serializers);
criterion_main!(benches);

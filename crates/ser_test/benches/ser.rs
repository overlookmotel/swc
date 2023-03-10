extern crate swc_node_base;

use criterion::{black_box, criterion_group, criterion_main, Criterion};
use swc_common::{sync::Lrc, FileName, SourceMap};
use swc_ecma_ast::Program;
use swc_ecma_parser::{lexer::Lexer, Parser, StringInput, Syntax};

const OUTPUT_ALIGNMENT: usize = std::mem::align_of::<u64>();
const MAX_VALUE_ALIGNMENT: usize = std::mem::align_of::<u64>();
const CAPACITY: usize = 345600;
// const NUM_STRINGS: usize = 152;
// const NUM_UNIQUE_STRINGS: usize = 102;
// const STRING_DATA_LEN: usize = 2116;

fn bench_serializers(c: &mut Criterion) {
    let program = get_ast();

    /*
    c.bench_function("serde", |b| {
        b.iter(|| {
            let _ = black_box(serde_json::to_string(&program).unwrap());
        });
    });

    c.bench_function("RKYV", |b| {
        b.iter(|| {
            use rkyv::{
                ser::{
                    serializers::{
                        AlignedSerializer as RkyvAlignedSerializer, AllocScratch, AllocSerializer,
                        FallbackScratch, HeapScratch, SharedSerializeMap,
                    },
                    Serializer as RkyvSerializer,
                },
                AlignedVec,
            };

            let _ = black_box({
                let aligned_vec = AlignedVec::with_capacity(228508);
                let aligned_serializer = AlignedSerializer::new(aligned_vec);
                let scratch = FallbackScratch::<HeapScratch<512>, AllocScratch>::default();
                let shared = SharedSerializeMap::default();
                let mut serializer =
                    AllocSerializer::<512>::new(aligned_serializer, scratch, shared);
                serializer.serialize_value(&program).unwrap();
                serializer.into_serializer().into_inner()
            });
        });
    });

    c.bench_function("abomonation", |b| {
        b.iter(|| {
            let _ = black_box({
                let mut bytes = Vec::with_capacity(344980);
                unsafe {
                    abomonation::encode(&program, &mut bytes).unwrap();
                }
                bytes
            });
        });
    });
    */

    c.bench_function("ser_raw unaligned no strings", |b| {
        use ser_raw::storage::{Storage, UnalignedVec};
        // Only requires 341648
        let mut storage = UnalignedVec::with_capacity(CAPACITY);
        b.iter(|| {
            swc_ecma_ast::ser::UnalignedSerializerNoStrings::serialize(
                black_box(&program),
                &mut storage,
            );
            black_box(&mut storage);
            storage.clear();
        });
    });

    c.bench_function("ser_raw base no strings", |b| {
        use ser_raw::storage::{AlignedVec, Storage};
        // Only requires 341648
        let mut storage =
            AlignedVec::<OUTPUT_ALIGNMENT, MAX_VALUE_ALIGNMENT>::with_capacity(CAPACITY);
        b.iter(|| {
            swc_ecma_ast::ser::AlignedSerializerNoStrings::serialize(
                black_box(&program),
                &mut storage,
            );
            black_box(&mut storage);
            storage.clear();
        });
    });

    /*
    c.bench_function("ser_raw base fast strings", |b| {
        use ser_raw::storage::{AlignedVec, Storage};
        // Does require 345596
        let mut storage =
            AlignedVec::<OUTPUT_ALIGNMENT, MAX_VALUE_ALIGNMENT>::with_capacity(CAPACITY);
        b.iter(|| {
            swc_ecma_ast::ser::AlignedSerializerFastStrings::serialize(
                black_box(&program),
                &mut storage,
                NUM_STRINGS,
                STRING_DATA_LEN,
            );
            black_box(&mut storage);
            storage.clear();
        });
    });

    c.bench_function("ser_raw base fast strings deduped", |b| {
        use ser_raw::storage::{AlignedVec, Storage};
        // Does require 345596
        let mut storage =
            AlignedVec::<OUTPUT_ALIGNMENT, MAX_VALUE_ALIGNMENT>::with_capacity(CAPACITY);
        b.iter(|| {
            swc_ecma_ast::ser::AlignedSerializerFastStringsDeduped::serialize(
                black_box(&program),
                &mut storage,
                NUM_UNIQUE_STRINGS,
                STRING_DATA_LEN,
            );
            black_box(&mut storage);
            storage.clear();
        });
    });

    c.bench_function("ser_raw unaligned with strings", |b| {
        use ser_raw::storage::{Storage, UnalignedVec};
        // Only requires 344980
        let mut storage = UnalignedVec::with_capacity(CAPACITY);
        b.iter(|| {
            swc_ecma_ast::ser::UnalignedSerializer::serialize(black_box(&program), &mut storage);
            black_box(&mut storage);
            storage.clear();
        });
    });

    c.bench_function("ser_raw base with strings", |b| {
        use ser_raw::storage::{AlignedVec, Storage};
        // Only requires 345432
        let mut storage =
            AlignedVec::<OUTPUT_ALIGNMENT, MAX_VALUE_ALIGNMENT>::with_capacity(CAPACITY);
        b.iter(|| {
            swc_ecma_ast::ser::AlignedSerializer::serialize(black_box(&program), &mut storage);
            black_box(&mut storage);
            storage.clear();
        });
    });
    */
}

fn get_ast() -> Program {
    let cm: Lrc<SourceMap> = Default::default();

    let code = include_str!("../../../node_modules/react/cjs/react.production.min.js");
    let fm = cm.new_source_file(FileName::Custom("test.js".into()), code.into());

    let lexer = Lexer::new(
        Syntax::Es(Default::default()),
        Default::default(),
        StringInput::from(&*fm),
        None,
    );
    let mut parser = Parser::new_from(lexer);
    parser.parse_program().expect("failed to parse")
}

criterion_group!(benches, bench_serializers);
criterion_main!(benches);

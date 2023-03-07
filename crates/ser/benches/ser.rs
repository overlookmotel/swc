extern crate swc_node_base;

use criterion::{black_box, criterion_group, criterion_main, Criterion};
use swc_common::{sync::Lrc, FileName, SourceMap};
use swc_ecma_ast::Program;
use swc_ecma_parser::{lexer::Lexer, Parser, StringInput, Syntax};

const OUTPUT_ALIGNMENT: usize = std::mem::align_of::<u64>();
const VALUE_ALIGNMENT: usize = std::mem::align_of::<usize>();
const MAX_VALUE_ALIGNMENT: usize = std::mem::align_of::<u64>();
const CAPACITY: usize = 345432;

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

    c.bench_function("ser_raw unaligned", |b| {
        use ser_raw::{Serializer, UnalignedSerializer};
        // Only requires 344980, but giving it same as `BaseSerializer` for fairer
        // comparison
        let mut buf = Vec::with_capacity(CAPACITY);
        b.iter(|| {
            let mut serializer = UnalignedSerializer::from_vec(&mut buf);
            serializer.serialize_value(black_box(&program));
            black_box(&mut buf);
            buf.clear();
        });
    });

    c.bench_function("ser_raw base", |b| {
        use ser_raw::{AlignedByteVec, BaseSerializer, Serializer};
        let mut buf = AlignedByteVec::with_capacity(CAPACITY);
        b.iter(|| {
            let mut serializer = BaseSerializer::<
                _,
                OUTPUT_ALIGNMENT,
                VALUE_ALIGNMENT,
                MAX_VALUE_ALIGNMENT,
            >::from_vec(&mut buf);
            serializer.serialize_value(black_box(&program));
            black_box(&mut buf);
            buf.clear();
        });
    });
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

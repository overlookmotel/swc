use abomonation::encode;
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

pub fn main() {
    let program = get_ast();

    let json = serialize_serde(&program);
    println!("serde bytes: {}", json.len());

    let rkyv_vec = serialize_rkyv(&program);
    println!("RKYV bytes: {}", rkyv_vec.len());

    let abom_vec = serialize_abomonation(&program);
    println!("abomonation bytes: {}", abom_vec.len());

    let ser_raw_vec = serialize_raw(&program);
    println!("ser_raw bytes: {}", ser_raw_vec.len());
}

fn get_ast() -> Program {
    let code = include_str!("../../../node_modules/react/cjs/react.production.min.js");
    // let code = "function foo() {}";

    let cm: Lrc<SourceMap> = Default::default();
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

pub fn serialize_serde(program: &Program) -> String {
    serde_json::to_string(program).unwrap()
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

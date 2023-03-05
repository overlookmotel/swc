extern crate swc_node_base;

use ser_raw::{AlignedByteVec, BaseSerializer, Serializer, UnalignedSerializer};
use swc_common::{sync::Lrc, FileName, SourceMap};
use swc_ecma_ast::Program;
use swc_ecma_parser::{lexer::Lexer, Parser, StringInput, Syntax};

const OUTPUT_ALIGNMENT: usize = std::mem::align_of::<u64>();
const VALUE_ALIGNMENT: usize = std::mem::align_of::<usize>();
const CAPACITY: usize = 345432;

pub fn main() {
    let program = get_ast();
    dbg!(serialize_raw_unaligned(&program).len());
    dbg!(serialize_raw_base(&program).len());
}

fn serialize_raw_unaligned(program: &Program) -> Vec<u8> {
    // Only requires 344980, but giving it same as `BaseSerializer` for fairer
    // comparison
    let mut serializer = UnalignedSerializer::with_capacity(CAPACITY);
    serializer.serialize_value(program);
    serializer.into_vec()
}

fn serialize_raw_base(program: &Program) -> AlignedByteVec<8> {
    let mut serializer =
        BaseSerializer::<_, OUTPUT_ALIGNMENT, VALUE_ALIGNMENT>::with_capacity(CAPACITY);
    serializer.serialize_value(program);
    serializer.into_vec()
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

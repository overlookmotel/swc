extern crate swc_node_base;

use ser_raw::storage::{AlignedVec, Storage, UnalignedVec};
use swc_common::{sync::Lrc, FileName, SourceMap};
use swc_ecma_ast::{ser, Program};
use swc_ecma_parser::{lexer::Lexer, Parser, StringInput, Syntax};

const OUTPUT_ALIGNMENT: usize = std::mem::align_of::<u64>();
const MAX_VALUE_ALIGNMENT: usize = std::mem::align_of::<u64>();
const CAPACITY: usize = 345600;
// const NUM_STRINGS: usize = 152;
// const NUM_UNIQUE_STRINGS: usize = 102;
// const STRING_DATA_LEN: usize = 2116;

pub fn main() {
    let program = get_ast();

    // Only requires 341648
    let mut store = UnalignedVec::with_capacity(CAPACITY);
    ser::UnalignedSerializerNoStrings::serialize(&program, &mut store);
    println!("UnalignedSerializerNoStrings {}", store.len());

    // Only requires 341648
    let mut store = AlignedVec::<OUTPUT_ALIGNMENT, MAX_VALUE_ALIGNMENT>::with_capacity(CAPACITY);
    ser::AlignedSerializerNoStrings::serialize(&program, &mut store);
    println!("AlignedSerializerNoStrings {}", store.len());

    /*
    // Does require 345596
    let mut store = AlignedVec::<OUTPUT_ALIGNMENT, MAX_VALUE_ALIGNMENT>::with_capacity(CAPACITY);
    ser::AlignedSerializerFastStrings::serialize(
        &program,
        &mut store,
        NUM_STRINGS,
        STRING_DATA_LEN,
    );
    println!("AlignedSerializerFastStrings {}", store.len());

    // Only requires 344909
    let mut store = AlignedVec::<OUTPUT_ALIGNMENT, MAX_VALUE_ALIGNMENT>::with_capacity(CAPACITY);
    ser::AlignedSerializerFastStringsDeduped::serialize(
        &program,
        &mut store,
        NUM_UNIQUE_STRINGS,
        STRING_DATA_LEN,
    );
    println!("AlignedSerializerFastStringsDeduped {}", store.len());

    // Only requires 344980
    let mut store = UnalignedVec::with_capacity(CAPACITY);
    ser::UnalignedSerializer::serialize(&program, &mut store);
    println!("UnalignedSerializer {}", store.len());

    // Only requires 345432
    let mut store = AlignedVec::<OUTPUT_ALIGNMENT, MAX_VALUE_ALIGNMENT>::with_capacity(CAPACITY);
    ser::AlignedSerializer::serialize(&program, &mut store);
    println!("AlignedSerializer {}", store.len());
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

extern crate swc_node_base;

use ser_raw::storage::{AlignedVec, Storage, UnalignedVec};
use swc_common::{sync::Lrc, FileName, SourceMap};
use swc_ecma_ast::{ser, Program};
use swc_ecma_parser::{lexer::Lexer, Parser, StringInput, Syntax};

const OUTPUT_ALIGNMENT: usize = std::mem::align_of::<u64>();
const VALUE_ALIGNMENT: usize = std::mem::align_of::<usize>();
const MAX_VALUE_ALIGNMENT: usize = std::mem::align_of::<u64>();
const MAX_CAPACITY: usize = ser_raw::storage::aligned_max_u32_capacity(OUTPUT_ALIGNMENT);
const CAPACITY: usize = 345600;
// const NUM_STRINGS: usize = 152;
// const NUM_UNIQUE_STRINGS: usize = 102;
// const STRING_DATA_LEN: usize = 2116;

pub fn main() {
    let program = get_ast();

    // Only requires 341648
    let mut storage = UnalignedVec::with_capacity(CAPACITY);
    ser::UnalignedSerializerNoStrings::serialize(&program, &mut storage);
    println!("UnalignedSerializerNoStrings {}", storage.len());

    // Only requires 341648
    let mut storage = AlignedVec::<
        OUTPUT_ALIGNMENT,
        VALUE_ALIGNMENT,
        MAX_VALUE_ALIGNMENT,
        MAX_CAPACITY,
    >::with_capacity(CAPACITY);
    ser::AlignedSerializerNoStrings::serialize(&program, &mut storage);
    println!("AlignedSerializerNoStrings {}", storage.len());

    /*
    // Only requires 341648
    let mut storage = AlignedVec::<
        OUTPUT_ALIGNMENT,
        VALUE_ALIGNMENT,
        MAX_VALUE_ALIGNMENT,
        MAX_CAPACITY,
    >::with_capacity(CAPACITY);
    ser::PosSerializerNoStrings::serialize(&program, &mut storage);
    println!("PosSerializerNoStrings {}", storage.len());

    // Only requires 341648
    let mut storage = AlignedVec::<
        OUTPUT_ALIGNMENT,
        VALUE_ALIGNMENT,
        MAX_VALUE_ALIGNMENT,
        MAX_CAPACITY,
    >::with_capacity(CAPACITY);
    ser::RelPtrSerializerNoStrings::serialize(&program, &mut storage);
    println!("RelPtrSerializerNoStrings {}", storage.len());

    // Does require 345600
    let mut storage = AlignedVec::<
        OUTPUT_ALIGNMENT,
        VALUE_ALIGNMENT,
        MAX_VALUE_ALIGNMENT,
        MAX_CAPACITY,
    >::with_capacity(CAPACITY);
    ser::AlignedSerializerFastStrings::serialize(
        &program,
        &mut storage,
        NUM_STRINGS,
        STRING_DATA_LEN,
    );
    println!("AlignedSerializerFastStrings {}", storage.len());

    // Only requires 344992
    let mut storage = AlignedVec::<
        OUTPUT_ALIGNMENT,
        VALUE_ALIGNMENT,
        MAX_VALUE_ALIGNMENT,
        MAX_CAPACITY,
    >::with_capacity(CAPACITY);
    ser::AlignedSerializerFastStringsShorter::serialize(&program, &mut storage, STRING_DATA_LEN);
    println!("AlignedSerializerFastStringsShorter {}", storage.len());

    // Only requires 344912
    let mut storage = AlignedVec::<
        OUTPUT_ALIGNMENT,
        VALUE_ALIGNMENT,
        MAX_VALUE_ALIGNMENT,
        MAX_CAPACITY,
    >::with_capacity(CAPACITY);
    ser::AlignedSerializerFastStringsDeduped::serialize(
        &program,
        &mut storage,
        NUM_UNIQUE_STRINGS,
        STRING_DATA_LEN,
    );
    println!("AlignedSerializerFastStringsDeduped {}", storage.len());

    // Only requires 344980
    let mut storage = UnalignedVec::with_capacity(CAPACITY);
    ser::UnalignedSerializer::serialize(&program, &mut storage);
    println!("UnalignedSerializer {}", storage.len());

    // Only requires 345432
    let mut storage = AlignedVec::<
        OUTPUT_ALIGNMENT,
        VALUE_ALIGNMENT,
        MAX_VALUE_ALIGNMENT,
        MAX_CAPACITY,
    >::with_capacity(CAPACITY);
    ser::AlignedSerializer::serialize(&program, &mut storage);
    println!("AlignedSerializer {}", storage.len());
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

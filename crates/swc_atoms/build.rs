use std::{env, fs, path::Path};

fn main() {
    let strs = include_str!("words.txt")
        .lines()
        .map(|l| l.trim())
        .collect::<Vec<_>>();
    gen("js_word", "JsWord", &strs);
}

fn gen(mac_name: &str, type_name: &str, atoms: &[&str]) {
    let mut bytes = Vec::new();

    string_cache_codegen::AtomType::new(type_name, &format!("{}!", mac_name))
        .atoms(atoms)
        .write_to(&mut bytes)
        .unwrap();

    // Remove first line
    // `pub type JsWord = ::string_cache::Atom<JsWordStaticSet>;`
    let s = String::from_utf8(bytes)
        .unwrap()
        .lines()
        .skip(1)
        .collect::<Vec<&str>>()
        .join("\n");

    fs::write(
        &Path::new(&env::var("OUT_DIR").unwrap()).join(format!("{}.rs", mac_name)),
        s,
    )
    .unwrap();
}

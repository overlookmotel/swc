use anyhow::Error;
use rkyv::{
    archived_root, de::deserializers::SharedDeserializeMap,
    ser::serializers::CompositeSerializerError, to_bytes, AlignedVec, Deserialize,
};
use swc_ecma_ast::Program;

// Minimum alignment required on buffer containing serialized AST.
// If AST node types are changed in future to include e.g. a `u128` which
// requires alignment of 16, increase value of `AST_ALIGNMENT` here
// and in `deserialize/generate.js`.
const AST_ALIGNMENT: usize = 8;

#[inline]
pub fn serialize(t: &Program) -> Result<AlignedVec, Error> {
    to_bytes::<_, 512>(t).map_err(|err| match err {
        CompositeSerializerError::SerializerError(e) => e.into(),
        CompositeSerializerError::ScratchSpaceError(_e) => Error::msg("AllocScratchError"),
        CompositeSerializerError::SharedError(_e) => Error::msg("SharedSerializeMapError"),
    })
}

/// SAFETY: `bytes` must contain valid serialized `Program`.
pub unsafe fn deserialize(bytes: &[u8]) -> Result<Program, Error> {
    // If `bytes` does not meet minimum alignment requirement, copy into aligned vec
    // before deserializing, to achieve alignment.
    // In practice, `Buffer`s passed via NAPI seem always to be aligned on at least
    // 16 anyway, but this is just in case they aren't in some circumstances.
    if (bytes.as_ptr() as usize) & (AST_ALIGNMENT - 1) != 0 {
        let mut aligned_vec = AlignedVec::new();
        aligned_vec.extend_from_slice(bytes);
        let bytes = &aligned_vec[..];

        deserialize_from_aligned_slice(bytes)
    } else {
        deserialize_from_aligned_slice(bytes)
    }
}

/// SAFETY: `bytes` must contain valid serialized `Program`.
/// `bytes` must be aligned to `AST_ALIGNMENT`.
unsafe fn deserialize_from_aligned_slice(bytes: &[u8]) -> Result<Program, Error> {
    let archived = archived_root::<Program>(bytes);
    archived
        .deserialize(&mut SharedDeserializeMap::new())
        .map_err(|_err| Error::msg("Failed to deserialize AST buffer"))
}

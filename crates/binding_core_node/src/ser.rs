use anyhow::Error;
use rkyv::{
    archived_root, de::deserializers::SharedDeserializeMap,
    ser::serializers::CompositeSerializerError, to_bytes, AlignedVec, Deserialize,
};
use swc_ecma_ast::Program;

#[inline]
pub fn serialize(t: &Program) -> Result<AlignedVec, Error> {
    to_bytes::<_, 512>(t).map_err(|err| match err {
        CompositeSerializerError::SerializerError(e) => e.into(),
        CompositeSerializerError::ScratchSpaceError(_e) => Error::msg("AllocScratchError"),
        CompositeSerializerError::SharedError(_e) => Error::msg("SharedSerializeMapError"),
    })
}

pub unsafe fn deserialize(bytes: &[u8]) -> Result<Program, Error> {
    // Copy into aligned slice of bytes
    // TODO If bytes already aligned on 16 (or maybe 8), can skip this step
    let mut aligned_vec = AlignedVec::new();
    aligned_vec.extend_from_slice(bytes);
    let bytes = &aligned_vec[..];

    // Unsafe if `bytes` does not contain valid serialized `Program`.
    // The other invariant - that `bytes` must be aligned - is guaranteed by
    // preceding code.
    let archived = archived_root::<Program>(bytes);

    archived
        .deserialize(&mut SharedDeserializeMap::new())
        .map_err(|_err| Error::msg("Failed to deserialize AST buffer"))
}

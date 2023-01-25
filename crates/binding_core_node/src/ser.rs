use anyhow::Error;
use rkyv::{
    archived_root,
    de::deserializers::SharedDeserializeMap,
    ser::{
        serializers::{
            AlignedSerializer, AllocScratch, AllocSerializer, CompositeSerializerError,
            FallbackScratch, HeapScratch, SharedSerializeMap,
        },
        Serializer,
    },
    AlignedVec, Deserialize,
};
use swc_ecma_ast::Program;

// Minimum alignment required on buffer containing serialized AST.
// If AST node types are changed in future to include e.g. a `u128` which
// requires alignment of 16, increase value of `AST_ALIGNMENT` here
// and in `deserialize/generate.js`.
const AST_ALIGNMENT: usize = 8;

// Typical ratio of length of JS code string to size of buffer required for AST.
// Minified code can have ratio of more like 30, but non-minified code more like
// 10. A value of 16 will likely result in buffer not having to be resized
// during serialization, or at most only once.
const BUFFER_SIZE_RATIO: usize = 16;

/// Serialize AST to `AlignedVec`.
/// Serializer is initialized with an `AlignedVec` which will hopefully be large
/// enough to serialize whole AST into without reallocating.
#[inline]
pub fn serialize(program: &Program, src_len: usize) -> Result<AlignedVec, Error> {
    let mut capacity = src_len.saturating_mul(BUFFER_SIZE_RATIO);
    if capacity <= usize::MAX >> 1 {
        capacity = capacity.checked_next_power_of_two().unwrap();
    }

    let aligned_vec = AlignedVec::with_capacity(capacity);
    let aligned_serializer = AlignedSerializer::new(aligned_vec);
    let scratch = FallbackScratch::<HeapScratch<512>, AllocScratch>::default();
    let shared = SharedSerializeMap::default();
    let mut serializer = AllocSerializer::<512>::new(aligned_serializer, scratch, shared);

    serializer
        .serialize_value(program)
        .map_err(|err| match err {
            CompositeSerializerError::SerializerError(e) => e.into(),
            CompositeSerializerError::ScratchSpaceError(_e) => Error::msg("AllocScratchError"),
            CompositeSerializerError::SharedError(_e) => Error::msg("SharedSerializeMapError"),
        })?;
    let aligned_vec = serializer.into_serializer().into_inner();
    Ok(aligned_vec)
}

/// Deserialize AST from bytes slice.
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

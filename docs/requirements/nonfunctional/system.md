# 📐 Non-Functional Requirements – System

| ID        | Requirement Name                | Description |
|-----------|----------------------------------|-------------|
| SYS-N01   | Modular Component Interfaces     | The user interface, backend services, WebAssembly engine, and blockchain integration must be cleanly decoupled and independently replaceable. |
| SYS-N02   | WASM-Local Pixel Parsing         | All pixel-encoded data must be parsed entirely within the WASM memory space, with no dependency on external data sources at runtime. |
| SYS-N03   | Manifest Schema Compliance       | Manifest files must conform to a published JSON schema and support forward-compatible extensions to accommodate new properties. |
| SYS-N04   | Manifest Fallback Support        | If a manifest file is missing, corrupted, or unreachable, the game must still load and function using only pixel data. |
| SYS-N05   | Indexed Descriptor Resolution    | The game engine must resolve a pixel-encoded triplet to its corresponding descriptor name and subproperty in under 1 millisecond. |
| SYS-N06   | Manifest-to-Pixel Integrity      | The pixel triplet format and the manifest index/subindex structure must remain synchronized across versions to ensure consistent decoding. |
| SYS-N07   | Subindex Mapping Consistency     | Each index in the manifest must have a clearly defined and immutable mapping of subindexes to named sub-properties. |
| SYS-N08   | Memory-Efficient Lookup Tables   | All index and subindex lookups must be precompiled into WASM memory as lookup tables for efficient runtime resolution. |
| SYS-N09 | Reserved Index Enforcement | Index values used in triplets must not overlap between definition types. The system must enforce exclusive ranges at compile and runtime. |
| SYS-N10 | Range Registry Compliance | The runtime parser must validate that all [index] values fall within the defined global registry and raise an error if misaligned. |
| SYS-N11 | Definition Range Exclusivity | Each category (appearance, characteristic, etc.) must occupy a unique and non-overlapping index range within the global 0–255 space. |
| SYS-N12 | Range Validation Enforcement | At runtime, the engine must validate that each definition's index falls within its category’s reserved range and reject any out-of-bounds values. |
| SYS-N13 | Subindex Range Constraint | All subindex values must remain within the 0–255 range and be validated during manifest parsing. |
| SYS-N14 | Subindex Uniqueness Guarantee | Each subindex must be uniquely defined within its parent index to avoid conflicting property names during resolution. |
| SYS-N15 | Tiered Subindex Lookup Strategy | The game engine must distinguish between global subindex definitions (0–19) and category-specific extensions (20–255) using separate lookup tables. |
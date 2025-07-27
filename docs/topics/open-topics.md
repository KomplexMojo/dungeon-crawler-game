# ❓ Open Topics

| ID | Topic | Description |
|----|-------|-------------|
| OT-01 | Player Movement in Memory Map | Approach for shared memory movement unclear. |
| OT-02 | Metadata Schema Design | Metadata schema is pending. |
| OT-03 | NFT Token Cost Standardization | Need consistent way to assign token values. |
| OT-04 | Dynamic vs Static Token Pricing | Clarify token cost model. |
| OT-05 | Manifest Schema for Game Entities | Manifest JSON format is not yet defined. |
| OT-06 | Manifest Field Definition | The structure and required fields for the manifest JSON are not finalized. |
| OT-07 | Pixel Encoding Schema | A standard must be established for how index, subindex, and value are packed into pixel data. |
| OT-08 | Synchronization Policy | How and when manifest and pixel data are validated against each other is not yet defined. |
| OT-09 | Manifest-to-Pixel Index Registry | A canonical mapping between pixel-encoded indices and manifest JSON keys/substructures must be defined and maintained. |
| OT-10 | Subindex Naming Convention | The standardization of subindex meanings per category (e.g., 0 = max, 1 = current, 4 = regen/sec) must be finalized and published. |
| OT-11 | Multi-Value Aggregation Rules | Some triplet sets (e.g., current/max) must be grouped in the UI for semantic display (e.g., Stamina = 40/100). Rules for how and when to aggregate are not yet finalized. |
| OT-12 | Dynamic Range Expansion | The strategy for expanding or remapping index ranges beyond 255 (if needed) is not yet defined. |
| OT-13 | Subindex Semantics Registry | A consistent naming convention and shared vocabulary for common subindexes (e.g., 0 = Max, 1 = Current, 2 = Buff, 3 = Debuff) is not yet finalized. |
| OT-14 | Reserved Subindex Registry | The full specification for reserved subindexes 0–19 is not yet complete. |
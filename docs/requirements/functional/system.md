# 📌 Functional Requirements – System

| ID        | Requirement Name                     | Description |
|-----------|--------------------------------------|-------------|
| SYS-F01   | Shared Memory Architecture           | The game must use a linear memory map shared between the WASM module and the JavaScript host to represent and access game state. |
| SYS-F02   | IPFS-Backed NFT Integration          | Each game element NFT must reference a manifest file stored on IPFS that contains metadata and links to the corresponding visual asset. |
| SYS-F03   | On-Chain CID Storage                 | All manifest and image CIDs must be stored on-chain using ERC721 (for levels and entities) or ERC20 (for tokenized attributes). |
| SYS-F04   | Data Auditability                    | The full lifecycle of an NFT (design, pinning, CID linkage, manifest content) must be auditable via IPFS + blockchain records. |
| SYS-F05   | Dual Data Source Strategy            | The game must support both pixel-embedded instance values (for performance) and manifest-based metadata (for human-readable reference). |
| SYS-F06   | Pixel Triplet Data Encoding          | Runtime game data must be encoded into 32x32 image pixels using the format [index, subindex, value], where each component fits in an 8-bit channel. |
| SYS-F07   | Category-Based Index Partitioning    | The first value in the triplet (index) must identify the data category (e.g., characteristic, behavior), inferred from a reserved index range. |
| SYS-F08   | Subindex-Based Property Mapping      | The second value (subindex) in a triplet must map to a specific property within that category (e.g., current, max, regen/sec). |
| SYS-F09   | Value Extraction from Pixels         | The game engine must read and decode embedded pixel triplets at load time to initialize all runtime entity attributes. |
| SYS-F10   | Manifest-Driven Descriptor Mapping   | The manifest must provide a mapping of [index][subindex] pairs to human-readable names and descriptions for UI and debug output. |
| SYS-F11   | Runtime Triplet Resolution           | The engine must resolve each triplet [index, subindex, value] into a full descriptor (e.g., "Stamina Regen = +1") using the manifest. |
| SYS-F12   | Descriptor Aggregation Logic         | When multiple subindexes share the same index (e.g., current and max for health), the interface must combine them into contextual UI displays (e.g., "Health: 45/100"). |
| SYS-F13   | Index Range Partitioning             | Each data definition type must use a reserved index range within the 0–255 space to support unambiguous interpretation of pixel triplets. |
| SYS-F14   | Definition Type Mapping              | The system must interpret the first value of a pixel triplet (index) by mapping it to one of the defined ranges: appearance, characteristic, behaviour, event, trigger, effect, or condition. |
| SYS-F15   | Appearance Index Range               | All appearance definitions must use the index range 0–39. These are used for visual sprite representation and layout data. |
| SYS-F16   | Characteristic Index Range           | All characteristic definitions must use the index range 40–89. These represent quantifiable character stats like health, stamina, etc. |
| SYS-F17   | Behaviour Index Range                | All behaviour definitions must use the index range 90–139. These describe AI-like attributes such as aggression or restlessness. |
| SYS-F18   | Event Index Range                    | All event definitions must use the index range 140–159. Events signal that something has occurred in the game (e.g., player enters a room). |
| SYS-F19   | Trigger Index Range                  | All trigger definitions must use the index range 160–191. Triggers define the conditions that fire associated events. |
| SYS-F20   | Effect Index Range                   | All effect definitions must use the index range 192–223. Effects describe the outcomes of triggered events (e.g., lose health). |
| SYS-F21   | Condition Index Range                | All condition definitions must use the index range 224–255. Conditions represent temporary or contextual states like 'burning' or 'frozen'. |
| SYS-F22   | Subindex Addressing Model            | Each definition category must support up to 256 distinct subindex values (0–255) representing aspects or modifiers of the base property. |
| SYS-F23   | Structured Subcategory Definitions   | Each manifest definition must declare its list of subindex values, with unique names and descriptions to support structured decoding and UI output. |
| SYS-F24   | Subindex Tiering Convention          | Subindexes 0–19 must follow a standardized naming scheme across all definition types; subindexes 20–255 may be uniquely defined per category. |
| SYS-F25   | Static and Extension Definition Partitioning | Each index range for a data category (e.g., characteristic, behaviour, event) must be partitioned into two sections: (1) a set of static definitions that are core to game functionality and encoded into the game logic, and (2) a remaining set of extension definitions that can be defined dynamically to support future gameplay scenarios or modding. This partitioning ensures a stable base set of properties while enabling extensibility. |
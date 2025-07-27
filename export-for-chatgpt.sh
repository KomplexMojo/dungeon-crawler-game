#!/bin/bash

PROJECT_PATH="${1:-.}"
OUTPUT_ZIP="${2:-dungeon-crawler-export.zip}"
TEMP_DIR="$(mktemp -d)"
OUTPUT_ABS="$(realpath "$OUTPUT_ZIP")"

echo "🔍 Copying project from: $PROJECT_PATH"
echo "⚙️  Excluding unnecessary files..."

rsync -av --progress "$PROJECT_PATH"/ "$TEMP_DIR"/ \
  --exclude 'node_modules' \
  --exclude 'dist' \
  --exclude 'build' \
  --exclude '*.zip' \
  --exclude '*.wasm' \
  --exclude '*.mjs' \
  --exclude '*.exe' \
  --exclude '*.bin' \
  --exclude '*.env' \
  --exclude '.env.*' \
  --exclude 'package-lock.json' \
  --exclude 'pnpm-lock.yaml' \
  --exclude 'yarn.lock' \
  --exclude '.git' \
  --exclude '.DS_Store' \
  --exclude '*.log'

# ... previous code ...

# Get the full absolute path of the output zip
# ... previous code ...

# Get the full absolute path of the output zip
OUTPUT_ABS="$(cd "$(dirname "$OUTPUT_ZIP")"; pwd)/$(basename "$OUTPUT_ZIP")"

echo "📦 Creating zip: $OUTPUT_ABS"
(cd "$TEMP_DIR" && zip -r "$OUTPUT_ABS" . > /dev/null)

echo "✅ Project exported to $OUTPUT_ABS"
echo "🧹 Cleaning up temp files..."
rm -rf "$TEMP_DIR"

echo "Done!"
// Pass in WebAssembly instance.exports.memory (as in your .d.ts)
export function getUint8Memory(memory) {
  return new Uint8Array(memory.buffer);
}

// Example: extract RGBA image from WASM memory
export function extractImage(memory, ptr, width, height) {
  // assuming contiguous RGBA, width*height*4 bytes starting at ptr
  const u8 = getUint8Memory(memory);
  const size = width * height * 4;
  return u8.slice(ptr, ptr + size);
}
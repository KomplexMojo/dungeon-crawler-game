// Generate an RGBA image buffer: simple XOR pattern
export function generateImage(ptr: usize, width: i32, height: i32): void {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let i = (y * width + x) * 4;
      let color = ((x ^ y) & 0xFF);
      store<u8>(ptr + i + 0, color);       // R
      store<u8>(ptr + i + 1, 255 - color); // G
      store<u8>(ptr + i + 2, 128);         // B
      store<u8>(ptr + i + 3, 255);         // A
    }
  }
}
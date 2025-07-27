import fs from 'fs';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const wasmPath = path.resolve(__dirname, '../build/module.wasm');
const outputPng = path.resolve(__dirname, 'test.png');

export const width = 320;
export const height = 320;

export async function generateImageAndSave(outputPath = outputPng) {
  let PNG;
  try {
    PNG = (await import('pngjs')).PNG;
  } catch (e) {
    console.error("Dependency 'pngjs' not found. Please install it with:");
    console.error("  npm install pngjs");
    throw e;
  }

  let wasmModule;
  try {
    wasmModule = await WebAssembly.instantiate(
      await fs.promises.readFile(wasmPath),
      {}
    );
  } catch (e) {
    console.error("Failed to load WASM module at", wasmPath);
    throw e;
  }

  const { exports } = wasmModule.instance;
  const memory = exports.memory;
  const generateImage = exports.generateImage;
  const size = width * height * 4;

  let ptr = exports.malloc ? exports.malloc(size) : 1024;
  generateImage(ptr, width, height);
  const imgBuf = new Uint8Array(memory.buffer, ptr, size);

  const png = new PNG({ width, height });
  imgBuf.copyWithin(0, 0, size);
  png.data.set(imgBuf);

  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(outputPath);
    png.pack().pipe(stream)
      .on('finish', () => resolve(outputPath))
      .on('error', reject);
  });
}

// Allow CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  generateImageAndSave().then((out) => {
    console.log(`Wrote PNG to ${out}`);
  }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

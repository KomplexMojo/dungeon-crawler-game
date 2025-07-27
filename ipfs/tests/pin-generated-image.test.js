

import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { pinFileToIPFS } from "../utils/pin-content.js";

describe("pin-generated-image", () => {
  const imagePath = path.resolve("../backend/tests/output/test.png");
  const cidFilePath = path.resolve("./tests/output/cid.txt");

  it("should pin the generated image and save the CID", async () => {
    if (!fs.existsSync(imagePath)) {
      throw new Error(`Image file does not exist at path: ${imagePath}`);
    }

    const result = await pinFileToIPFS(imagePath);

    expect(result).toHaveProperty("Hash");
    expect(typeof result.Hash).toBe("string");
    expect(result.Hash.length).toBeGreaterThan(0);

    fs.mkdirSync(path.dirname(cidFilePath), { recursive: true });
    fs.writeFileSync(cidFilePath, result.Hash);
  });
});
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import fs from "fs";
import path from "path";
import { pinFileToIPFS } from "../utils/pin-content.js";
import { retrieveContentFromIPFS } from "../utils/retrieve-content.js";

describe("retrieveContentFromIPFS", () => {
  const testImagePath = path.resolve("./tests/test-image.png");
  const outputDir = "./tests/output";
  let cid = null;

  beforeAll(() => {
    const pngHeader = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    fs.writeFileSync(testImagePath, pngHeader);
  });

  afterAll(() => {
    if (fs.existsSync(testImagePath)) fs.unlinkSync(testImagePath);
    const outputFile = path.join(outputDir, "retrieved.png");
    if (fs.existsSync(outputFile)) fs.unlinkSync(outputFile);
  });

  it("should retrieve the content from IPFS and save it as the correct file type", async () => {
    const pinResult = await pinFileToIPFS(testImagePath);
    cid = pinResult.Hash;

    const retrieved = await retrieveContentFromIPFS(cid, outputDir);
    expect(retrieved.cid).toBe(cid);
    expect(retrieved.format).toBe("png");

    const retrievedPath = path.resolve(retrieved.filePath);
    expect(fs.existsSync(retrievedPath)).toBe(true);

    const fileContent = fs.readFileSync(retrievedPath);
    expect(fileContent.slice(0, 4).toString("hex")).toBe("89504e47");
  });
});
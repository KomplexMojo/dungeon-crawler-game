import { describe, it, expect, beforeEach } from "vitest";
import fs from "fs";
import path from "path";
import { generateImageAndSave } from "../utils/generate-image.js";

describe("generateImageAndSave", () => {
  const outputPath = path.resolve(__dirname, "./output/test.png");

  beforeEach(() => {
    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
    }
  });

  it("should generate and save a PNG file", async () => {
    const resultPath = await generateImageAndSave(outputPath);
    expect(fs.existsSync(resultPath)).to.be.true;
    const stats = fs.statSync(resultPath);
    expect(stats.size).to.be.greaterThan(0);
  });
});
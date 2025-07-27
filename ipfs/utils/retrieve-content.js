

import fetch from "node-fetch";
import fs from "fs";
import path from "path";

export async function retrieveContentFromIPFS(cid, outputDir = "./tests/output") {
  const url = `https://ipfs.io/ipfs/${cid}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch content: ${res.status} ${res.statusText}`);
  }

const buffer = Buffer.from(await res.arrayBuffer());

  // Basic format detection
  const header = buffer.slice(0, 4).toString("hex");
  let extension = "bin";

  switch (header) {
    case "89504e47":
      extension = "png";
      break;
    case "ffd8ffe0":
    case "ffd8ffe1":
    case "ffd8ffe2":
      extension = "jpg";
      break;
    case "25504446":
      extension = "pdf";
      break;
    case "504b0304":
      extension = "zip";
      break;
    default:
      // Could expand with more formats
      break;
  }

  // Ensure output directory exists
  fs.mkdirSync(outputDir, { recursive: true });

  const filePath = path.join(outputDir, `retrieved.${extension}`);
  fs.writeFileSync(filePath, buffer);

  return {
    cid,
    format: extension,
    filePath,
  };
}
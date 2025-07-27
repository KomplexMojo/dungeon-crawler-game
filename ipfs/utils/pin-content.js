import fetch from "node-fetch";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import FormData from "form-data";

dotenv.config();

export async function pinFileToIPFS(filePath) {
  const projectId = process.env.INFURA_PROJECT_ID;
  const projectSecret = process.env.INFURA_PROJECT_SECRET;

  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  if (!projectId || !projectSecret) {
    throw new Error("Missing INFURA_PROJECT_ID or INFURA_PROJECT_SECRET in .env");
  }

  const auth =
    "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

  const url = "https://ipfs.infura.io:5001/api/v0/add";

  const fileStream = fs.createReadStream(filePath);
  const form = new FormData();
  form.append("file", fileStream, path.basename(filePath));

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: auth,
      ...form.getHeaders(),
    },
    body: form,
  });

  if (!res.ok) {
    throw new Error(`Failed to pin file: HTTP ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return data; // includes .Hash (CID), .Name, .Size
}

// If you want to keep the script runnable directly:
export async function handlePinCLI(testFilePath) {
  if (!testFilePath) {
    console.error("❌ Please provide a file path to pin.");
    process.exit(1);
  }

  try {
    const data = await pinFileToIPFS(testFilePath);
    console.log("✅ File pinned successfully.");
    console.log("CID:", data.Hash);
    process.exit(0);
  } catch (err) {
    console.error("❌ Failed to pin file:", err.message);
    process.exit(1);
  }

}
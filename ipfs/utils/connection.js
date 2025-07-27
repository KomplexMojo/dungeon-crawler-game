import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

export async function testConnection() {
  const projectId = process.env.INFURA_PROJECT_ID;
  const projectSecret = process.env.INFURA_PROJECT_SECRET;

  if (!projectId || !projectSecret) {
    throw new Error("Missing INFURA_PROJECT_ID or INFURA_PROJECT_SECRET in .env");
  }

  const auth =
    "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

  // ... previous code for auth ...
  const url = "https://ipfs.infura.io:5001/api/v0/version"; // ← use version endpoint!

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: auth,
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }

  const data = await res.json();
  return data; // You can log here or in the test file
}

// If you want to keep the script runnable directly:
if (import.meta.url === `file://${process.argv[1]}`) {
  testConnection()
    .then((data) => {
      console.log("✅ Connected to Infura IPFS successfully.");
      console.log("Node ID:", data.ID);
      process.exit(0);
    })
    .catch((err) => {
      console.error("❌ IPFS Infura connection failed:", err.message);
      process.exit(1);
    });
}
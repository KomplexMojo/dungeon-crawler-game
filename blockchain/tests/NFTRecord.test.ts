import { expect } from "chai";
import { ethers } from "hardhat";
import { NFTRecord, NFTRecord__factory, TokenValue, TokenValue__factory } from "../typechain-types";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../../ipfs/.env") });

let cid: string;

describe("NFTRecord", function () {
  let nft: NFTRecord;
  let token: TokenValue;
  let owner: any;
  let other: any;
  const initialSupply = 1_000_000;
  const assignedTokenAmount = 5000;

beforeEach(async () => {
  [owner, other] = await ethers.getSigners();

  const cidPath = path.resolve(__dirname, "../../ipfs/tests/output/cid.txt");
  cid = fs.readFileSync(cidPath, "utf8").trim();

  const tokenFactory = await ethers.getContractFactory("TokenValue");
  token = await tokenFactory.deploy(1_000_000, await owner.getAddress());
  await token.waitForDeployment();

  const nftFactory = await ethers.getContractFactory("NFTRecord");
  nft = await nftFactory.deploy(await owner.getAddress(), await token.getAddress());
  await nft.waitForDeployment();

  await token.setNFTContract(await nft.getAddress());
  await token.approve(await nft.getAddress(), 5000);
});

  it("should allow the owner to mint with token value", async () => {
    //const cid = fs.readFileSync(cidFilePath, "utf8").trim();
    const tokenURI = `ipfs://${cid}`;

    await nft.mint(await other.getAddress(), tokenURI, assignedTokenAmount);

    expect(await nft.ownerOf(0)).to.equal(await other.getAddress());
    expect(await nft.tokenURI(0)).to.equal(tokenURI);
    expect(await nft.getTokenValue(0)).to.equal(assignedTokenAmount);
  });

  it("should reject minting by non-owner", async () => {
    await expect(
      nft.connect(other).mint(await other.getAddress(), "ipfs://fail", 100)
    ).to.be.revertedWithCustomError(nft, "OwnableUnauthorizedAccount");
  });

  it("should not allow release or withdrawal of token value", async () => {
    //const cid = fs.readFileSync(cidFilePath, "utf8").trim();
    const tokenURI = `ipfs://${cid}`;
    await nft.mint(await other.getAddress(), tokenURI, assignedTokenAmount);

    // Try to transfer tokens back from the NFT contract (should not be allowed)
    await expect(
      token.transferFrom(await nft.getAddress(), await owner.getAddress(), assignedTokenAmount)
    ).to.be.reverted;
  });
});
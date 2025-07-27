import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@typechain/hardhat";


const config: HardhatUserConfig = {
  solidity: "0.8.28",
paths: {
  sources: "./contracts",      // relative to blockchain/
  tests: "./test",             // test folder inside blockchain/
  cache: "./cache",
  artifacts: "./artifacts"
},
typechain: {
  outDir: "./typechain-types",
  target: "ethers-v6"
}
};

export default config;
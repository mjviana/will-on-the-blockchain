import {HardhatUserConfig} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import {nodeUrl, accounts} from "./utils/network";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const PRIVATE_KEY_SEPOLIA = process.env.PRIVATE_KEY_SEPOLIA;

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.19",
      },
      {
        version: "0.8.8",
      },
    ],
    settings: {
      optimizer: {
        enabled: true,
        runs: 10000,
        details: {
          yul: true,
        },
      },
    },
  },
  networks: {
    sepolia: {
      url: nodeUrl("sepolia"),
      accounts: PRIVATE_KEY_SEPOLIA ? [PRIVATE_KEY_SEPOLIA] : [],
      chainId: 11155111,
    },
  },
  etherscan: {
    // yarn hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
    apiKey: ETHERSCAN_API_KEY,
  },
  namedAccounts: {
    deployer: 0,
  },
};

export default config;

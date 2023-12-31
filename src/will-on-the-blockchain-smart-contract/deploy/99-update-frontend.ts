import {ethers, network} from "hardhat";
import fs from "fs";

const FRONT_END_CONSTANTS_PATH =
  "../will-on-the-blockchain-frontend/src/constants";

const FRONT_END_ADDRESSES_FILE =
  FRONT_END_CONSTANTS_PATH + "/contractAddresses.json";
("../will-on-the-blockchain-frontend/src/constants/contractAddresses.json");

const FRONT_END_ABI_FILE = FRONT_END_CONSTANTS_PATH + "/abi.json";

const FRONT_END_BLOCKCHAIN_WILL_TYPE_PATH =
  "../will-on-the-blockchain-frontend/src/types";

const FRONT_END_BLOCKCHAIN_WILL_TYPE_FILE =
  FRONT_END_BLOCKCHAIN_WILL_TYPE_PATH + "/BlockchainWill.ts";

const BLOCKCHAIN_WILL_TYPE_PATH = "./typechain-types";
const BLOCKCHAIN_WILL_TYPE_PATH_FILE = "./typechain-types/BlockchainWill.ts";

module.exports = async () => {
  if (process.env.UPDATE_FRONTEND) {
    console.log("Writing to frontend...");
    await updateContractAddresses();
    await updateAbi();
    await updateBlockchainWillType();
    console.log("Frontend written!");
  }
};

async function updateContractAddresses() {
  console.log("Updating contract addresses...");

  // getting the contract address
  const blockchainWill = await ethers.getContract("BlockchainWill");
  const blockchainWillAddress = await blockchainWill.getAddress();
  const chainId = network.config.chainId?.toString();

  console.log(`BlockchainWill address: ${blockchainWillAddress}`);
  console.log(`ChainId: ${chainId}`);

  // check if addresses file exists if not create it
  if (!fs.existsSync(FRONT_END_ADDRESSES_FILE)) {
    console.log(
      "Addresses file does not exist. Creating contract addresses file..."
    );

    fs.mkdirSync(FRONT_END_CONSTANTS_PATH, {recursive: true});
    fs.writeFileSync(FRONT_END_ADDRESSES_FILE, "{}");
  }

  // Parse the existing data as an object with chainIds as keys
  const contractAddresses: {[key: string]: string[]} = JSON.parse(
    fs.readFileSync(FRONT_END_ADDRESSES_FILE, "utf8")
  );

  console.log(
    `Current contract addresses: ${JSON.stringify(contractAddresses)}`
  );

  if (chainId != null && chainId in contractAddresses) {
    // If the chainId is in the object, but the address is not, add it
    if (!contractAddresses[chainId].includes(blockchainWillAddress)) {
      contractAddresses[chainId].push(blockchainWillAddress);
    }
  } else if (chainId != null) {
    // If the chainId is not in the object, add it with the address
    contractAddresses[chainId!] = [blockchainWillAddress];
  }

  // Write the object back to the file
  fs.writeFileSync(FRONT_END_ADDRESSES_FILE, JSON.stringify(contractAddresses));

  console.log(
    `Updated contract addresses: ${JSON.stringify(contractAddresses)}`
  );
}
async function updateAbi() {
  console.log("Updating abi...");

  // getting the contract address
  const blockchainWill = await ethers.getContract("BlockchainWill");

  // check if abi file exists if not create it
  if (!fs.existsSync(FRONT_END_ABI_FILE)) {
    console.log("Abi file does not exist. Creating abi file...");
    fs.mkdirSync(FRONT_END_CONSTANTS_PATH, {recursive: true});
  }

  console.log(`blockchainWill: ${blockchainWill.interface.formatJson()}`);

  // write abi to file
  fs.writeFileSync(FRONT_END_ABI_FILE, blockchainWill.interface.formatJson());
}

async function updateBlockchainWillType() {
  console.log("Updating BlockchainWill types...");
  if (!fs.existsSync(FRONT_END_BLOCKCHAIN_WILL_TYPE_PATH)) {
    console.log("BlockchainWill types files does not exists. Creating them...");

    fs.mkdirSync(FRONT_END_BLOCKCHAIN_WILL_TYPE_PATH, {recursive: true});
  }

  // copy files from typechain-types/ to frontend/src/types/
  fs.cpSync(BLOCKCHAIN_WILL_TYPE_PATH, FRONT_END_BLOCKCHAIN_WILL_TYPE_PATH, {
    recursive: true,
  });
}

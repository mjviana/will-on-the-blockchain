import {expect} from "chai";
import {ethers} from "hardhat";
import {BlockchainWill} from "../typechain-types";

describe("BlockChainWill", function () {
  let blockchainWill: BlockchainWill;

  let dummyTestator: BlockchainWill.PersonStruct = {
    name: "John Wick",
    citizenshipCardId: "111111111",
    birthdate: 950400000, // 30 years old
  };
  let dummyFirstWitness: BlockchainWill.PersonStruct = {
    name: "Bob",
    citizenshipCardId: "222222222",
    birthdate: 950400000, // 30 years old
  };
  let dummySecondWitness: BlockchainWill.PersonStruct = {
    name: "Charlie",
    citizenshipCardId: "333333333",
    birthdate: 950400000, // 30 years old
  };
  let dummyUnderAgeTestator: BlockchainWill.PersonStruct = {
    name: "John Wick",
    citizenshipCardId: "111111111",
    birthdate: 1666821322, // year 2022
  };
  let dummyWill: BlockchainWill.WillCreationStruct = {
    testator: dummyTestator,
    isPublic: true,
    secretCode: "supersecretcode",
    will: "I leave nothing to nobody, except bullets to my enemies.",
    firstWitness: dummyFirstWitness,
    secondWitness: dummySecondWitness,
  };

  beforeEach(async function () {
    const BlockchainWill = await ethers.getContractFactory("BlockchainWill");
    blockchainWill = await BlockchainWill.deploy();
  });

  it("should create a will", async function () {
    await blockchainWill.createWill(dummyWill);

    expect(await blockchainWill.getPublicWillsLength()).to.greaterThan(0);
  });

  it("should not allow creating a will for a minor", async function () {
    dummyWill.testator = dummyUnderAgeTestator;
    await expect(
      blockchainWill.createWill(dummyWill)
    ).to.be.revertedWithCustomError(blockchainWill, "UnderAge");
  });

  it("should not allow someone create two wills without redoing the first one", async function () {
    dummyWill.testator = dummyTestator;
    await blockchainWill.createWill(dummyWill);

    await expect(
      blockchainWill.createWill(dummyWill)
    ).to.be.revertedWithCustomError(blockchainWill, "HasCreatedWill");
  });

  it("should revoke a public will", async function () {
    await blockchainWill.createWill(dummyWill);

    await blockchainWill.revokePublicWill(dummyWill.testator.citizenshipCardId);

    expect(await blockchainWill.getPublicWillsLength()).to.equal(0);
  });

  it("should not allow revoke a private will using revoke public will", async function () {
    dummyWill.isPublic = false;
    await blockchainWill.createWill(dummyWill);

    await expect(
      blockchainWill.revokePublicWill(dummyTestator.citizenshipCardId)
    ).to.be.revertedWithCustomError(blockchainWill, "PrivateWill");
  });

  it("should not allow revoke a public will using revoke private will", async function () {
    dummyWill.isPublic = true;
    await blockchainWill.createWill(dummyWill);

    await expect(
      blockchainWill.revokePrivateWill(dummyTestator.citizenshipCardId)
    ).to.be.revertedWithCustomError(blockchainWill, "PublicWill");
  });

  it("should not allow an address other than testator's address revoke a will", async function () {
    dummyWill.isPublic = true;

    const [owner, otherAccount] = await ethers.getSigners();

    blockchainWill.connect(owner);
    await blockchainWill.createWill(dummyWill);

    await expect(
      blockchainWill
        .connect(otherAccount)
        .revokePublicWill(dummyTestator.citizenshipCardId)
    ).to.be.revertedWithCustomError(blockchainWill, "NotTestator");
  });
});

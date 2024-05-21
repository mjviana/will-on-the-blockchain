import {expect} from "chai";
import {ethers} from "hardhat";
import {BlockchainWill} from "../typechain-types";

describe("BlockChainWill", function () {
  // Arrange
  let blockchainWill: BlockchainWill;

  let dummyTestator: BlockchainWill.PersonStruct = {
    name: "John ",
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
    name: "Baby John ",
    citizenshipCardId: "111111111",
    birthdate: 1666821322, // year 2022
  };
  let dummyWill: BlockchainWill.WillCreationStruct = {
    testator: dummyTestator,
    isPublic: true,
    secretCode: "supersecretcode",
    will: "I leave 1 million dollars to my dog.",
    firstWitness: dummyFirstWitness,
    secondWitness: dummySecondWitness,
  };

  beforeEach(async function () {
    const BlockchainWill = await ethers.getContractFactory("BlockchainWill");
    blockchainWill = await BlockchainWill.deploy();
  });

  // Act
  it("should create a will", async function () {
    await blockchainWill.createWill(dummyWill);

    // Assert
    expect(await blockchainWill.getPublicWillsLength()).to.greaterThan(0);
  });

  // Act
  it("should not allow creating a will for a minor", async function () {
    dummyWill.testator = dummyUnderAgeTestator;

    // Assert
    await expect(
      blockchainWill.createWill(dummyWill)
    ).to.be.revertedWithCustomError(blockchainWill, "UnderAge");
  });

  // Act
  it("should not allow someone create two wills without redoing the first one", async function () {
    dummyWill.testator = dummyTestator;
    await blockchainWill.createWill(dummyWill);

    // Assert
    await expect(
      blockchainWill.createWill(dummyWill)
    ).to.be.revertedWithCustomError(blockchainWill, "HasCreatedWill");
  });

  // Act
  it("should revoke a public will", async function () {
    await blockchainWill.createWill(dummyWill);

    await blockchainWill.revokePublicWill(dummyWill.testator.citizenshipCardId);

    // Assert
    expect(await blockchainWill.getPublicWillsLength()).to.equal(0);
  });

  // Act
  it("should not allow revoke a private will using revoke public will", async function () {
    dummyWill.isPublic = false;
    await blockchainWill.createWill(dummyWill);

    // Assert
    await expect(
      blockchainWill.revokePublicWill(dummyTestator.citizenshipCardId)
    ).to.be.revertedWithCustomError(blockchainWill, "PrivateWill");
  });

  // Act
  it("should not allow revoke a public will using revoke private will", async function () {
    dummyWill.isPublic = true;
    await blockchainWill.createWill(dummyWill);

    // Assert
    await expect(
      blockchainWill.revokePrivateWill(dummyTestator.citizenshipCardId)
    ).to.be.revertedWithCustomError(blockchainWill, "PublicWill");
  });

  // Act
  it("should not allow an address other than testator's address revoke a will", async function () {
    dummyWill.isPublic = true;

    const [owner, otherAccount] = await ethers.getSigners();

    blockchainWill.connect(owner);
    await blockchainWill.createWill(dummyWill);

    // Assert
    await expect(
      blockchainWill
        .connect(otherAccount)
        .revokePublicWill(dummyTestator.citizenshipCardId)
    ).to.be.revertedWithCustomError(blockchainWill, "NotTestator");
  });
});

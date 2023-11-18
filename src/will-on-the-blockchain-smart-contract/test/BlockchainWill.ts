import {expect} from "chai";
import {ethers} from "hardhat";
import {BlockchainWill} from "../typechain-types";

describe("BlockChainWill", function () {
  let blockchainWill: BlockchainWill;

  const testator = "John Wick";
  const testatorCitizenshipCardId = "111111111";
  const testatorBirthdate = 950400000; // 30 years old
  const firstWitnessName = "Bob";
  const firstWitnessCitizenshipCardId = "222222222";
  const firstWitnessBirthdate = 946080000; // 30 years old
  const secondWitnessName = "Charlie";
  const secondWitnessCitizenshipCardId = "333333333";
  const secondWitnessBirthdate = 946080000; // 30 years old
  const will = "I leave nothing to nobody, except bullets to my enemies.";

  beforeEach(async function () {
    const BlockchainWill = await ethers.getContractFactory("BlockchainWill");
    blockchainWill = await BlockchainWill.deploy();
  });

  it("should create a will", async function () {
    await blockchainWill.createWill(
      testator,
      will,
      testatorCitizenshipCardId,
      testatorBirthdate,
      true,
      firstWitnessName,
      firstWitnessCitizenshipCardId,
      firstWitnessBirthdate,
      secondWitnessName,
      secondWitnessCitizenshipCardId,
      secondWitnessBirthdate
    );

    expect(await blockchainWill.getPublicWillsLength()).to.greaterThan(0);
  });

  it("should not allow creating a will for a minor", async function () {
    const minorBirthdate = 1666821322; // year 2022

    await expect(
      blockchainWill.createWill(
        testator,
        will,
        testatorCitizenshipCardId,
        minorBirthdate,
        true,
        firstWitnessName,
        firstWitnessCitizenshipCardId,
        firstWitnessBirthdate,
        secondWitnessName,
        secondWitnessCitizenshipCardId,
        secondWitnessBirthdate
      )
    ).to.be.revertedWithCustomError(blockchainWill, "UnderAge");
  });

  it("should not allow someone create two wills without redoing the first one", async function () {
    await blockchainWill.createWill(
      testator,
      will,
      testatorCitizenshipCardId,
      testatorBirthdate,
      true,
      firstWitnessName,
      firstWitnessCitizenshipCardId,
      firstWitnessBirthdate,
      secondWitnessName,
      secondWitnessCitizenshipCardId,
      secondWitnessBirthdate
    );

    await expect(
      blockchainWill.createWill(
        testator,
        will,
        testatorCitizenshipCardId,
        testatorBirthdate,
        true,
        firstWitnessName,
        firstWitnessCitizenshipCardId,
        firstWitnessBirthdate,
        secondWitnessName,
        secondWitnessCitizenshipCardId,
        secondWitnessBirthdate
      )
    ).to.be.revertedWithCustomError(blockchainWill, "HasCreatedWill");
  });

  it("should revoke a public will", async function () {
    await blockchainWill.createWill(
      testator,
      will,
      testatorCitizenshipCardId,
      testatorBirthdate,
      true,
      firstWitnessName,
      firstWitnessCitizenshipCardId,
      firstWitnessBirthdate,
      secondWitnessName,
      secondWitnessCitizenshipCardId,
      secondWitnessBirthdate
    );

    await blockchainWill.revokePublicWill(testatorCitizenshipCardId);

    expect(await blockchainWill.getPublicWillsLength()).to.equal(0);
  });

  it("should not allow revoke a private will", async function () {
    await blockchainWill.createWill(
      testator,
      will,
      testatorCitizenshipCardId,
      testatorBirthdate,
      false,
      firstWitnessName,
      firstWitnessCitizenshipCardId,
      firstWitnessBirthdate,
      secondWitnessName,
      secondWitnessCitizenshipCardId,
      secondWitnessBirthdate
    );

    await expect(
      blockchainWill.revokePublicWill(testatorCitizenshipCardId)
    ).to.be.revertedWithCustomError(blockchainWill, "PrivateWill");
  });
});

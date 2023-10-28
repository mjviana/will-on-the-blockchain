import {HardhatRuntimeEnvironment} from "hardhat/types";
import {DeployFunction} from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // code here
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  // get the deployer (These can be configured in hardhat.config.ts under namedAccounts)
  const {deployer} = await getNamedAccounts();

  /*
  This will create a deployment called 'BlockchainWill'.
  By default it will look for an artifact with the same name.
  The 'contract' option allows you to use a different artifact.
  */
  await deploy("BlockchainWill", {
    from: deployer, // Deployer will be performing the deployment transaction.
    log: true, // Display the address and gas used in the console (not when run in test though).
  });
};
export default func;

func.tags = ["BlockchainWill"]; // This sets up a tag so you can execute the script on its own (and its dependencies).

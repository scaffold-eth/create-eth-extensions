import { deployScript, artifacts } from "../rocketh/deploy.js";

/**
 * Deploys a contract named "SE2Token" using the deployer account.
 *
 * @param env Rocketh environment object.
 */
export default deployScript(
  async env => {
    /*
      On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

      When deploying to live networks (e.g `yarn deploy --network sepolia`), the deployer account
      should have sufficient balance to pay for the gas fees for contract creation.

      You can generate a random account with `yarn generate` or `yarn account:import` to import your
      existing PK which will fill DEPLOYER_PRIVATE_KEY_ENCRYPTED in the .env file (then used on hardhat.config.ts)
      You can run the `yarn account` command to check your balance in every network.
    */
    const { deployer } = env.namedAccounts;

    await env.deploy("SE2Token", {
      account: deployer,
      artifact: artifacts.SE2Token,
    });
  },
  {
    // Tags are useful if you have multiple deploy files and only want to run some of them.
    // e.g. yarn deploy --tags SE2Token
    tags: ["SE2Token"],
  },
);

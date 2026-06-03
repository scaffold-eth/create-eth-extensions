import { expect } from "chai";
import { network } from "hardhat";
import type { Abi_SE2Token } from "../generated/abis/SE2Token.js";
import { loadAndExecuteDeploymentsFromFiles } from "../rocketh/environment.js";

const { provider, networkHelpers, ethers } = await network.create();

// We define a fixture to reuse the same setup in every test.
async function deployFixture() {
  const env = await loadAndExecuteDeploymentsFromFiles({ provider });
  const { address, abi } = env.get<Abi_SE2Token>("SE2Token");
  const [, user1, user2] = await ethers.getSigners();
  const token = await ethers.getContractAt(abi, address);
  return { token, address, abi, user1, user2 };
}

describe("SE2Token", function () {
  describe("Initial Setup", function () {
    it("should have correct name, symbol and initial supply", async function () {
      const { token } = await networkHelpers.loadFixture(deployFixture);

      expect(await token.name()).to.equal("SE2Token");
      expect(await token.symbol()).to.equal("SE2");
      expect(await token.totalSupply()).to.equal(0n);
    });
  });

  describe("Minting", function () {
    it("should mint tokens correctly", async function () {
      const { token, user1 } = await networkHelpers.loadFixture(deployFixture);
      const mintAmount = 100n * 10n ** 18n; // 100 tokens

      // Minting is open to anyone; the default signer mints to user1
      await token.mint(user1.address, mintAmount);

      expect(await token.balanceOf(user1.address)).to.equal(mintAmount);
      expect(await token.totalSupply()).to.equal(mintAmount);
    });
  });

  describe("Transfer", function () {
    it("should transfer tokens correctly", async function () {
      const { address, abi, user1, user2 } = await networkHelpers.loadFixture(deployFixture);
      const mintAmount = 100n * 10n ** 18n; // 100 tokens
      const transferAmount = 30n * 10n ** 18n; // 30 tokens

      const tokenAsUser1 = await ethers.getContractAt(abi, address, user1);

      // Mint to user1, then transfer user1 -> user2
      await tokenAsUser1.mint(user1.address, mintAmount);
      await tokenAsUser1.transfer(user2.address, transferAmount);

      expect(await tokenAsUser1.balanceOf(user1.address)).to.equal(mintAmount - transferAmount);
      expect(await tokenAsUser1.balanceOf(user2.address)).to.equal(transferAmount);
    });
  });
});

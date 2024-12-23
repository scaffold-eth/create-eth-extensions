import { expect } from "chai";
import { ethers } from "hardhat";
import { SE2Token } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("SE2Token", function () {
  let token: SE2Token;
  let owner: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;

  beforeEach(async function () {
    // Get signers
    [owner, user1, user2] = await ethers.getSigners();

    // Deploy the token
    const SE2Token = await ethers.getContractFactory("SE2Token");
    token = await SE2Token.deploy();
    await token.waitForDeployment();
  });

  describe("Initial Setup", function () {
    it("should have correct name, symbol and initial supply", async function () {
      const name = await token.name();
      const symbol = await token.symbol();
      const supply = await token.totalSupply();

      expect(name).to.equal("SE2Token");
      expect(symbol).to.equal("SE2");
      expect(supply).to.equal(0n);
    });
  });

  describe("Minting", function () {
    it("should mint tokens correctly", async function () {
      const mintAmount = 100n * 10n ** 18n; // 100 tokens

      // Mint tokens to user1
      await token.connect(owner).mint(user1.address, mintAmount);

      // Check balance
      const balance = await token.balanceOf(user1.address);
      const totalSupply = await token.totalSupply();

      expect(balance).to.equal(mintAmount);
      expect(totalSupply).to.equal(mintAmount);
    });
  });

  describe("Transfer", function () {
    it("should transfer tokens correctly", async function () {
      const mintAmount = 100n * 10n ** 18n; // 100 tokens
      const transferAmount = 30n * 10n ** 18n; // 30 tokens

      // Mint tokens to user1
      await token.connect(owner).mint(user1.address, mintAmount);

      // Transfer from user1 to user2
      await token.connect(user1).transfer(user2.address, transferAmount);

      // Check balances
      const user1Balance = await token.balanceOf(user1.address);
      const user2Balance = await token.balanceOf(user2.address);

      expect(user1Balance).to.equal(mintAmount - transferAmount);
      expect(user2Balance).to.equal(transferAmount);
    });
  });
});

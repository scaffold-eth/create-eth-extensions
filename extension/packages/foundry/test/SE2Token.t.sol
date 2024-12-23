// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import { Test } from "forge-std/Test.sol";
import { SE2Token } from "../contracts/SE2Token.sol";

contract SE2TokenTest is Test {
    SE2Token public token;
    address public user1;
    address public user2;

    function setUp() public {
        // Deploy the token
        token = new SE2Token();

        // Create test addresses
        user1 = makeAddr("user1");
        user2 = makeAddr("user2");
    }

    function test_InitialSetup() public view {
        assertEq(token.name(), "SE2Token");
        assertEq(token.symbol(), "SE2");
        assertEq(token.totalSupply(), 0);
    }

    function test_Minting() public {
        uint256 mintAmount = 100 * 10 ** 18; // 100 tokens

        // Mint tokens to user1
        token.mint(user1, mintAmount);

        // Check balance
        assertEq(token.balanceOf(user1), mintAmount);
        assertEq(token.totalSupply(), mintAmount);
    }

    function test_Transfer() public {
        uint256 mintAmount = 100 * 10 ** 18; // 100 tokens
        uint256 transferAmount = 30 * 10 ** 18; // 30 tokens

        // Mint tokens to user1
        token.mint(user1, mintAmount);

        // Transfer from user1 to user2
        vm.prank(user1);
        token.transfer(user2, transferAmount);

        // Check balances
        assertEq(token.balanceOf(user1), mintAmount - transferAmount);
        assertEq(token.balanceOf(user2), transferAmount);
    }
}

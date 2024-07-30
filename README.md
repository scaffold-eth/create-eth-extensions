# ERC-20 Token Extension for Scaffold-ETH 2

This extension introduces an ERC-20 token contract and demonstrates how to use interact with it, including getting a holder balance and transferring tokens.

The ERC-20 Token Standard introduces a standard for Fungible Tokens ([EIP-20](https://eips.ethereum.org/EIPS/eip-20)), in other words, each Token is exactly the same (in type and value) as any other Token.

The ERC-20 token contract is implemented using the [ERC-20 token implementation](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol) from OpenZeppelin.

## Installation

You can install any of the extensions in this repository by running the following command:

```bash
npx create-eth@latest -e erc-20
```

## 🚀 Setup extension

Deploy your contract running `yarn deploy`

## Interact with the token

Start the front-end with `yarn start` and go to the _/erc20_ page to interact with your deployed ERC-20 token.

You can check the code at `packages/nextjs/app/erc20/page.tsx`.

# ERC-20 Extension for Scaffold-ETH 2

This extension adds ERC-20 token support to Scaffold-ETH 2, letting you deploy and interact with a standard fungible token contract. It comes with example usage and helpful components, serving as a starter kit for building ERC-20-based dApps. Check balances, transfer tokens, and explore how ERC-20 works in practice. Based on the [OpenZeppelin ERC-20 implementation](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol). [Learn more about ERC-20](https://eips.ethereum.org/EIPS/eip-20).

## Installation

```bash
npx create-eth@latest -e erc-20
```

## 🚀 Setup extension

Deploy your contract running `yarn deploy`

## Interact with the token

Start the front-end with `yarn start` and go to the _/erc20_ page to interact with your deployed ERC-20 token.

You can check the code at `packages/nextjs/app/erc20/page.tsx`.

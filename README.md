# ERC-721 Extension for Scaffold-ETH 2

This extension brings ERC-721 NFT support to Scaffold-ETH 2, letting you deploy and interact with a standard non-fungible token contract. Mint, transfer, and list NFTs, check balances and total supply. Based on the [OpenZeppelin ERC-721 implementation](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol) and [Enumerable extension](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721Enumerable.sol). [Learn more about ERC-721](https://eips.ethereum.org/EIPS/eip-721).

## Installation

```bash
npx create-eth@latest -e erc-721
```

## 🚀 Setup extension

Deploy your contract running `yarn deploy`

## Interact with the NFT

Start the front-end with `yarn start` and go to the _/erc721_ page to interact with your deployed ERC-721 token.

You can check the code at `packages/nextjs/app/erc721`.

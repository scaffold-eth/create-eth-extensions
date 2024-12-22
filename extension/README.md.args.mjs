export const extraContents = `## 🚀 Setup ERC-721 NFT Extension

This extension introduces an ERC-721 token contract and demonstrates how to use it, including getting the total supply and holder balance, listing all NFTs from the collection and NFTs from the connected address, and how to transfer NFTs.

The ERC-721 Token Standard introduces a standard for Non-Fungible Tokens ([EIP-721](https://eips.ethereum.org/EIPS/eip-721)), in other words, each token is unique.

The ERC-721 token contract is implemented using the [ERC-721 token implementation](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol) from OpenZeppelin.

The ERC-721 token implementation uses the [ERC-721 Enumerable extension](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721Enumerable.sol) from OpenZeppelin to list all tokens from the collection and all the tokens owned by an address. You can remove this if you plan to use an indexer, like a Subgraph or Ponder ([extensions available](https://scaffoldeth.io/extensions)).

### Setup

Deploy your contract running \`\`\`yarn deploy\`\`\`

### Interact with the NFT

Start the front-end with \`\`\`yarn start\`\`\` and go to the _/erc721_ page to interact with your deployed ERC-721 token.

You can check the code at \`\`\`packages/nextjs/app/erc721\`\`\`.

`;

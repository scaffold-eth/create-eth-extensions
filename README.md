# ERC-721 NFT - AI Skill for Scaffold-ETH 2

AI skill for adding [ERC-721](https://eips.ethereum.org/EIPS/eip-721) NFT support to [Scaffold-ETH 2](https://github.com/scaffold-eth/scaffold-eth-2) projects. Deploy and interact with a non-fungible token contract using [OpenZeppelin's ERC-721 implementation](https://docs.openzeppelin.com/contracts/5.x/erc721).

## Usage

Point your AI agent at [`skills/erc-721/SKILL.md`](./skills/erc-721/SKILL.md) for the full integration knowledge.

## What It Covers

- ERC-721 NFT contract setup with OpenZeppelin (including Enumerable, URIStorage, Royalty extensions)
- Deployment scripts for both Hardhat and Foundry flavors
- Metadata patterns (on-chain vs IPFS, JSON schema, base URI gotchas)
- Security pitfalls (safeMint reentrancy, setApprovalForAll phishing, flash loan governance)
- Gas optimization trade-offs (ERC721Enumerable vs ERC721A)
- ERC-2981 royalties and marketplace enforcement reality
- Soulbound tokens (ERC-5192)

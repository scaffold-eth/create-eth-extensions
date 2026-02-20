# EIP-5792 Batched Transactions - AI Skill for Scaffold-ETH 2

AI skill for adding [EIP-5792](https://eips.ethereum.org/EIPS/eip-5792) batched transaction support to [Scaffold-ETH 2](https://github.com/scaffold-eth/scaffold-eth-2) projects. Batch multiple onchain write calls into a single wallet interaction using [wagmi's EIP-5792 hooks](https://wagmi.sh/react/api/hooks/useWriteContracts).

## Usage

Point your AI agent at [`skills/eip-5792/SKILL.md`](./skills/eip-5792/SKILL.md) for the full integration knowledge.

## What It Covers

- EIP-5792 wallet capability detection and graceful degradation
- Batched contract writes with `useWriteContracts` from wagmi
- Batch status tracking with `useShowCallsStatus`
- Optional paymaster integration (ERC-7677) for gas sponsorship
- SE-2 scaffold hooks integration for individual call fallbacks

# EIP-5792 Extension for Scaffold-ETH 2

This extension demonstrates how to use an [EIP-5792](https://eips.ethereum.org/EIPS/eip-5792) compliant wallet to process a batch of onchain write calls and check their status. It provides an example frontend and smart contract, showing how to make batched calls to the burner wallet (on local chain) or any [EIP-5792 compliant wallet](https://www.eip5792.xyz/ecosystem/wallets) using wagmi's hooks.

Currently, extra `capabilities` are not supported by the burner wallet and local chain. To test advanced `capabilities`, deploy to a live network. See the [docs](https://docs.scaffoldeth.io/deploying/deploy-smart-contracts) for deployment instructions. You can then use an [EIP-5792 wallet](https://www.eip5792.xyz/ecosystem/wallets) to enhance calls with features like atomic execution or paymasters, if supported by the wallet.

## Installation

```bash
npx create-eth@latest -e eip-5792
```

## Interact with demo

1. Start the front-end with `yarn start` and go to the _/eip-5792_ page.

2. Click "Batch(setGreetings + increment)" to make the batch transaction.
   You can check the example on how to use EIP-5792 calls in `packages/nextjs/app/eip-5792/_components/EIp5792Example.tsx`.

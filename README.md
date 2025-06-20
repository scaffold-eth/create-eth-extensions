# ERC-5792 Extension for Scaffold-ETH 2

This extension demonstrates an example on how to ask a [EIP-5792](https://eips.ethereum.org/EIPS/eip-5792) compliant wallet to process a batch of onchain write calls and to check on the status of those calls.

This extension comes with an example of frontend interaction (`packages/nextjs/app/eip-5792/_components/EIp5792Example.tsx`) with the `EIP5792_Example.sol` contract, the code demonstrates on how to make batched calls to the burner wallet (on local chain) or any eip-5792 [compliant wallet](https://www.eip5792.xyz/ecosystem/wallets), that batches new greetings and increments the counter call in a single call to wallet using wagmi's hooks.

At the moment, extra `capabilities` are not supported by burner wallet + local chain. To test `capabilities` deploy the `EIP5792_Example.sol` to live network. Checkout [docs](https://docs.scaffoldeth.io/deploying/deploy-smart-contracts) on how to deploy smart contracts to live network. You can use then use [EIP-5792 wallet](https://www.eip5792.xyz/ecosystem/wallets) and enhance the calls by using `capabilities` (such as atomic execution or paymasters), if they are supported by the wallet.

## Installation

```bash
npx create-eth@latest -e eip-5792
```

## Interact with demo

1. Start the front-end with `yarn start` and go to the _/eip-5792_ page.

2. Click "Batch(setGreetings + increment)" to make the batch transaction.
   You can check the example on how to use EIP-5792 calls in `packages/nextjs/app/eip-5792/_components/EIp5792Example.tsx`.

# ERC-5792 Extension for Scaffold-ETH 2

This extension demonstrates on how to use [EIP-5792](https://eips.ethereum.org/EIPS/eip-5792) wallet capabilities. This EIP introduces new JSON-RPC methods for communication between appas and wallets. Which allows for more advanced interactions like submitting multiple onchain calls as part of a single
transaction or sponsoring users transactions via ERC-4337 paymasters.

This extension comes with an example frontend interaction with the `EIP5792_Example.sol` contract, the code demonstrates on how to make an batched transaction that sets new greetings and increments the counter in a single transaction using wagmi's experimental hooks and coinbase smart wallet.

## Installation

You can install any of the extensions in this repository by running the following command:

```bash
npx create-eth@latest -e eip-5792
```

## 🚀 Setup extension

Since coinbase smart wallet does not work with local blockchain, you will be needing a contract deployed on live network example `baseSepolia` to play with demo. 

You can either copy paste this in `packages/nextjs/contracts/externalContracts.ts` :

<details>  
  <summary> externalContracts.ts </summary> 

```ts
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const externalContracts = {
  84532: {
    EIP5792_Example: {
      address: "0x93F9788E0bcdCa92612c78A41ec1593bcE22977b",
      abi: [
        {
          inputs: [],
          name: "greeting",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "increaseCounter",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "premium",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_newGreeting",
              type: "string",
            },
          ],
          name: "setGreeting",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          name: "totalCounter",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          stateMutability: "payable",
          type: "receive",
        },
      ],
      inheritedFunctions: {},
    },
  },
} as const;

export default externalContracts satisfies GenericContractsDeclaration;

```



</details>

Or deploy the `EIP5792_Example.sol` to `baseSepolia` yourself. Checkout [docs](https://docs.scaffoldeth.io/deploying/deploy-smart-contracts) on how to deploy smart contracts to live network.

## Interact with demo

1. Start the front-end with `yarn start` and go to the _/eip-5792_ page. 

2. Disconnect from burner wallet and connect with coinbase wallet( make sure you use passkey method to connect with coinbase wallet) which is eip-5792 compliant.

3. Switch network to base `base seplia` from wallet dropdown on top right.

4. Click "Batch(setGreetings + increment)" to make the batch transaction
You can check the example on how to use EIP-5792 calls in `packages/nextjs/app/eip-5792/_components/EIp5792Example.tsx`.

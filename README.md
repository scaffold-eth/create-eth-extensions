# Randao Random Generator Extension for Scaffold-ETH 2

This extension shows how to use on-chain randomness using RANDAO for truly on-chain unpredictable random sources.

Ethereum PoS introduces randomness using block.mixHash (prevRandao). Look at [EIP-4399](https://eips.ethereum.org/EIPS/eip-4399) for more information.

## Installation

You can install any of the extensions in this repository by running the following command:

```bash
npx create-eth@latest -e randao
```

## 🚀 Setup extension

Deploy your contract running `yarn deploy`

## Interact with the token

Start the front-end with `yarn start` and go to the _/randao_ page to get more information and interact with your deployed RandomGenerator contract.
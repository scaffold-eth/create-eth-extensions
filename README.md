# OnchainKit extension

This Scaffold-ETH 2 extension comes pre-configured with [OnchainKit](https://onchainkit.xyz/), providing an example to help you get started quickly. Follow the steps below to set up and start using the extension.

## Installation

1. Create a new project with OnchainKit extension:

```bash
npx create-eth@latest -e onchainkit
```

2. Configure environment variables:

Create the file `packages/nextjs/.env.local` and copy the contents of `packages/nextjs/.env.example` into it.

3. Get your OnchainKit API Key:

Visit the Coinbase Developer portal to get your Api Key: https://portal.cdp.coinbase.com/products/onchainkit and add it to `packages/nextjs/.env.local`

> **Note:** Make sure to get the API key from the Onchain Tools --> OnchainKit page

## Documentation

For more detailed information and usage visit: https://onchainkit.xyz/getting-started

## Notes

- Supported chains: 10, 8453, 84532 (OP Mainnet, Base Mainnet, Base Sepolia)
- Some components works only on Base Mainnet

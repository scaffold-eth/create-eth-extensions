# Onchainkit extension

This Scaffold-ETH 2 extension comes pre-configured with [onchainkit](https://onchainkit.xyz/), providing an example to help you get started quickly.

## Installation

```bash
npx create-eth@latest -e onchainkit
```

Create the file `packages/nextjs/env.local` and copy the contents of `packages/nextjs/env.example` into it.

Get OnchainKit Api Key: https://portal.cdp.coinbase.com/products/onchainkit and add it to `packages/nextjs/env.local`

### Documentation

https://onchainkit.xyz/getting-started

### Notes

- Supported chains: 10, 8453, 84532 (OP Mainnet, Base Mainnet, Base Sepolia).
- Some components works only on Base Mainnet

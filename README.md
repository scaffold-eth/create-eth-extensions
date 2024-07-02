# Onchainkit extension

This extension provides an example implementation of EIP-712, allowing you to send, sign, and verify typed messages in a user-friendly manner.

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

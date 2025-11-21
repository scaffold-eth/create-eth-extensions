# x402 (Scaffold-ETH 2 extension)

This x402 extension demonstrate how to use the x402 protocol to monetize your APIs and pages with micropayments.

It includes:

- NextJS middleware configuration to gate access to protected routes
  - A protected page that requires a payment to access
  - A protected API route that requires a payment to access
- A script to send a request to the protected API route

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v20.18.3)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

1. Install the extension with

```
npx create-eth@latest -e x402
```

2. Go to the destination directory and start the frontend:

```
yarn start
```

Visit your app on: `http://localhost:3000`.

You can run the script to send a request to the protected API route with:

```
yarn send402request
```

This will send a request to the protected API route and you will see the response in the console. You'll need to have a wallet with funds ([faucet](https://faucet.circle.com/)) on the network you're using (default is baseSepolia).

## Configuration

You can configure the extension by editing the `.env` file.

```
NEXT_PUBLIC_FACILITATOR_URL=
RESOURCE_WALLET_ADDRESS=
NETWORK=
```

# Envio Indexer Extension for Scaffold-ETH 2

This extension integrates Envio Indexer with Scaffold-ETH 2, it makes indexing your deployed smart contracts as simple as possible. Generate a boilerplate indexer for your deployed contracts with a single click and start indexing their events immediately and allow you to query their data through a GraphQL API.

## Installation

```bash
npx create-eth@latest -e envio
```

## 🚀 Quick Start

### Prerequisites

- **[Node.js v20](https://nodejs.org/en/download/current)** _(v20 or newer required)_
- **[pnpm](https://pnpm.io/installation)** _(for Envio indexer)_
- **[Docker Desktop](https://www.docker.com/products/docker-desktop/)** _(required to run the Envio indexer locally)_
- **[Yarn](https://yarnpkg.com/getting-started/install)** _(for Scaffold-ETH)_

### Step 1: Start the Local Blockchain

```bash
cd your-project-name
yarn chain
```

This will start a local blockchain node for development.

### Step 2: Deploy Your Contracts

In a new terminal window, navigate to your project directory and deploy the default smart contracts:

```bash
cd your-project-name
yarn deploy
```

This will deploy the default contracts to the local blockchain. This step is optional and can also be done once you've created your own smart contracts and deployed them using `yarn deploy`.

### Step 3: Start Scaffold-ETH Frontend

From your project directory, start the Scaffold-ETH frontend:

```bash
yarn start
```

This will start the Scaffold-ETH frontend at `http://localhost:3000`.

### Step 4: Generate the Indexer

Navigate to the Envio page in your Scaffold-ETH frontend at `http://localhost:3000/envio` and click the **"Generate"** button. This should only be done once you've created a smart contract and ran `yarn deploy`. This will create the boilerplate indexer from your deployed contracts.

The Envio page also includes a helpful "How to Use" section with step-by-step instructions.

### Step 5: Start the Indexer

To start the indexer:

```bash
cd packages/envio
pnpm dev
```

This will begin indexing your contract events.

## Regenerating the Indexer

When you deploy new contracts or make changes to existing ones, you'll need to regenerate the indexer:


### Via Frontend Dashboard
1. Go to the Envio page at `http://localhost:3000/envio`
2. Click "Generate" to regenerate the boilerplate indexer

### Via Command Line
```bash
cd packages/envio
pnpm update
pnpm codegen
```

## 🔧 Available Commands

> **Note:** These commands are for the Envio indexer within the Scaffold-ETH project and must be run from the `packages/envio` folder.

```bash
cd packages/envio

pnpm update   # Generate indexer from deployed contracts
pnpm codegen  # Generate TypeScript types
pnpm dev      # Start indexer in development mode
pnpm start    # Start indexer in production mode
pnpm test     # Run indexer tests
```

---

For more information about Envio, visit the [official documentation](https://docs.envio.dev).

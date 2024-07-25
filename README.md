# 🔌 create-eth Extensions

This repository holds all the BG curated extensions for [create-eth](https://github.com/scaffold-eth/create-eth), so you can extend the functionality of your Scaffold-ETH project.

## Usage

You can install any of the extensions in this repository by running the following command:

```bash
npx create-eth@latest -e <extension-name>
```

## Available Extensions

- [subgraph](https://github.com/scaffold-eth/create-eth-extensions/tree/subgraph): This Scaffold-ETH 2 extension helps you build and test subgraphs locally for your contracts. It also enables interaction with the front-end and facilitates easy deployment to Subgraph Studio.
- [eip-712](https://github.com/scaffold-eth/create-eth-extensions/tree/eip-712): An implementation of EIP-712, allowing you to send, sign, and verify typed messages in a user-friendly manner.
- [ponder](https://github.com/scaffold-eth/create-eth-extensions/tree/ponder): This Scaffold-ETH 2 extension comes pre-configured with [ponder.sh](https://ponder.sh), providing an example to help you get started quickly.

## Create your own extension

You can extend Scaffold-ETH by creating your own extension. To do so, you need to create a new repository with the following structure:

`ToDo`

```bash
npx create-eth@latest -e your-github-username/your-extension-repository:branch-name # branch-name is optional
```

export const preContent = `
import { sayHelloTask } from "./tasks/index.js"

// Custom variables
// const CUSTOM_API_KEY = process.env.CUSTOM_API_KEY;
`;

export const configOverrides = {
  solidity: {
    compilers: [
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            // https://docs.soliditylang.org/en/latest/using-the-compiler.html#optimizer-options
            runs: 200,
          },
        },
      },
    ],
  },
  // In Hardhat v3, custom block explorers are declared per-chain via top-level
  // `chainDescriptors` (keyed by chainId), not a per-network `verify` block.
  // The Etherscan API key stays at the top level (base config's `verify.etherscan.apiKey`).
  // `hardhat verify` resolves the explorer by the live network's chainId.
  chainDescriptors: {
    99999: {
      name: "Custom Network",
      blockExplorers: {
        etherscan: {
          name: "Custom Explorer",
          url: "https://custom-explorer.io",
          apiUrl: "https://api.custom-explorer.io",
        },
      },
    },
  },
  networks: {
    hardhat: {
      forking: {
        blockNumber: 1234567
      }
    },
    customNetwork: {
      type: "http",
      url: "https://custom.network",
      accounts: ["$$deployerPrivateKey$$"],
      chainId: 99999,
    }
  },
  // Append the extension's task to the base `deployTasks` array.
  tasks: "$$[...deployTasks, sayHelloTask]$$",
};

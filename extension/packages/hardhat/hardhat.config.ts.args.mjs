export const preConfigContent = `
import "./tasks"

// Custom variables
const CUSTOM_API_KEY = process.env.CUSTOM_API_KEY;
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
  networks: {
    hardhat: {
      forking: {
        blockNumber: 1234567
      }
    },
    customNetwork: {
      url: "https://custom.network",
      accounts: ["$$deployerPrivateKey$$"],
      blah: `test \${CUSTOM_API_KEY}`,
      verify: {
        etherscan: {
          apiUrl: "https://api.custom-explorer.io",
          apiKey: "$$etherscanApiKey$$",
        }
      }
    }
  },
};

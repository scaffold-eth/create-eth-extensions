export const imports = 'import "./tasks"';
export const solidityVersion = "0.8.20";
export const networks = `myFakeNetwork: {
      url: \`https://my-fake-network.alchemyapi.io/v2/\${providerApiKey}\`,
      accounts: [deployerPrivateKey],
    },
    myFakeNetwork2: {
      url: \`https://my-fake-network2.alchemyapi.io/v2/\${providerApiKey}\`,
      accounts: [deployerPrivateKey],
    }`;
export const compilers = [{
  version: "0.8.20",
  settings: {
    optimizer: {
      enabled: true,
      // https://docs.soliditylang.org/en/latest/using-the-compiler.html#optimizer-options
      runs: 200,
    },
  }
}];

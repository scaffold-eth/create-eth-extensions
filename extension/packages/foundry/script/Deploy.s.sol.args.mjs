export const deploymentsScriptsImports = `import { DeployEIP5792ExampleContract } from "./DeployEIP5792ExampleContract.sol";`;
export const deploymentsLogic = `
    DeployEIP5792ExampleContract deployEIP5792ExampleContract = new DeployEIP5792ExampleContract();
    deployEIP5792ExampleContract.run();
`;

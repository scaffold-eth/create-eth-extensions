export const deploymentsScriptsImports = `import { DeployRandomGenerator } from "./DeployRandomGenerator.s.sol";`;
export const deploymentsLogic = `
    DeployRandomGenerator deployRandomGenerator = new DeployRandomGenerator();
    deployRandomGenerator.run();
`;
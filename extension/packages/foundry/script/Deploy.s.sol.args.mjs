export const deploymentsScriptsImports = `import { DeploySE2Token } from "./DeploySE2Token.s.sol";`;
export const deploymentsLogic = `
    DeploySE2Token deploySE2Token = new DeploySE2Token();
    deploySE2Token.run();
`;

export const deploymentsScriptsImports = `import "../contracts/SE2Token.sol";`;
export const deploymentsLogic = `

    vm.startBroadcast(deployerPrivateKey);

    SE2Token se2Token = new SE2Token();
    console.logString(string.concat("SE2Token deployed at: ", vm.toString(address(se2Token))));

    vm.stopBroadcast();

`;
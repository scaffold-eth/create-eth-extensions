export const deploymentsScriptsImports = `import "../contracts/EIP5792_Example.sol";`;
export const deploymentsLogic = `

    vm.startBroadcast(deployerPrivateKey);

    EIP5792_Example eip5792Example= new EIP5792_Example();
    console.logString(string.concat("EIP5792_Example deployed at: ", vm.toString(address(eip5792Example))));

    vm.stopBroadcast();

`;

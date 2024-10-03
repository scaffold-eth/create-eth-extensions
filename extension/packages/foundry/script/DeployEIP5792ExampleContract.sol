//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../contracts/EIP5792_Example.sol";
import "./DeployHelpers.s.sol";

contract DeployEIP5792ExampleContract is ScaffoldETHDeploy {
  function run() external ScaffoldEthDeployerRunner {
    EIP5792_Example eip5792Example = new EIP5792_Example();
    console.logString(
      string.concat(
        "DeployEIP5792ExampleContract deployed at: ",
        vm.toString(address(eip5792Example))
      )
    );
  }
}

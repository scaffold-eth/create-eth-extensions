//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../contracts/RandomGenerator.sol";
import "./DeployHelpers.s.sol";

contract DeployRandomGenerator is ScaffoldETHDeploy {
  function run() external ScaffoldEthDeployerRunner {
    RandomGenerator randomGenerator = new RandomGenerator();
    console.logString(string.concat("RandomGenerator deployed at: ", vm.toString(address(randomGenerator))));
  }
}

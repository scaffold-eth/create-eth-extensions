//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../contracts/SE2Token.sol";
import "./DeployHelpers.s.sol";

contract DeploySE2Token is ScaffoldETHDeploy {
    function run() external ScaffoldEthDeployerRunner {
        SE2Token se2Token = new SE2Token();
        console.logString(string.concat("SE2Token deployed at: ", vm.toString(address(se2Token))));
    }
}

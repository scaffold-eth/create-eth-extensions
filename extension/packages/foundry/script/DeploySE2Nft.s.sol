//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../contracts/SE2NFT.sol";
import "./DeployHelpers.s.sol";

contract DeploySE2Nft is ScaffoldETHDeploy {
  function run() external ScaffoldEthDeployerRunner {
    SE2NFT se2Nft = new SE2NFT();
    console.logString(
      string.concat("SE2NFT deployed at: ", vm.toString(address(se2Nft)))
    );
  }
}

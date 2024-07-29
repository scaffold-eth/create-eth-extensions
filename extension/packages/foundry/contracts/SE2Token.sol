//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SE2Token is ERC20 {
  constructor() ERC20("SE2Token", "SE2") {
    _mint(msg.sender, 1000 ether);
  }
}

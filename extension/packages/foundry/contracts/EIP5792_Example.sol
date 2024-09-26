//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

/**
 * A smart contract that helps demostrate the EIP-5792 capeabilities
 * It has state variables and setter functions that can be called in once transcation
 * @author BuidlGuidl
 */
contract EIP5792_Example {
	string public greeting = "Building Unstoppable Apps!!!";
	bool public premium = false;
	uint256 public totalCounter = 0;

	function setGreeting(string memory _newGreeting) public payable {
		greeting = _newGreeting;
	}

	function increaseCounter() public {
		totalCounter += 1;
	}

	receive() external payable {}
}

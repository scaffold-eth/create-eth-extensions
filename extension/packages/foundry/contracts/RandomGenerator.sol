//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./RLPReader.sol";

contract RandomGenerator {
  using RLPReader for RLPReader.RLPItem;
  using RLPReader for bytes;

  uint256 public constant futureBlocks = 2;

  uint256 public blockNumber;
  uint256 public randomNumber;

  function generateRandomNumber() public {
    blockNumber = block.number;
  }

  function getRandomNumber(bytes memory rlpBytes) public {
    require(block.number >= blockNumber + futureBlocks, "Future block not reached");
    require(block.number < blockNumber + futureBlocks + 256, "You miss the window");

    RLPReader.RLPItem[] memory ls = rlpBytes.toRlpItem().toList();

    bytes memory mixHash = ls[13].toBytes();

    uint256 blockNumberFromHeader = ls[8].toUint();

    require(blockNumberFromHeader == blockNumber + futureBlocks, "Wrong block");

    require(blockhash(blockNumberFromHeader) == keccak256(rlpBytes), "Wrong block header");

    bytes32 hash = keccak256(abi.encodePacked(mixHash, address(this), msg.sender));
    randomNumber = uint256(hash);
  }
}

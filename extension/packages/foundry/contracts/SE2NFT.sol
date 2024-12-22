// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract SE2NFT is ERC721Enumerable {
  uint256 public tokenIdCounter;
  mapping(uint256 tokenId => string) public tokenURIs;
  string[] public uris = [
    "QmVHi3c4qkZcH3cJynzDXRm5n7dzc9R9TUtUcfnWQvhdcw", // Zebra
    "QmfVMAmNM1kDEBYrC2TPzQDoCRFH6F5tE1e9Mr4FkkR5Xr", // Buffalo
    "QmcvcUaKf6JyCXhLD1by6hJXNruPQGs3kkLg2W1xr7nF1j" // Rhino
  ];

  constructor() ERC721("SE2-ERC721-NFT", "SE2NFT") { }

  function _baseURI() internal pure override returns (string memory) {
    return "https://ipfs.io/ipfs/";
  }

  function mintItem(
    address to
  ) public returns (uint256) {
    tokenIdCounter++;
    _safeMint(to, tokenIdCounter);

    bytes32 predictableRandom = keccak256(
      abi.encodePacked(
        tokenIdCounter, blockhash(block.number - 1), msg.sender, address(this)
      )
    );

    tokenURIs[tokenIdCounter] = uris[uint256(predictableRandom) % uris.length];
    return tokenIdCounter;
  }

  function tokenURI(
    uint256 tokenId
  ) public view override returns (string memory) {
    _requireOwned(tokenId);

    string memory _tokenURI = tokenURIs[tokenId];
    string memory base = _baseURI();

    return string.concat(base, _tokenURI);
  }
}

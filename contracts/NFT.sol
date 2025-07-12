// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ArenaCollectibleNFT is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;

    constructor() ERC721("ArenaCollectibleNFT", "ACNFT") Ownable(msg.sender) {}

    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function mint(address to, string memory uri) public payable {
        require(msg.value == 1 ether, "Minting requires exactly 1 CHZ");
        _safeMint(to, nextTokenId);
        _setTokenURI(nextTokenId, uri);
        nextTokenId++;
    }
}

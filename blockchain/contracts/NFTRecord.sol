// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract NFTRecord is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;
    IERC20 private _token;
    mapping(uint256 => uint256) private _tokenValues;
    uint256 public totalAssignedValue;

    constructor(address initialOwner, address tokenAddress)
        ERC721("NFTRecord", "NFTR")
        Ownable(initialOwner)
    {
        _token = IERC20(tokenAddress);
    }

    function mint(address to, string memory uri, uint256 tokenAmount) external onlyOwner {
        require(_token.balanceOf(msg.sender) >= tokenAmount, "Insufficient balance");
        require(_token.transferFrom(msg.sender, address(this), tokenAmount), "Transfer failed");

        uint256 tokenId = _nextTokenId++;
        _mint(to, tokenId);
        _setTokenURI(tokenId, uri);

        _tokenValues[tokenId] = tokenAmount;
        totalAssignedValue += tokenAmount;
    }

function getTokenValue(uint256 tokenId) external view returns (uint256) {
    require(ownerOf(tokenId) != address(0), "Nonexistent token");
    return _tokenValues[tokenId];
}



    function getNextTokenId() external view returns (uint256) {
        return _nextTokenId;
    }
}
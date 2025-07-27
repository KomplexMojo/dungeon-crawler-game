// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenValue is ERC20, Ownable {
    address public nftContract;

    constructor(uint256 initialSupply, address initialOwner)
        ERC20("TokenValue", "TVL")
        Ownable(initialOwner)
    {
        _mint(initialOwner, initialSupply);
    }

    function setNFTContract(address _nftContract) external onlyOwner {
        nftContract = _nftContract;
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external onlyOwner {
        _burn(from, amount);
    }

function _update(address from, address to, uint256 amount)
    internal
    override
{
    if (from == nftContract && from != address(0)) {
        revert("Tokens locked and non-transferable");
    }
    super._update(from, to, amount);
}
}
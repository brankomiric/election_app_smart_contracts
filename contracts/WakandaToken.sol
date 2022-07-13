//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract WakandaToken is ERC20 {
    mapping(address => bool) tokenHolders;

    constructor() ERC20("Wakanda Token", "WKND") {
        // Mint 6 million on deploy
        _mint(address(this), 6000000 * (10**18));
    }

    function getOneToken(address to) external {
        require(!tokenHolders[to], "Only 1 token per address allowed");
        tokenHolders[to] = true;
        this.transfer(to, 1 * (10**18));
    }
}

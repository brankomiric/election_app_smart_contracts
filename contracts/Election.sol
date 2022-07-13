//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Election {
    mapping(address => uint256) votes;
    mapping(address => bool) voters;
    uint256 electeeCount;

    constructor(uint256 electees) {
        electeeCount = electees;
    }

    function vote(address candidate) external {
        require(!voters[msg.sender], "You're allowed to a single vote");

        votes[candidate] += 1;
        voters[msg.sender] = true;
    }
}

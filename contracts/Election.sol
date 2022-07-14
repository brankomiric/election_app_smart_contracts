//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

struct Electee {
    address electeeAddr;
    uint256 score;
}

contract Election {
    mapping(address => uint256) private votes;
    mapping(address => bool) private voters;
    address[] private electeeAddresses;

    function vote(address candidate) external {
        require(!voters[msg.sender], "You're allowed to a single vote");

        votes[candidate] += 1;
        voters[msg.sender] = true;

        if (!isIn(electeeAddresses, candidate)) {
            electeeAddresses.push(candidate);
        }
    }

    function getScoreboard() external view returns (Electee[] memory) {
        Electee[] memory scoreboard = new Electee[](electeeAddresses.length);
        for (uint256 i = 0; i < electeeAddresses.length; i++) {
            Electee memory e = Electee({
                electeeAddr: electeeAddresses[i],
                score: votes[electeeAddresses[i]]
            });
            scoreboard[i] = e;
        }
        return scoreboard;
    }

    function isIn(address[] memory list, address a)
        private
        pure
        returns (bool)
    {
        for (uint256 i = 0; i < list.length; i++) {
            if (list[i] == a) {
                return true;
            }
        }
        return false;
    }
}

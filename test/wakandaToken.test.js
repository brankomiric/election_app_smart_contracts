const { expect } = require("chai");
const { ethers } = require("hardhat");
const { utils, Contract } = require("ethers");

const abi = [
  "function getOneToken(address to)",
  "function balanceOf(address _owner) public view returns (uint256 balance)",
];

describe("TestERC20Token", function () {
  it("Should return correct total supply", async function () {
    const Contract = await ethers.getContractFactory("WakandaToken");
    const contract = await Contract.deploy();
    await contract.deployed();

    const totalSupply = await contract.totalSupply();
    expect(+utils.formatUnits(totalSupply, "ether")).to.equal(6000000);
  });

  it("Should get one token", async function () {
    const Token = await ethers.getContractFactory("WakandaToken");
    const token = await Token.deploy();
    await token.deployed();

    const signers = await ethers.getSigners();

    const contract = new Contract(token.address, abi, signers[1]);
    const tx = await contract.getOneToken(signers[1].address, {
      gasLimit: 200000,
    });
    await tx.wait(1);

    const balance = await contract.balanceOf(signers[1].address);

    // Expect to have 1 Token
    expect(balance).to.equal(utils.parseEther("1"));
  });

  it("Should fail to get one token when already having one", async function () {
    const Token = await ethers.getContractFactory("WakandaToken");
    const token = await Token.deploy();
    await token.deployed();

    const signers = await ethers.getSigners();

    const contract = new Contract(token.address, abi, signers[1]);
    const tx = await contract.getOneToken(signers[1].address, {
      gasLimit: 200000,
    });
    await tx.wait(1);

    await expect(
      contract.getOneToken(signers[1].address, {
        gasLimit: 200000,
      })
    ).rejectedWith("Only 1 token per address allowed");
  });
});

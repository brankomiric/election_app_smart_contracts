const { expect } = require("chai");
const { ethers } = require("hardhat");
const { utils, Contract } = require("ethers");

const abi = [
  "function vote(address candidate)",
  "function getScoreboard() view returns (tuple(address electeeAddr, uint256 score)[] electees)"
];

describe("Election", async () => {
  it("Should be possible to vote once", async () => {
    const contractAddr = await deployContract();

    const signers = await ethers.getSigners();

    const contract = await initContract(signers[1], contractAddr);

    const tx = await contract.vote(signers[5].address);
    await tx.wait(1);
  });

  it("Should throw error if voting more than once", async () => {
    const contractAddr = await deployContract();

    const signers = await ethers.getSigners();

    const contract = await initContract(signers[1], contractAddr);

    let tx = await contract.vote(signers[5].address);
    await tx.wait(1);

    await expect(
      contract.vote(signers[5].address, { gasLimit: 200000 })
    ).rejectedWith("You're allowed to a single vote");
  });

  it("Should return the scoreboard", async() => {
    const contractAddr = await deployContract();

    const signers = await ethers.getSigners();

    const contractInstance1 = await initContract(signers[1], contractAddr);

    // Vote for signers[5]
    let tx = await contractInstance1.vote(signers[5].address, { gasLimit: 200000 });
    await tx.wait(1);

    const contractInstance2 = await initContract(signers[2], contractAddr);

    // Vote for signers[6]
    tx = await contractInstance2.vote(signers[6].address, { gasLimit: 200000 });
    await tx.wait(1);

    const contractInstance3 = await initContract(signers[3], contractAddr);

    // Another vote for signers[5]
    tx = await contractInstance3.vote(signers[5].address, { gasLimit: 200000 });
    await tx.wait(1);

    const scoreboard = await contractInstance1.getScoreboard();

    // Address signers[5] should have 2 votes
    expect(scoreboard[0].electeeAddr).to.eq(signers[5].address);
    expect(scoreboard[0].score.toString()).to.eq("2");

    // Address signers[6] should have 1 vote
    expect(scoreboard[1].electeeAddr).to.eq(signers[6].address);
    expect(scoreboard[1].score.toString()).to.eq("1");

  });
});

const deployContract = async () => {
  const Contract = await ethers.getContractFactory("Election");
  const contract = await Contract.deploy();
  await contract.deployed();
  return contract.address;
};

const initContract = async (signer, address) => {
  return new Contract(address, abi, signer);
};

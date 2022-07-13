const { expect } = require("chai");
const { ethers } = require("hardhat");
const { utils, Contract } = require("ethers");

const abi = [
  "function vote(address candidate)",
];

const electeesCount = 10;

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
});

const deployContract = async () => {
  const Contract = await ethers.getContractFactory("Election");
  const contract = await Contract.deploy(electeesCount);
  await contract.deployed();
  return contract.address;
};

const initContract = async (signer, address) => {
  return new Contract(address, abi, signer);
};

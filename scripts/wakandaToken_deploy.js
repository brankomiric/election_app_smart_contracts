const hre = require("hardhat");
const { writeFile } = require("fs/promises");

async function main() {
  // We get the contract to deploy
  const Token = await hre.ethers.getContractFactory("WakandaToken");
  const token = await Token.deploy();

  if (process.env.HARDHAT_NETWORK == "localhost") {
    await token.deployed();
    await writeFile("./token_addr_localhost.txt", token.address);
  } else if (process.env.HARDHAT_NETWORK == "rinkeby") {
    await token.deployTransaction.wait(5);
    await writeFile("./token_addr_rinkeby.txt", token.address);

    // Verify Contract with Etherscan
    if (process.env.ETHERSCAN_API_KEY) {
      require("@nomiclabs/hardhat-etherscan");
      await hre.run("verify:verify", {
        address: token.address,
        constructorArguments: [],
      });
    }
  }

  console.log("Token deployed to:", token.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

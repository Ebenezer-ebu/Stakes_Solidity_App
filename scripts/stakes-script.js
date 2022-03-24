const { ethers } = require("hardhat");

async function main() {
  const Stakes = await ethers.getContractFactory("Stakes");
  const stakes = await Stakes.deploy(1000);

  await stakes.deployed();

  console.log("Stakes deployed to:", stakes.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

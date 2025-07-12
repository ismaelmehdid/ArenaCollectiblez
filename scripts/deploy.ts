import hardhat from 'hardhat';

const { ethers } = hardhat;

async function main() {
  const ContractFactory = await ethers.getContractFactory(
    'ArenaCollectibleNFT',
  );
  const contract = await ContractFactory.deploy();
  await contract.waitForDeployment();
  console.log(`Contract deployed to: ${contract.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

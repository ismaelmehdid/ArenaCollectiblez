import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('MyNFT', () => {
  let myNFT: any;
  let owner: any;
  let addr1: any;

  beforeEach(async () => {
    [owner, addr1] = await ethers.getSigners();
    const NFTFactory = await ethers.getContractFactory('MyNFT');
    myNFT = await NFTFactory.deploy();
    await myNFT.waitForDeployment();
  });

  it('should have correct name and symbol', async () => {
    expect(await myNFT.name()).to.equal('MyNFT');
    expect(await myNFT.symbol()).to.equal('MNFT');
  });

  it('should mint NFTs correctly', async () => {
    await myNFT.mint(addr1.address);
    expect(await myNFT.ownerOf(0)).to.equal(addr1.address);
    expect(await myNFT.nextTokenId()).to.equal(1);
  });

  it('should increment tokenId after each mint', async () => {
    await myNFT.mint(owner.address);
    await myNFT.mint(addr1.address);
    expect(await myNFT.nextTokenId()).to.equal(2);
  });
});

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token Contract", () => {
  it("Deployment should assign the total supply of tokens to the owner", async () => {
    const [owner] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Token"); // instance Contract created

    const hardhatToken = await Token.deploy(); // deploy contract

    const ownerBalance = await hardhatToken.balanceOf(owner.address); // Owners balance

    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance); // total supply = 10000
  });

  it("Should transfer tokens between accounts", async () => {
    const [owner, addr1, addr2] = await ethers.getSigners();
    console.log(await ethers.getSigners());

    const Token = await ethers.getContractFactory("Token"); // instance Contract created

    const hardhatToken = await Token.deploy(); // deploy contract

    //transfer 10 tokens from owner to addr1
    await hardhatToken.transfer(addr1.address, 10);
    expect(await hardhatToken.balanceOf(addr1.address)).to.equal(10);

    // transfer 5 tokens from adr1 to addr2
    await hardhatToken.connect(addr1).transfer(addr2.address, 5);
    expect(await hardhatToken.balanceOf(addr1.address)).to.equal(5);
  });
});

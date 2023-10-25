const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token Contract", () => {
  it("Deployment should assign the total supply of tokens to the owner", async () => {
    const [owner] = await ethers.getSigners();
    console.log(owner);
    const Token = await ethers.getContractFactory("Token"); // instance Contract created

    const hardhatToken = await Token.deploy(); // deploy contract

    const ownerBalance = await hardhatToken.balanceOf(owner.address); // Owners balance
    console.log(ownerBalance);

    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance); // total supply = 10000
  });
});

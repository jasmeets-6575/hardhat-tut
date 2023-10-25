const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token Contract", () => {
  let Token;
  let hardhatToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    Token = await ethers.getContractFactory("Token");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    hardhatToken = await Token.deploy();
  });

  describe("Deployment", () => {
    it("Should set the right owner", async () => {
      expect(await hardhatToken.owner()).to.equal(owner.address);
    });
    it("Should assign the total supply of tokens to the owner", async () => {
      const ownerBalance = await hardhatToken.balanceOf(owner.address);
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("transactions", () => {
    it("should transfer tokens between accounts", async () => {
      // owner account to addr1.address
      await hardhatToken.transfer(addr1.address, 10);
      const addr1Balance = await hardhatToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(10);

      await hardhatToken.connect(addr1).transfer(addr2.address, 5);
      const addr2Balance = await hardhatToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(5);
    });

    it("Should fall if sender does not have enough tokens", async () => {
      const initialbalance = await hardhatToken.balanceOf(owner.address);
      await expect(
        hardhatToken.connect(addr1).transfer(addr2.address, 1)
      ).to.be.revertedWith("Not enough tokens");
      expect(await hardhatToken.balanceOf(owner.address)).to.equal(
        initialbalance
      );
    });
  });
});

//   it("Deployment should assign the total supply of tokens to the owner", async () => {
//     const [owner] = await ethers.getSigners();
//     const Token = await ethers.getContractFactory("Token"); // instance Contract created
//     const hardhatToken = await Token.deploy(); // deploy contract
//     const ownerBalance = await hardhatToken.balanceOf(owner.address); // Owners balance
//     expect(await hardhatToken.totalSupply()).to.equal(ownerBalance); // total supply = 10000
//   });

//   it("Should transfer tokens between accounts", async () => {
//     const [owner, addr1, addr2] = await ethers.getSigners();
//     console.log(await ethers.getSigners());
//     const Token = await ethers.getContractFactory("Token"); // instance Contract created
//     const hardhatToken = await Token.deploy(); // deploy contract
//     //transfer 10 tokens from owner to addr1
//     await hardhatToken.transfer(addr1.address, 10);
//     expect(await hardhatToken.balanceOf(addr1.address)).to.equal(10);
//     // transfer 5 tokens from adr1 to addr2
//     await hardhatToken.connect(addr1).transfer(addr2.address, 5);
//     expect(await hardhatToken.balanceOf(addr1.address)).to.equal(5);
//   });

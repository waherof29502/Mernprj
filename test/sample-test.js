const { expect } = require('chai');
const { ethers } = require('hardhat');

// describe("Greeter", function () {
//   it("Should return the new greeting once it's changed", async function () {
//     const Greeter = await ethers.getContractFactory("Greeter");
//     const greeter = await Greeter.deploy("Hello, world!");
//     await greeter.deployed();

//     expect(await greeter.greet()).to.equal("Hello, world!");

//     const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

//     // wait until the transaction is mined
//     await setGreetingTx.wait();

//     expect(await greeter.greet()).to.equal("Hola, mundo!");
//   });
// });

describe('MyNFT', function () {
  it('Should mint and transfer an NFT to someone', async function () {
    const FiredGuys = await ethers.getContractFactory('FiredGuys');
    const firedguys = await FiredGuys.deploy();
    await firedguys.deployed();

    const recipient = '0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199';
    const metadataURI = 'cid/test.png';

    let balance = await firedguys.balanceOf(recipient);
    expect(balance).to.equal(0);

    const newlyMintedToken = await firedguys.payToMint(recipient, metadataURI, {
      value: ethers.utils.parseEther('0.01'),
    });

    //wait until the transaction is mined
    await newlyMintedToken.wait();

    balance = await firedguys.balanceOf(recipient);
    expect(balance).to.equal(1);
    expect(await firedguys.isContentOwned(metadataURI)).to.equal(true);
  });
});

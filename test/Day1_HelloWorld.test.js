const { expect } = require("chai");

describe("HelloWorld (Day 1)", function () {
  let hello;

  beforeEach(async function () {
    const HelloWorld = await ethers.getContractFactory("HelloWorld");
    hello = await HelloWorld.deploy();
    await hello.waitForDeployment();
  });

  it("has the correct initial message", async function () {
    const msg = await hello.getMessage();
    expect(msg).to.equal("Hello, Solidity Day 1!");
  });

  it("updates the message correctly", async function () {
    await hello.updateMessage("Test passed!");
    const msg = await hello.getMessage();
    expect(msg).to.equal("Test passed!");
  });

  it("greets with the given name", async function () {
    const greeting = await hello.greet("Rishi");
    expect(greeting).to.equal("Hello Rishi from Day 1!");
  });
});

const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying Day 2 Counter...");

  const Counter = await hre.ethers.getContractFactory("Counter");
  const counter = await Counter.deploy(0); // start at 0
  await counter.waitForDeployment();

  const addr = await counter.getAddress();
  console.log("✅ Counter deployed at:", addr);

  let current = await counter.getCount();
  console.log("📄 Current count:", current.toString());

  const tx1 = await counter.increment();
  await tx1.wait();
  current = await counter.getCount();
  console.log("📦 After 1 increment:", current.toString());

  const tx2 = await counter.decrement();
  await tx2.wait();
  current = await counter.getCount();
  console.log("🛒 After 1 decrement:", current.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

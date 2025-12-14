const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying Day1 HelloWorld...");

  // Get the contract factory (compiled from Day1_HelloWorld.sol)
  const HelloWorld = await hre.ethers.getContractFactory("HelloWorld");

  // Deploy the contract
  const hello = await HelloWorld.deploy();
  await hello.waitForDeployment();

  const address = await hello.getAddress();
  console.log("✅ HelloWorld deployed to:", address);

  // Read initial message
  const initial = await hello.getMessage();
  console.log("📄 Initial message:", initial);

  // Update message
  const tx = await hello.updateMessage("Day 1 Complete!");
  await tx.wait();

  const finalMsg = await hello.getMessage();
  console.log("📄 Final message:", finalMsg);

  console.log("🎉 Day 1 deployment script finished.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

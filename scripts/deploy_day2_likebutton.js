const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying Day 2 LikeButton...");

  const LikeButton = await hre.ethers.getContractFactory("LikeButton");
  const likeButton = await LikeButton.deploy();
  await likeButton.waitForDeployment();

  const addr = await likeButton.getAddress();
  console.log("✅ LikeButton deployed at:", addr);

  const [user1, user2] = await hre.ethers.getSigners();

  let tx = await likeButton.connect(user1).like();
  await tx.wait();
  console.log(
    "👍 User1 liked. Total likes:",
    (await likeButton.totalLikes()).toString()
  );

  tx = await likeButton.connect(user2).like();
  await tx.wait();
  console.log(
    "👍 User2 liked. Total likes:",
    (await likeButton.totalLikes()).toString()
  );

  console.log(
    "Has user1 liked?",
    await likeButton.hasUserLiked(user1.address)
  );
  console.log(
    "Has user2 liked?",
    await likeButton.hasUserLiked(user2.address)
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

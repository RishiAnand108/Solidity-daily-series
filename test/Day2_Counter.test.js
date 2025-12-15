const { expect } = require("chai");

describe("Day 2 - Counter", function () {
  let Counter, counter;

  beforeEach(async function () {
    Counter = await ethers.getContractFactory("Counter");
    counter = await Counter.deploy(5); // start with 5 items
    await counter.waitForDeployment();
  });

  it("starts with initial count", async function () {
    expect(await counter.getCount()).to.equal(5);
  });

  it("increments and decrements", async function () {
    await counter.increment();
    expect(await counter.getCount()).to.equal(6);

    await counter.decrement();
    expect(await counter.getCount()).to.equal(5);
  });

  it("does not go below zero", async function () {
    // new counter from 0
    counter = await Counter.deploy(0);
    await counter.waitForDeployment();

    await expect(counter.decrement()).to.be.revertedWith(
      "Counter: cannot go below zero"
    );
  });

  it("incrementBy validates input", async function () {
    await counter.incrementBy(10);
    expect(await counter.getCount()).to.equal(15);

    await expect(counter.incrementBy(0)).to.be.revertedWith(
      "Counter: amount must be > 0"
    );
  });

  it("previewNext works as pure function", async function () {
    expect(await counter.previewNext(10)).to.equal(11);
  });
});

describe("Day 2 - LikeButton", function () {
  let LikeButton, likeButton, user1, user2;

  beforeEach(async function () {
    [user1, user2] = await ethers.getSigners();
    LikeButton = await ethers.getContractFactory("LikeButton");
    likeButton = await LikeButton.deploy();
    await likeButton.waitForDeployment();
  });

  it("allows different users to like once each", async function () {
    await likeButton.connect(user1).like();
    await likeButton.connect(user2).like();

    expect(await likeButton.totalLikes()).to.equal(2);
    expect(await likeButton.hasUserLiked(user1.address)).to.equal(true);
    expect(await likeButton.hasUserLiked(user2.address)).to.equal(true);
  });

  it("prevents double like from same user", async function () {
    await likeButton.connect(user1).like();
    await expect(likeButton.connect(user1).like()).to.be.revertedWith(
      "Already liked"
    );
  });
});

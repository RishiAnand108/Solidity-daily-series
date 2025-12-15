// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title Simple like button (YouTube-style)
contract LikeButton {
    // Total likes on the video/post
    uint256 public totalLikes;

    // Has this address already liked?
    mapping(address => bool) public hasLiked;

    event Liked(address indexed user, uint256 newTotal);

    // User presses "Like"
    function like() public {
        require(!hasLiked[msg.sender], "Already liked");
        hasLiked[msg.sender] = true;
        totalLikes += 1;
        emit Liked(msg.sender, totalLikes);
    }

    // Check any user
    function hasUserLiked(address user) public view returns (bool) {
        return hasLiked[user];
    }
}

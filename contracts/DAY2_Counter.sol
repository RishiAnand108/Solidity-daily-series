// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title Simple counter for Day 2
/// @notice Like counting items in a kirana shop
contract Counter {
    // On-chain number: like "how many biscuit packets we have"
    uint256 public count;

    // Who opened the shop (deployed the contract)
    address public owner;

    // Log every change, like noting changes in the bahi-khata
    event CounterChanged(uint256 oldValue, uint256 newValue, address changedBy);

    // Start shop with some stock (e.g. 10 packets)
    constructor(uint256 _initialCount) {
        owner = msg.sender;
        count = _initialCount;
        emit CounterChanged(0, _initialCount, msg.sender);
    }

    // Just check current stock (free read)
    function getCount() public view returns (uint256) {
        return count;
    }

    // One new packet added (delivery came)
    function increment() public {
        uint256 old = count;
        count = count + 1;
        emit CounterChanged(old, count, msg.sender);
    }

    // One packet sold; cannot go below zero
    function decrement() public {
        require(count > 0, "Counter: cannot go below zero");
        uint256 old = count;
        count = count - 1;
        emit CounterChanged(old, count, msg.sender);
    }

    // Add custom number of packets (big delivery)
    function incrementBy(uint256 _amount) public {
        require(_amount > 0, "Counter: amount must be > 0");
        uint256 old = count;
        count = count + _amount;
        emit CounterChanged(old, count, msg.sender);
    }

    // Pure calculator: preview next count without changing anything
    function previewNext(uint256 _current) public pure returns (uint256) {
        return _current + 1;
    }
}

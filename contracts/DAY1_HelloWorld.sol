// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract HelloWorld {
    // Public state variable stored on-chain
    string public message;

    // Emitted whenever the message changes
    event MessageUpdated(string oldMessage, string newMessage);

    // Runs once at deployment
    constructor() {
        message = "Hello, Solidity Day 1!";
        emit MessageUpdated("", message);
    }

    // Read the current message (no gas when called off-chain)
    function getMessage() public view returns (string memory) {
        return message;
    }

    // Update the message (costs gas, writes to blockchain)
    function updateMessage(string memory _newMessage) public {
        emit MessageUpdated(message, _newMessage);
        message = _newMessage;
    }

    // Pure “hello” helper that doesn’t touch state
    function greet(string memory _name) public pure returns (string memory) {
        return string(abi.encodePacked("Hello ", _name, " from Day 1!"));
    }
}

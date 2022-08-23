// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.9.0;
pragma abicoder v2;

contract UserContract {
  string public name = 'User';
  uint256 public userCount = 0;

  mapping(uint256 => User) public users;

  struct User {
    uint256 id;
    string walletAddress;
    string displayName;
    string email;
    string role;
    string createdAt;
  }

  event UserCreated(
    uint256 id,
    string walletAddress,
    string displayName,
    string email,
    string role,
    string createdAt
  );

  function createUser(
    string memory _walletAddress,
    string memory _displayName,
    string memory _email,
    string memory _role,
    string memory _createdAt
  ) public {
    userCount++;

    users[userCount] = User(
      userCount,
      _walletAddress,
      _displayName,
      _email,
      _role,
      _createdAt
    );

    emit UserCreated(userCount, _walletAddress, _displayName, _email, _role, _createdAt);
  }
}

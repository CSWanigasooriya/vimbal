// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.9.0;
pragma abicoder v2;

contract UserContract {
  string public name = 'User';
  uint256 public userCount = 0;

  mapping(uint256 => User) public users;

  struct User {
    uint256 id;
    address payable walletAddress;
    string displayName;
    string email;
    string role;
    string createdAt;
  }

  event UserCreated(
    uint256 id,
    address payable walletAddress,
    string displayName,
    string email,
    string role,
    string createdAt
  );

  function createUser(
    string memory _displayName,
    string memory _email,
    string memory _role,
    string memory _createdAt
  ) public {
    userCount++;

    users[userCount] = User(
      userCount,
      payable(address(msg.sender)),
      _displayName,
      _email,
      _role,
      _createdAt
    );

    emit UserCreated(
      userCount,
      payable(address(msg.sender)),
      _displayName,
      _email,
      _role,
      _createdAt
    );
  }

  function tipUser(uint256 _id) public payable {
    // Make sure the id is valid
    require(userCount > 0, 'No users');
    // Fetch the file
    User memory _user = users[_id];
    // Fetch the owner
    address payable _author = _user.walletAddress;
    // Pay the author by sending them Ether
    _author.transfer(msg.value);
    // Increment the tip amount
    _user.id = userCount;
    // Update the file
    users[userCount] = _user;
    // Trigger an event
    emit UserCreated(
      userCount,
      payable(address(msg.sender)),
      _user.displayName,
      _user.email,
      _user.role,
      _user.createdAt
    );
  }
}

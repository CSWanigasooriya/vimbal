// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.9.0;
pragma abicoder v2;

contract UserContract {
  string public name = 'User';
  uint256 public userCount = 0;

  mapping(address => mapping(uint256 => User)) public users;

  struct User {
    uint256 id;
  }
}

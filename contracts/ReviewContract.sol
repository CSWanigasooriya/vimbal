// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.9.0;
pragma abicoder v2;

contract ReviewContract {
  string public name = 'Review';
  uint256 public reviewCount = 0;

  mapping(uint256 => mapping(uint256 => FileReview)) public reviews;
  mapping(address => mapping(uint256 => FileReview)) public reviewsByOwner;

  struct FileReview {
    uint256 id;
    string review;
    string rating;
    string createdAt;
    address payable owner;
  }

  event ReviewCreated(
    uint256 id,
    string review,
    string rating,
    string createdAt,
    address payable owner
  );

  function createReview(
    uint256 fileId,
    string memory review,
    string memory rating,
    string memory createdAt
  ) public {
    reviewCount++;

    reviews[fileId][reviewCount] = FileReview(
      reviewCount,
      review,
      rating,
      createdAt,
      payable(address(msg.sender))
    );

    reviewsByOwner[msg.sender][reviewCount] = FileReview(
      reviewCount,
      review,
      rating,
      createdAt,
      payable(address(msg.sender))
    );

    emit ReviewCreated(
      reviewCount,
      review,
      rating,
      createdAt,
      payable(address(msg.sender))
    );
  }

  function deleteReview(uint256 fileId, uint256 reviewId) public returns (bool) {
    delete reviews[fileId][reviewId];
    delete reviewsByOwner[msg.sender][reviewId];

    return true;
  }
}

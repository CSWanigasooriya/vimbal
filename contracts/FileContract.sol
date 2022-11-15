// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.9.0;
pragma abicoder v2;

contract FileContract {
  string public name = 'FileContract';

  uint256 public fileCount = 0;

  mapping(uint256 => File) public files;
  mapping(string => File) public filesByHash;
  mapping(address => mapping(uint256 => File)) public filesByOwner;

  struct File {
    uint256 id;
    string hash;
    string fileName;
    string title;
    string authors;
    string keywords;
    string description;
    uint256 tipAmount;
    string createdAt;
    address payable owner;
    bool isPublic;
  }

  event FileCreated(
    uint256 id,
    string hash,
    string fileName,
    string title,
    string authors,
    string keywords,
    string description,
    uint256 tipAmount,
    string createdAt,
    address payable owner,
    bool isPublic
  );

  event FileTipped(
    uint256 id,
    string hash,
    string fileName,
    string title,
    string authors,
    string keywords,
    string description,
    uint256 tipAmount,
    string createdAt,
    address payable owner,
    bool isPublic
  );

  function uploadFile(
    string memory _fileHash,
    string memory _fileName,
    string memory _title,
    string memory _authors,
    string memory _keywords,
    string memory _description,
    string memory _createdAt,
    bool _isPublic
  ) public {
    require(bytes(_fileHash).length > 0);
    require(bytes(_title).length > 0);
    require(bytes(_authors).length > 0);
    require(msg.sender != address(0x0));
    fileCount++;

    files[fileCount] = File(
      fileCount,
      _fileHash,
      _fileName,
      _title,
      _authors,
      _keywords,
      _description,
      0,
      _createdAt,
      payable(address(msg.sender)),
      _isPublic
    );

    filesByHash[_fileHash] = files[fileCount];
    filesByOwner[msg.sender][fileCount] = files[fileCount];

    emit FileCreated(
      fileCount,
      _fileHash,
      _fileName,
      _title,
      _authors,
      _keywords,
      _description,
      0,
      _createdAt,
      payable(address(msg.sender)),
      _isPublic
    );
  }

  function tipFileOwner(uint256 _id) public payable {
    require(_id > 0 && _id <= fileCount);

    File memory _file = files[_id];
    address payable _owner = _file.owner;
    _owner.transfer(msg.value);

    _file.tipAmount = _file.tipAmount + msg.value;
    files[_id] = _file;

    filesByHash[_file.hash] = files[fileCount];
    filesByOwner[msg.sender][fileCount] = files[fileCount];

    emit FileTipped(
      _id,
      _file.hash,
      _file.fileName,
      _file.title,
      _file.authors,
      _file.keywords,
      _file.description,
      _file.tipAmount,
      _file.createdAt,
      _file.owner,
      _file.isPublic
    );
  }

  function isFileOwned(string memory fileHash) public view returns (bool) {
    return fileCount > 0 && bytes(filesByHash[fileHash].hash).length > 0;
  }
}

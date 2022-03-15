// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.9.0;

contract Vimbal {
    string public name = 'Vimbal';

    uint256 public fileCount = 0;

    mapping(uint256 => File) public files;

    struct File {
        uint256 id;
        string hash;
        string description;
        uint256 tipAmount;
        uint256 timestamp;
        address payable author;
    }

    event FileCreated(
        uint256 id,
        string hash,
        string description,
        uint256 tipAmount,
        uint256 timestamp,
        address payable author
    );

    event FileTipped(
        uint256 id,
        string hash,
        string description,
        uint256 tipAmount,
        uint256 timestamp,
        address payable author
    );

    function uploadFile(string memory _fileHash, string memory _description)
        public
    {
        require(bytes(_fileHash).length > 0);
        require(bytes(_description).length > 0);
        require(msg.sender != address(0x0));
        fileCount++;

        files[fileCount] = File(
            fileCount,
            _fileHash,
            _description,
            0,
            block.timestamp,
            payable(address(msg.sender))
        );

        emit FileCreated(
            fileCount,
            _fileHash,
            _description,
            0,
            block.timestamp,
            payable(address(msg.sender))
        );
    }

    function tipFileOwner(uint256 _id) public payable {
        require(_id > 0 && _id <= fileCount);

        File memory _file = files[_id];
        address payable _author = _file.author;
        _author.transfer(msg.value);

        _file.tipAmount = _file.tipAmount + msg.value;
        files[_id] = _file;

        emit FileTipped(
            _id,
            _file.hash,
            _file.description,
            _file.tipAmount,
            _file.timestamp,
            _file.author
        );
    }
}

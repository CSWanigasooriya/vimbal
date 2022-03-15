const assert = require('assert');

const Vimbal = artifacts.require('Vimbal');

require('chai').use(require('chai-as-promised')).should();

contract('Vimbal', ([deployer, author, tipper]) => {
  let vimbal;

  before(async () => {
    vimbal = await Vimbal.deployed();
  });

  describe('deployment', () => {
    it('deploys successfully', async () => {
      const address = await vimbal.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, '');
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it('has a name', async () => {
      const name = await vimbal.name();
      assert.equal(name, 'Vimbal');
    });
  });

  describe('files', async () => {
    let result, fileCount;
    const hash =
      '0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad';

    before(async () => {
      result = await vimbal.uploadFile(hash, 'file description', {
        from: author,
      });
      fileCount = await vimbal.fileCount();
    });

    it('creates files', async () => {
      assert.equal(fileCount, 1);
      const event = result.logs[0].args;
      assert.equal(event.id.toNumber(), fileCount.toNumber(), 'id is correct');
      assert.equal(
        event.description,
        'file description',
        'description is correct'
      );
      assert.equal(event.author, author, 'author is correct');
      assert.equal(event.hash, hash, 'file hash is correct');
      assert.equal(event.tipAmount, '0', 'tip is correct');

      await vimbal.uploadFile(hash, '', { from: author }).should.be.rejected;
    });

    it('lists files', async () => {
      const file = await vimbal.files(fileCount);
      assert.equal(file.id.toNumber(), fileCount.toNumber(), 'id is correct');
      assert.equal(
        file.description,
        'file description',
        'description is correct'
      );
      assert.equal(file.author, author, 'author is correct');
      assert.equal(file.hash, hash, 'file hash is correct');
      assert.equal(file.tipAmount, '0', 'tip is correct');
    });

    it('allows users to tip files', async () => {
      let oldAuthorBalance;
      oldAuthorBalance = await web3.eth.getBalance(author);
      oldAuthorBalance = new web3.utils.BN(oldAuthorBalance);

      result = await vimbal.tipFileOwner(fileCount, {
        from: tipper,
        value: web3.utils.toWei('1', 'Ether'),
      });

      // Listener for event
      const event = result.logs[0].args;
      assert.equal(event.id.toNumber(), fileCount.toNumber(), 'id is correct');
      assert.equal(event.hash, hash, 'hash is correct');
      assert.equal(
        event.description,
        'file description',
        'description is correct'
      );
      assert.equal(event.author, author, 'author is correct');
      assert.equal(
        event.tipAmount,
        web3.utils.toWei('1', 'Ether'),
        'tip is correct'
      );

      let newAuthorBalance;
      newAuthorBalance = await web3.eth.getBalance(author);
      newAuthorBalance = new web3.utils.BN(newAuthorBalance);

      let tipFileOwner;
      tipFileOwner = web3.utils.toWei('1', 'Ether');
      tipFileOwner = new web3.utils.BN(tipFileOwner);

      const expectedBalance = oldAuthorBalance.add(tipFileOwner);

      assert.equal(newAuthorBalance.toString(), expectedBalance.toString());

      await vimbal.tipFileOwner(99, {
        from: tipper,
        value: web3.utils.toWei('1', 'Ether'),
      }).should.be.rejected;
    });
  });
});

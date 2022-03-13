const assert = require('assert');

const Vimbal = artifacts.require("Vimbal");

require('chai').use(require('chai-as-promised')).should();



contract('Vimbal', ([deployer, author, tipper]) => {
  let vimbal;

  before(async () => {
    vimbal = await Vimbal.deployed();
  })


  describe('deployment', () => {
    it('deploys successfully', async () => {
      const address = await vimbal.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, '');
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    })

    it('has a name', async () => {
      const name = await vimbal.name();
      assert.equal(name, 'Vimbal');
    })
  })


  describe('files', async () => {
    let result;
    const hash = '0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad';

    before(async () => {
      result = await vimbal.uploadFile(hash, 'file description', { from: author });
      fileCount = await vimbal.fileCount();
    })

    it('creates files', async () => {
      assert.equal(fileCount, 1);
      const event = result.logs[0].args;
      assert.equal(event.id.toNumber(), fileCount.toNumber(), 'id is correct');
      assert.equal(event.description, 'file description', 'description is correct');
      assert.equal(event.author, author, 'author is correct');
      assert.equal(event.hash, hash, 'file hash is correct');


      await vimbal.uploadFile(hash, 'file description', { from: author }).should.be.rejected;

    })
  })
})

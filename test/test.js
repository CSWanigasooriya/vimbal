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
})

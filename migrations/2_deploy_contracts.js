const { artifacts } = require('truffle')
const File = artifacts.require('FileContract')
const Review = artifacts.require('ReviewContract')
const User = artifacts.require('UserContract')

module.exports = function (deployer) {
  deployer.deploy(File)
  deployer.deploy(Review)
  deployer.deploy(User)
}

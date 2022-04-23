var Vimbal = artifacts.require('Vimbal');
var Review = artifacts.require('Review');

module.exports = function (deployer) {
  deployer.deploy(Vimbal);
  deployer.deploy(Review);
};

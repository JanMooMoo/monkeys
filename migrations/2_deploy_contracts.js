var Kadena = artifacts.require("Kadena");


module.exports = function(deployer,network, accounts) {
	deployer.deploy(Kadena,{from: accounts[0]});
   };


(function () {
	angular
		.module('app')
		.controller('gameController', gameController);

		function gameController(){
			var self = this;

			self.getRandomIMDBnumber 	= getRandomIMDBnumber;
			self.randomIMDBnumber 		= null;

			// function getRandomIMDBnumber(){
			// 	return Math.floor(Math.random * (9999999 - 1000000) + 1000000);
			// };

			function getRandomIMDBnumber (){
				self.randomIMDBnumber = Math.floor(Math.random() * (9999999 - 1000001) + 1000000);
			}
		}
})();
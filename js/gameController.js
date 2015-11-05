(function () {
	angular
		.module('app')
		.controller('gameController', gameController);

		function gameController($http){
			var self = this;

			//View Accessible variables
			self.getRandomIMDBinfo 	= getRandomIMDBinfo;
			self.randomTitle	= null;
			self.randomActors	= null;
			self.thinkingGif	= {'display': 'none'};

			function getRandomIMDBinfo (){
				self.thinkingGif = {'display': 'block'};

				//Random ID number from 1000000 - 9999999
				var randomIMDBnumber = Math.floor(Math.random() * (9999999 - 1000001) + 1000000);
				//URL for API call + random ID #
				var url = 'http://www.omdbapi.com/?i=tt' + randomIMDBnumber + '&type=movie';

				function splitValues(str){
					str.split(',');
				};

				//API Call
				$http.get(url)
					.success(function(data, status, headers, config){
						console.log(url);

						var metascore = parseInt(data.Metascore);
						var genre = data.Genre;
						var genreCheck = false;
						if(genre){
							//means actual response
							console.log('genre found');

							if(genre.indexOf('Documentary') > -1){
								genreCheck = true;
							}

						}

						//If response does not pass filter, run function again
						if(data.Response == 'False' || data.Metascore == "N/A" || metascore < 30 || data.Language !== "English" || genreCheck){
							getRandomIMDBinfo();
						}
						else{
							var actorsArray = splitValues(data.Actors);

							self.randomActor = actorsArray[3];
							self.randomTitle = data.Title;
							self.thinkingGif = {'display': 'none'};
						}
					})
					.error(function(data, status, headers, config){
						self.randomIMDBtitle = "An error has occurred";
					})
			}
		}
})();
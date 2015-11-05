(function () {
	angular
		.module('app')
		.controller('gameController', gameController);

		function gameController($http){
			var self = this;

			self.getRandomIMDBinfo 	= getRandomIMDBinfo;
			// self.randomIMDBnumber 		= null;
			self.randomTitle	= null;
			self.randomActors	= null;
			self.thinkingGif	= {'display': 'none'};

			function getRandomIMDBinfo (){
				self.thinkingGif = {'display': 'block'};

				var randomIMDBnumber = Math.floor(Math.random() * (9999999 - 1000001) + 1000000);
				var url = 'http://www.omdbapi.com/?i=tt' + randomIMDBnumber + '&type=movie';

				function splitValues(str){
					str.split(',');
				};

				$http.get(url)
					.success(function(data, status, headers, config){
						console.log(url);

						var metascore = parseInt(data.Metascore);
						var genre = data.Genre;
						var genreCheck = false;
						if(genre){
							// var genreArray	= splitValues(data.Genre);
							// var genre = null;
							// function documentaryCheck (arr){
							// 	for (var i = 0; i < arr.length; i++) {
							// 		if(arr[i] == "Documentary" || arr[i] == " Documentary"){
							// 			genre = true;
							// 		}
							// 	};
							// }
							// documentaryCheck(genreArray);
							console.log('genre found');

							if(genre.indexOf('Documentary') > -1){
								genreCheck = true;
							}

						}

						if(data.Response == 'False' || data.Metascore == "N/A" || metascore < 30 || data.Language !== "English" || genre){
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
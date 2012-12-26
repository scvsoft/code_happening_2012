var scraper = require('../movies/scraper')
  , storage = require('../movies/storage')
  , datejs = require('datejs');
  
function weeks() {
	var date = Date.today();
	if (date.compareTo(Date.parse("2012-12-30")) > 0) {
		return 52;
	}
	return date.previous().sunday().getWeek();
}

/*
 * GET home page.
 */

exports.fetch = function(req, res, next){	
	//The url we want is something like: 'http://boxofficemojo.com/weekend/chart/?view=&yr=2012&wknd=50'
	var movies = storage.retrieve(),
		total = weeks(),
		i = movies.length;

	while (i < total) {
		i = i+1;
		new scraper.lookup(i, function(movie) {
			console.log("found movie: " + JSON.stringify(movie));
			movies.push(movie);
			if (movies.length >= total) {
				storage.store(movies);
			}
		})
	}
	req.movies = movies;
	next();
};
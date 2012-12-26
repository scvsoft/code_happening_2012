var fs = require('fs'),
	_ = require('underscore'),
	filePath = "./data/movies.json";

exports.store = function(movies) {
	movies = _.sortBy(movies, function(item){
		return item.week
	});
				
	fs.writeFile(filePath, JSON.stringify(movies), function (err) {
 		if (err) throw err;
  		console.log('movie storage updated');
	});
}

exports.retrieve = function() {
	var movies = JSON.parse(fs.readFileSync(filePath));
	console.log("Found " + movies.length + " movies on local storage");
	return movies;
}

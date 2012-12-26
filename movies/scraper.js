var http = require('http'),
	_ = require("underscore"),
	$ = require("jquery");

movieScraper = function(week, onFinish) {
	this.movie = {week : week};
	this.onFinish = onFinish;
	this.fetchMovie();
}

movieScraper.prototype.fetchMovie = function() {
	console.log("fetching movie for week: " + this.movie.week);
	http.get({
			host: "boxofficemojo.com", 
			path: '/weekend/chart/?view=&yr=2012&wknd=' + this.movie.week
		},
		$.proxy(this.scrapeMovie, this)
	);
}

movieScraper.prototype.scrapeMovie = function(response) {
	var contents = "";		
	response.on('data', function (chunk) {
		contents += chunk;
	});

 	response.on('end', $.proxy(function () {
 		var selector = 'div#body table table',
	 		candidates = $(selector, contents),
	 		movieList = (candidates.length > 1) ? $(candidates[1]) : $(candidates[0]);
 			movieEntry = $($("tr", movieList)[1]),
 			this.movie.name = $($("td b", movieEntry)[0]).html();	
		console.log("found movie for week " + this.movie.week + " : " + this.movie.name);
 		this.fetchTrailer();
 	}, this));
}

movieScraper.prototype.fetchTrailer = function() {
	console.log("Fetching trailer for " + this.movie.name);
	http.get({
			host: "gdata.youtube.com",
			path: "/feeds/api/videos/-/" + this.movie.name.replace(/ /g, "/") + "/2012/official/trailer?alt=json"
		}, 
		$.proxy(this.scrapeTrailer, this)
	);
}

movieScraper.prototype.scrapeTrailer = function(response) {
	var contents = "";
	response.on('data', function (chunk) {
		contents += chunk;
	});
	
	response.on('end', $.proxy(function () {
		contents = JSON.parse(contents);
		links = contents.feed.entry[0].link;
		link = _.find(links, function(item) {
			return item.rel == "alternate";
		});
		this.movie.trailer = link.href.replace("/watch?v=","/embed/")
			.replace("&feature=youtube_gdata","?rel=0&autoplay=1&start=10");
		console.log("found trailer for movie " + this.movie.name);
		console.log("movie fetch completed: " + JSON.stringify(this.movie));
		this.onFinish(this.movie);
 	}, this)); 	
}

exports.lookup = movieScraper;

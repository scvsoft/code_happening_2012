nextMovie = function() {
	if (window.movieIndex < (window.movieData.length -1)) {
		window.movieIndex = window.movieIndex + 1;
		renderMovie();
	}
}

previousMovie = function() {
	if (window.movieIndex > 0) {
		window.movieIndex = window.movieIndex - 1;
		renderMovie();
	}
}

renderMovie = function() {
	var movie = window.movieData[window.movieIndex],
		weekElem = $("#week"), 
		titleElem = $("#title");
	weekElem.animate({top: "-200px"}, 500, function(){
		$("p", weekElem).html("Week: " + movie.week);
		weekElem.animate({top: "-60px"}, 500);
	});
	titleElem.animate({left: "-1000px"}, 800, function() {
		titleElem.html(movie.name);
		titleElem.animate({left: "10px"}, 800);
	});
	$('#cinema').attr("src", movie.trailer);
}

$(document).ready(function() {
	window.movieIndex=0;
	$(document).keydown(function(event) {
		$("#legend").slideUp();
		switch(event.which) {
			case 38: nextMovie(); break
			case 40: previousMovie(); break;
		}
	});	
	renderMovie();
});

var updateSearch = function(x) {
      $( ".search-divs" ).remove();
    $( ".result-breaks" ).remove();
    
    for(i=0; i<x.query.search.length; i++) {
      var title = x.query.search[i].title;
      var searchResultsTitle = '<div class="search-divs"><p><a class="result-links" target="_blank" href="https://en.wikipedia.org/wiki/'+title.toLowerCase().replace(/\s/g,'_') +'">'+ title+'</a></p>';

      var snippet = x.query.search[i].snippet;
      var searchResultsSnip = '<p>'+snippet+'</p></div><br class="result-breaks">';
      var fullSearchRes = searchResultsTitle + searchResultsSnip;
      $("#search-results").append(fullSearchRes);
    }
}

var wikiQuery = function(searchString) {
  $.ajax({
  url: '//en.wikipedia.org/w/api.php',
  data: { action: 'query', 
         list: 'search', 
         srsearch: searchString, 
         format: 'json',
      	 continue: "",
	       srqiprofile: "classic",
	       srwhat: "text",
	       srprop: "timestamp|sectionsnippet|snippet"},
  dataType: 'jsonp',
  success: function(x) {
    
    updateSearch(x);
    /*
    $( ".search-divs" ).remove();
    $( ".result-breaks" ).remove();
    
    for(i=0; i<x.query.search.length; i++) {
      var title = x.query.search[i].title;
      var searchResultsTitle = '<div class="search-divs"><p><a class="result-links" target="_blank" href="https://en.wikipedia.org/wiki/'+title.toLowerCase().replace(/\s/g,'_') +'">'+ title+'</a></p>'

      var snippet = x.query.search[i].snippet;
      var searchResultsSnip = '<p>'+snippet+'</p></div><br class="result-breaks">'
      var fullSearchRes = searchResultsTitle + searchResultsSnip
      $("#search-results").append(fullSearchRes);
    }
    */
  }
});
}


//TRY PUTTING UPDATE FUNCTION OUTSIDE
//AND THEN RUN IN AJAX CALL

$("form").on('submit',function(e){
  e.preventDefault();
  var searchTerm = '"' +$("#search-text").val() + '"';
  wikiQuery(searchTerm);
});
// from MOZILLA https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
/*
function geoFindMe() {
  var output = document.getElementById("out");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

  }

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  }

  navigator.geolocation.getCurrentPosition(success, error);
}
*/
var currentUnit = 'f';
function fullLoad(unit) {
	
	
	
navigator.geolocation.getCurrentPosition(function(position) {
  console.log(position.coords.latitude, position.coords.longitude);
	var lat = position.coords.latitude;
	var long = position.coords.longitude;
	var forLocQuery = lat + ',' + long;
	//Start to read in suitable 
	//icons to show...
	console.log(forLocQuery);
	
	//var output = document.getElementById("out");
	//utput.innerHTML = forLocQuery;
	
	
	//Find current weather (API)
	/*BACKUP
	function loadWeather(location, woeid) {
  $.simpleWeather({
    location: location,
    woeid: woeid,
    unit: 'f',
    success: function(weather) {
      html = '<h2><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
      html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
      //html += '<li class="currently">'+weather.currently+'</li>';
      html += '<li>'+weather.alt.temp+'&deg;C</li></ul>';  
      
      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
	}
	*/
	
	
	function loadWeather(location, woeid) {
  $.simpleWeather({
    location: location,
    woeid: woeid,
    unit: unit,
    success: function(weather) {
      html1 = '<h2>'+weather.temp+'&deg;'+weather.units.temp+'</h2>';
      html2 = '<p>'+weather.city+', '+weather.region+'</p>';
      
			//html += '<li class="currently">'+weather.currently+'</li>';
      //html += '<li>'+weather.alt.temp+'&deg;C</li></ul>'
			//console.log(weather.alt.temp);
      
				
      $("#weather1").html(html1);
			$("#weather2").html(html2);
			
			///CHANGES
			farenh = weather.temp;
			celc = weather.alt.temp;
			////END CHANGES
			
			if(celc<10) {
				 $("#weather-icon").removeClass("fa-spinner fa-spin").addClass("fa-snowflake-o fa-5x");
				 } else {
					 $("#weather-icon").removeClass("fa-spinner fa-spin").addClass("fa-sun-o fa-5x");
				 }
			
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
		
  });
	}
	
	loadWeather(forLocQuery);
	
	
});

}

fullLoad(currentUnit);

/*BACKUP
$('.change-fc').click(function(){
    if(currentUnit == 'f') {
			currentUnit = 'c'; 
			fullLoad(currentUnit);
		} else {
			currentUnit = 'f'; 
			fullLoad(currentUnit);
		}
});
*/

/*
if(celc<10) {
				 $("#td_id").attr('class', 'fa fa-sun-o fa-5x');
				 } else {
					 $("#td_id").attr('class', 'fa-snowflake-o fa-5x');
				 }
*/

$('.change-fc').click(function(){
    if(currentUnit == 'f') {
			currentUnit = 'c'; 
			html1 = '<h2>'+celc+'&deg;'+'C</h2>';
      $("#weather1").html(html1);
		} else {
			currentUnit = 'f'; 
			html1 = '<h2>'+farenh+'&deg;'+'F</h2>';
      $("#weather1").html(html1);
		}
});


/*
$(document).ready(function() {
  $.simpleWeather({
    location: 'Austin, TX',
    woeid: '',
    unit: 'f',
    success: function(weather) {
      html = '<p>'+weather.temp+'&deg;'+weather.units.temp+'</p>';
  
      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
});
*/
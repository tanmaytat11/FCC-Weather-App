var lat;
var lon;
var temp;
var city;
var country;
var icon_map;
var f_icon;

var flag = 0;

function getIcon(code) {
  var prefix = 'wi wi-';
  var icon = icon_map[code].icon;
  
  // If we are not in the ranges mentioned above, add a day/night prefix.
  if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
    icon = 'day-' + icon;
  }
  
  // Finally tack on the prefix.
  icon = prefix + icon;
  return icon;
}

function convertToF(celsius) {
  var fahrenheit;
  
  fahrenheit = (9.0 / 5.0) * celsius + 32;
  
  fahrenheit = fahrenheit.toFixed(2);
  
  fahrenheit /= 1
  
  return fahrenheit;
}

function getWeather() {
  $.ajax({
    url: "http://ip-api.com/json/",
    dataType: 'json',
    success: function(data) {
      lat = data.lat;
      lon = data.lon;
      city = data.city;
      country = data.country;
    },
    async: false
  });

  q = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric&appid=8ecdce327247c64cf3b022c64c7ea1e3";

  $.ajax({
    url: q,
    dataType: 'json',
    success: function(data) {
      temp = data.main.temp;
      temp = temp.toFixed(2) / 1;
      f_icon = getIcon(data.weather[0].id);
    },
    async: false
  });
}

$.ajax({
  url: "https://gist.githubusercontent.com/tbranyen/62d974681dea8ee0caa1/raw/3405bfb2a76b7cbd90fde33d8536f0cd13706955/icons.json",
  dataType: 'json',
  success: function(data) {
    icon_map = data;
  },
  async: false
  
});

$("document").ready(function() {
  getWeather();
  $("#city_country").text(city + ", " + country);
  var ht = '<h1 id="temp" class="text-center">' + temp + " °C" + ' <i class="' + f_icon + '"></i>' + "</h1>";
  $("#temp").html(ht);
  $("#toggle_temp").on("click", function() {
    if (!flag) {
      var ht = '<h1 id="temp" class="text-center">' + convertToF(temp) + " °F" + ' <i class="' + f_icon + '"></i>' + "</h1>";
      $("#temp").html(ht);
      flag = 1;
    }
    else {
      var ht = '<h1 id="temp" class="text-center">' + temp + " °C" + ' <i class="' + f_icon + '"></i>' + "</h1>";
      $("#temp").html(ht);
      flag = 0;
    }
  });
});
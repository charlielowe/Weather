var weather = document.getElementsByClassName("weather");
var page = document.getElementsByTagName("body")[0];
var today = document.getElementsByClassName("today")[0];

var d = new Date();
var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

today.innerHTML = "Current Weather - Today - " + days[d.getDay()];

var pageClass = parseInt(page.className);
window.addEventListener("load", function() {
  getLocation();
});

async function getWeather(lat, long) {
  var response = await fetch(
    "http://api.weatherunlocked.com/api/forecast/" +
      lat +
      "," +
      long +
      "?app_id=9e946863&app_key=e08ee008e50d82b421467fee14ab421b"
  );
  var data = await response.json();
  console.log(data);

  weather[4].innerHTML =
    "Min Temp = " + data.Days[pageClass].temp_min_c + " °C";
  weather[5].innerHTML =
    "Max Temp = " + data.Days[pageClass].temp_max_c + " °C";
  weather[7].innerHTML =
    "Max Wind Speed = " + data.Days[pageClass].windspd_max_mph + "mph";
}

async function getCurrentWeather(lat, long) {
  var response = await fetch(
    "http://api.weatherunlocked.com/api/current/" +
      lat +
      "," +
      long +
      "?app_id=9e946863&app_key=e08ee008e50d82b421467fee14ab421b"
  );
  var current = await response.json();
  console.log(current);
  weather[0].innerHTML = "Weather = " + current.wx_desc;
  weather[6].innerHTML = "Current Wind Speed = " + current.windspd_mph + "mph";
  weather[2].innerHTML = "Current Temp = " + current.temp_c + " °C";
  weather[8].innerHTML = "Wind Direction = " + current.winddir_deg + " degrees";
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}

function showPosition(position) {
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
  getCurrentWeather(lat, long);
  getWeather(lat, long);
}

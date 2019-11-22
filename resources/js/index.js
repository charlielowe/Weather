var weather = document.getElementsByClassName("weather");
var page = document.getElementsByTagName("body")[0];
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

  weather[0].innerHTML = "Min Temp = " + data.Days[pageClass].temp_min_c+" °C";
  weather[1].innerHTML = "Max Temp = " + data.Days[pageClass].temp_max_c+" °C";
  weather[2].innerHTML = "Max Wind Speed = " + data.Days[pageClass].windspd_max_mph+"mph";
  weather[3].innerHTML = "Wind Direction = " + data.Days[pageClass].winddir_deg+" degrees";


}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}

function showPosition(position) {
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
  getWeather(lat, long);
}


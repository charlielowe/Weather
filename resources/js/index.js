var weather = document.getElementsByClassName("weather");
window.addEventListener("load", function() {
  getLocation();
});

async function getWeather(lat, long) {
  var response = await fetch(
    "http://api.weatherunlocked.com/api/current/" +
      lat +
      "," +
      long +
      "?app_id=9e946863&app_key=e08ee008e50d82b421467fee14ab421b"
  );
  var data = await response.json();
  weather[0].setAttribute("src", "../resources/images/icons/" + data.wx_icon);
  weather[1].innerHTML = "Weather = " + data.wx_desc;
  weather[2].innerHTML = "Temperature = " + data.temp_c;
  console.log(data);
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

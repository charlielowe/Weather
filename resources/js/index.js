var weather = document.getElementsByClassName("weather");
var today = document.getElementsByClassName("today")[0];
var tabs = document.getElementsByClassName("tablinks");
var d = new Date();
var day = d.getDay();
var days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
window.addEventListener("load", function () {
  for (i = 0; i < 7; i++) {
    if (day > 7) {
      day = 1;
    }
    tabs[i].textContent = days[day - 1];
    day++;
  }
  for (i = 0; i < 7; i++) {
    var temp = document.getElementsByTagName("template")[0];
    var clon = temp.content.cloneNode(true);
    document.getElementById(i).appendChild(clon);
    getLocation();
  }
});

var next = 0;
var pageClass = 0;
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
  weather[0+next].innerHTML =
    tabs[pageClass].innerHTML;
  weather[1+next].innerHTML =
    "Min Temp:" + data.Days[pageClass].temp_min_c + " °C";
  weather[2+next].innerHTML =
    "Max Temp: " + data.Days[pageClass].temp_max_c + " °C";
  weather[3+next].innerHTML =
    "Max Wind Speed: " + data.Days[pageClass].windspd_max_mph + "mph";

    try{
        for (i = 0; i < 8; i++) {
          var jsonArray = data.Days[pageClass].Timeframes[i];
          createMore(text,jsonArray,i);
        }
        next += 4;
        pageClass++;
      }
    
    catch(e){
      var text ="ERROR";
      createMore(text,jsonArray,i);

    }
  }

  function createMore(text,jsonArray,i){ 
    
          var headerTag = document.createElement("h1");
          headerTag.classList.add("weather");
          var newdiv = document.createElement("div");
          newdiv.classList.add("card" + (3 + i));
          
          if(text=="ERROR"){
            var text = document.createTextNode("Sorry, we've ran out of data for this day.");
            headerTag.appendChild(text);
            newdiv.appendChild(headerTag);
            document.getElementById(pageClass).getElementsByClassName("content")[0].appendChild(newdiv);
          }else{
            var info = [time(jsonArray.time),("Weather: "+jsonArray.wx_desc),("Temperature: "+jsonArray.temp_c+"°C"),("Wind speed: "+jsonArray.windspd_mph +" MPH"),("Wind direction: "+jsonArray.winddir_deg + "° / "+ jsonArray.winddir_compass),("../resources/images/icons/"+jsonArray.wx_icon)];  
            var anotherDiv = document.createElement("div");
            anotherDiv.classList.add("cardContent");
            for(k=0;k<5;k++){
              var headerTag = document.createElement("h1");
              var text = document.createTextNode(info[k]);
              headerTag.appendChild(text);
              anotherDiv.appendChild(headerTag);
              newdiv.appendChild(anotherDiv);
            }
            var image = document.createElement("img");
            image.setAttribute("src",info[5]);
            imageDiv = document.createElement("div");
            imageDiv.classList.add("right");
            imageDiv.appendChild(image);
            newdiv.appendChild(imageDiv);
          }
          
          document.getElementById(pageClass).getElementsByClassName("content")[0].appendChild(newdiv);
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
  var top = document.getElementsByClassName("top");
  top[0].innerHTML = "Current Weather - Today - (" + days[day-1] +")";
  top[1].innerHTML = "Weather: " + current.wx_desc;
  top[2].innerHTML = "Current wind speed: " + current.windspd_mph + "mph";
  top[3].innerHTML = "Current temp: " + current.temp_c + " °C";
  top[4].innerHTML =
    "Wind Direction = " +
    current.winddir_deg +
    " degrees / " +
    current.winddir_compass;
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
function openCity(evt, cityName) {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
  scroll();
}

function time(time) {

  var result;
  if (time.toString().length >= 3) {
    if ((time / 100) > 12) {
      result = (time / 100) - 12 + " PM";
    } else {
      result = (time / 100) + " AM";
    }
    return result;
  }
  if (time == 0) {
    result = "12 PM";
  }
  return result;
}

function scroll(){
  var elmnt = document.getElementsByClassName("tab")[0];
  elmnt.scrollIntoView();
}


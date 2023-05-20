function formatDate(timestamp) {
  let now = new Date();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formateDay(timestamp){
  let date = new Date(timestamp*1000);
  let day = date.getDay();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecast, index) {
    if(index < 6){
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
                <div class="weather-forcast-date">
                ${formateDay(forecast.time)}
                </div>
                <div>
                <img src="${
                  forecast.condition.icon_url
                }" alt="forecast.condition.description" width="30">
                </div>
              <span class="weather-forcast-temp ">
                <span class="weather-forcast-temp-max" id="max">${Math.round(
                  forecast.temperature.maximum
                )}°</span>   
                <span class="weather-forcast-temp-min" id="min"> ${Math.round(
                  forecast.temperature.minimum
                )}°</span>  
              </span>
            </div>`;}})
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}


function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let speedElement = document.querySelector("#speed");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.daily[0].temperature.day;


  temperatureElement.innerHTML = Math.round(
    response.data.daily[0].temperature.day
  );
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.daily[0].condition.icon;
  humidityElement.innerHTML = response.data.daily[0].temperature.humidity;
  speedElement.innerHTML = Math.round(response.data.daily[0].wind.speed);
  dateElement.innerHTML = formatDate(response.data.daily[0].time * 1000);
  iconElement.setAttribute(
    "src",
    `${response.data.daily[0].condition.icon_url}`
  );
  iconElement.setAttribute("alt", response.data.daily[0].condition.icon);

}

function search(city) {
  let apiKey = "8b744a3fo3f0ecee45f3c704bdt0751c";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
  axios.get(apiUrl).then(displayForecast);
}
let celsiusTemperature = null;


function handelSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  
  celsiusLink.classList.remove("active");
  FahrenheitLink.classList.add("active");
  let FahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(FahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  FahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handelSubmit);

let FahrenheitLink = document.querySelector("#Fahrenheit-link");
FahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Paris");

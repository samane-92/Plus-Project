function search(city) {
  let apiKey = "2929e464f6f41b06ef9148e9eb603934";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let h1 = document.querySelector("#city");
  let liElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let speedElement = document.querySelector("#speed");
  let dateElement = document.querySelector("#date");
  let imgElement = document.querySelector("#icon");
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  h1.innerHTML = response.data.name;
  liElement.innerHTML = response.data.weather[0].main;
  humidityElement.innerHTML = response.data.main.humidity;
  speedElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  imgElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  imgElement.setAttribute("alt", response.data.weather[0].descriptiob);

  getForecast(response.data.coord);
}

function formatDate(timstamp) {
  let date = new Date(timstamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function getForecast(coordinates) {
  let apiKey = "2929e464f6f41b06ef9148e9eb603934";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=daily&appid=${apiKey}&units =metric`;
  axios.get(apiUrl)?.then(displayForecast);
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col-2">
                <div class="weather-forcast-date">${forecastDay.dt}</div>
                <img
                  src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
                  alt=""
                  width="42"
                />
                <div class="weather-forcast-temp">
                  <span class="weather-forcast-temp-max">${forecastDay.temp.max}°</span>

                  <span class="weather-forcast-temp-min">${forecastDay.temp.min}°</span>
                </div>
              </div>
              `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function handelSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  cityInputElement.addEventListener("submit", search);
  search(cityInputElement.value);
}

function displayFarenheitTemperature(event) {
  event.preventDefault();
  let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  farenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  farenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handelSubmit);

let celsiusTemperature = null;

let farenheitLink = document.querySelector("#farenheit-link");
let celsiusLink = document.querySelector("#celsius-link");
farenheitLink.addEventListener("click", displayFarenheitTemperature);
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Paris");

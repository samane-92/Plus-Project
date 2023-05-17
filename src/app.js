// function formatDate(timstamp) {
// let date = new Date(timstamp);
// let hours = date.getHours();
// if (hours < 10) {
// hours = `0${hours}`;
// }
// let minutes = date.getMinutes();
// if (minutes < 10) {
// minutes = `0${minutes}`;
// }
// let days = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];
// let day = days[date.getDay()];
// return `${day} ${hours}:${minutes}`;
// }
// function displayTemperature(response) {
//   console.log(response.data);
//   let temperatureElement = document.querySelector("#temperature");
//   let h1 = document.querySelector("#city");
//   let liElement = document.querySelector("#description");
//   let humidityElement = document.querySelector("#humidity");
//   let speedElement = document.querySelector("#speed");
//   let dateElement = document.querySelector("#date");
//   let imgElement = document.querySelector("#icon");
//   celsiusTemperature = response.data.main.temp;
//   temperatureElement.innerHTML = Math.round(response.data.main.temp);
//   h1.innerHTML = response.data.name;
//   liElement.innerHTML = response.data.weather[0].main;
//   humidityElement.innerHTML = response.data.main.humidity;
//   speedElement.innerHTML = Math.round(response.data.wind.speed);
//   dateElement.innerHTML = formatDate(response.data.dt * 1000);
//   imgElement.setAttribute(
//     "src",
//     `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
//   );
//   imgElement.setAttribute("alt", response.data.weather[0].descriptiob);

//   // getForecast(response.data.coordinates);
// }

// function search(city) {
//   let apiKey = "292515c6d7b5ef51d8f56f8644d142ca";
//   let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
//   axios.get(apiUrl).then(displayTemperature);
// }

// function handelSubmit(event) {
//   event.preventDefault();
//   let cityInputElement = document.querySelector("#city-input");
//   cityInputElement.addEventListener("submit", search);
//   search(cityInputElement.value);
// }

// function displayFarenheitTemperature(event) {
//   event.preventDefault();
//   let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
//   let temperatureElement = document.querySelector("#temperature");
//   farenheitLink.classList.remove("active");
//   celsiusLink.classList.add("active");
//   temperatureElement.innerHTML = Math.round(farenheitTemperature);
// }

// function displayCelsiusTemperature(event) {
//   event.preventDefault();
//   let temperatureElement = document.querySelector("#temperature");
//   farenheitLink.classList.add("active");
//   celsiusLink.classList.remove("active");
//   temperatureElement.innerHTML = Math.round(celsiusTemperature);
// }
// let celsiusTemperature = null;

// let form = document.querySelector("#search-form");
// form.addEventListener("submit", handelSubmit);

// let farenheitLink = document.querySelector("#farenheit-link");
// farenheitLink.addEventListener("click", displayFarenheitTemperature);
// let celsiusLink = document.querySelector("#celsius-link");
// celsiusLink.addEventListener("click", displayCelsiusTemperature);

// search("Paris");
function formatDate(timestamp) {
  let date = new Date(timestamp);
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

function displayTemperature(response) {
  console.log(response.data);
  console.log(response.data.daily[0].condition.icon_url);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let speedElement = document.querySelector("#speed");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
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
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.daily[0].condition.icon_url}.png`
  );
  iconElement.setAttribute("alt", response.data.daily[0].condition.icon);
}

let apiKey = "8b744a3fo3f0ecee45f3c704bdt0751c";
let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=Paris&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);

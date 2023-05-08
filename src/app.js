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

function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let h1 = document.querySelector("#city");
  let liElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let speedElement = document.querySelector("#speed");
  let dateElement = document.querySelector("#date");
  let imgElement = document.querySelector("#icon");
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
}

function displayFarenhitTemperature(event) {
  event.preventDefault();
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", displayTemperature, formatDate);

let apiKey = "cd4fdbb5dd7dfb75e8adcfc668859d3b";
let city = "Paris";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);

function convert(temperature) {
  displayTemperature(response);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp * 9.5 + 32);
}

let fahrenheitLink = document.querySelector("fahrenheit-link");
fahrenheitLink.addEventListener = ("click", displayFarenhitTemperature);

function displayTemperature(response) {
  console.log(response.data.main.temp);
}

let apiKey = "cd4fdbb5dd7dfb75e8adcfc668859d3b";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);

let now = new Date();
let actualDate = document.querySelector("#date");
let actualTime = document.querySelector("#time");
let weekDays = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`,
];

let months = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];

let weekDay = weekDays[now.getDay()];
let date = now.getDate();
let month = months[now.getMonth()];
let year = now.getFullYear();

let hours = String(now.getHours()).padStart(2, "0");
let minutes = String(now.getMinutes()).padStart(2, "0");

actualDate.innerHTML = ` ${weekDay} ${date} ${month} ${year}`;
actualTime.innerHTML = `${hours}:${minutes}`;

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#condition").innerHTML =
    response.data.weather[0].description;
}

function introductionCity(city) {
  let apiKey = "61da32cd216c8fce43a31b240f1cadcf";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  introductionCity(city);
}

let searchButton = document.querySelector("#search-form");
searchButton.addEventListener("submit", searchCity);

introductionCity("New York");

function searchLocation(position) {
  let apiKey = "61da32cd216c8fce43a31b240f1cadcf";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function currentLocationCondition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", currentLocationCondition);

function changeToCelsius(event) {
  event.preventDefault();

  showTemperature(response);
}

let celsiusTemperature = document.querySelector("#celsius-link");
celsiusTemperature.addEventListener("click", changeToCelsius);

function changeToFahrenheit(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector("#temperature");
  let temperature = fahrenheit.innerHTML;
  fahrenheit.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let fahrenheitTemperature = document.querySelector("#fahrenheit-link");
fahrenheitTemperature.addEventListener("click", changeToFahrenheit);

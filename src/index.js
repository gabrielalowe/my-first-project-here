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

let hours = String(now.getHours()).padStart(2, "0");
let minutes = String(now.getMinutes()).padStart(2, "0");

actualTime.innerHTML = `${hours}:${minutes} `;
actualDate.innerHTML = `${weekDay}, ${month} ${date} `;

function showTemperature(response) {
  console.log(response.data);

  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#condition").innerHTML =
    response.data.condition.description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    `src`,
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
}

function introductionCity(city) {
  let apiKey = "1be09478a4ftf06c7f8edo170e403d22";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;

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
  let apiKey = "1be09478a4ftf06c7f8edo170e403d22";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=${units}`;

  https: axios.get(apiUrl).then(showTemperature);
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

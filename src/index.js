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
function getForecast(coordinates) {
  let apiKey = "1be09478a4ftf06c7f8edo170e403d22";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` 
          <div class="col-2">
            <div class="weather-forecast-date">${day}</div>
            <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/few-clouds-night.png" alt="" width="42" />
            <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temperature-max">32°C</span>
              <span class="weather-forecast-temperature-min">24°C</span>
            </div>
          </div>
        `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showTemperature(response) {
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
  celsiusTemperature = response.data.temperature.current;
  getForecast(response.data.coordinates);
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

function searchLocation(position) {
  let apiKey = "1be09478a4ftf06c7f8edo170e403d22";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function currentLocationCondition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", currentLocationCondition);

let celsiusTemperature = null;

function changeToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function changeToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", changeToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", changeToCelsius);

introductionCity("New York");

let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

let month = months[now.getMonth()];

let date = now.getDate();

let year = now.getFullYear();

let heading = document.querySelector("h3");
heading.innerHTML = `${day}, ${month} ${date}, ${year}`;

let currentTime = document.querySelector(".showtime");
currentTime.innerHTML = `${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let city = document.querySelector(".city");
  city.innerHTML = `${searchInput.value}`;
}

function searchLocation(event) {
  event.preventDefault();
  let searchUserInput = document.querySelector("#search-input");
  let apiKey = "1da4edc0c8b119bb4b7b8bee71a5ad31";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchUserInput.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

let form = document.querySelector("#city-search");
form.addEventListener("submit", searchLocation);

function showTemp(response) {
  console.log(response.data);
  let cityName = response.data.name;
  let currentTemp = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#display");
  cityElement.innerHTML = cityName;
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = `${currentTemp}°C`;
}

function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "1da4edc0c8b119bb4b7b8bee71a5ad31";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let btn = document.querySelector("#current-btn");
btn.addEventListener("click", getCurrentPosition);

let userSearch = document.querySelector("#search-input");
userSearch.addEventListener("submit", showLocation);

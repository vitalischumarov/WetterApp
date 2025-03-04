import "../Style/detailViewStyle.scss";
import {
  loadCitiesFromLocalStorage,
  saveCityToLocalStorage,
} from "../Model/localStorage";

const app = document.querySelector(".app");
let currentId = "";

export function showHeader() {
  const headerDiv = document.createElement("div");
  headerDiv.classList.add("header");

  // Erstellen des Divs für das linke Icon
  const leftIconDiv = document.createElement("div");
  leftIconDiv.classList.add("left_icon");

  // Erstellen des SVGs für das "back"-Icon
  const leftSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  leftSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  leftSvg.setAttribute("fill", "none");
  leftSvg.setAttribute("viewBox", "0 0 24 24");
  leftSvg.setAttribute("stroke-width", "1.5");
  leftSvg.setAttribute("stroke", "currentColor");
  leftSvg.classList.add("backIcon");

  // Erstellen des Path-Elements für das "back"-Icon
  const leftPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path",
  );
  leftPath.setAttribute("stroke-linecap", "round");
  leftPath.setAttribute("stroke-linejoin", "round");
  leftPath.setAttribute("d", "M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3");

  // Anhängen des Path-Elements zum SVG und des SVGs zum leftIconDiv
  leftSvg.appendChild(leftPath);
  leftIconDiv.appendChild(leftSvg);

  // Erstellen des Divs für das rechte Icon
  const rightIconDiv = document.createElement("div");
  rightIconDiv.classList.add("right_icon");

  // Erstellen des SVGs für das "save"-Icon
  const rightSvg = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg",
  );
  rightSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  rightSvg.setAttribute("fill", "none");
  rightSvg.setAttribute("viewBox", "0 0 24 24");
  rightSvg.setAttribute("stroke-width", "1.5");
  rightSvg.setAttribute("stroke", "currentColor");
  rightSvg.classList.add("saveButtonIcon");
  // Erstellen des Path-Elements für das "save"-Icon
  const rightPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path",
  );
  rightPath.setAttribute("stroke-linecap", "round");
  rightPath.setAttribute("stroke-linejoin", "round");
  rightPath.setAttribute(
    "d",
    "M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z",
  );

  // Anhängen des Path-Elements zum SVG und des SVGs zum rightIconDiv
  rightSvg.appendChild(rightPath);
  rightIconDiv.appendChild(rightSvg);
  // rightIconDiv.addEventListener("click", () => {
  //   console.log("hello");
  // });

  // Anhängen der beiden Icon-Divs zum Header-Div
  headerDiv.appendChild(leftIconDiv);
  headerDiv.appendChild(rightIconDiv);
  app.innerHTML = "";
  app.appendChild(headerDiv);
}

export function showCurrentCityInformation(cityName, id) {
  currentId = id;
  console.log(`the selected id is ${currentId}`);
  checkIfSaved(currentId);
  const currentInformation = `
              <div class="currentWeather">
                  <span class="currentWeather__mainInformation city text">${cityName.location.name}</span>
                  <span
                      class="currentWeather__mainInformation weather text"
                  >${cityName.current.temp_c}</span>
                  <span
                      class="currentWeather__mainInformation condition text"
                  >${cityName.current.condition.text}</span>
                  <span
                      class="currentWeather__mainInformation forcast text"
                  >H:${cityName.forecast.forecastday[0].day.maxtemp_c} L:${cityName.forecast.forecastday[0].day.mintemp_c}</span>
              </div>
              <div class="forecastWeather">
                  <div class="forecastWeather__text text">Heute ${cityName.forecast.forecastday[0].day.condition.text}. Wind bis zu ${cityName.forecast.forecastday[0].day.maxwind_kph} km/h</div>
                  <hr />
                  <div class="allForcasts"></div>
              </div>
              <div class="threeDayForecast">
                <div class="threeDayForecast__text text">
                Vorhersagen für die nächsten 3 Tage:
                </div>
                <hr />
              </div>`;
  app.innerHTML += currentInformation;

  // Wieso kann ich ihn nicht normal mit rightIconDiv.addEventListener....
  setTimeout(() => {
    const saveBtn = document.querySelector(".right_icon");
    saveBtn.addEventListener("click", () => {
      saveCityToLocalStorage(cityName.location.name, id);
      console.log("saved");
      checkIfSaved(id);
    });
  }, 0);
}

export function showTwentyFourHourForecast(time, icon, temperature) {
  const inputForForecast = document.querySelector(".allForcasts");
  const forcastInformation = `
    <div class="forecastData">
      <div class="forecastData__time text">
      ${time}
      </div>
      <div class="forecastData__image">
        <img src="${icon}" alt="Weather image">
      </div>
      <div class="forecastData__temp text">
      ${temperature}
      </div>
    </div>`;
  inputForForecast.innerHTML += forcastInformation;
}

export function showThreeDaysForecast(day, temp, icon, wind) {
  const dayForecast = `
    <div class="forecastToday">
      <div class="forecastToday__day text">${day}</div>
      <div class="forecastToday__icon">
        <img src="${icon}" alt="Wetter Icon" class="img_threeDayForecast">
      </div>
      <div class="forecastToday__temp text">${temp}°C</div>
      <div class="forecastToday__wind text">Wind: ${wind} km/h</div>
    </div>`;

  document.querySelector(".threeDayForecast").innerHTML += dayForecast;
}

export function showDetailInformation(
  humidity,
  feel,
  sunrise,
  sunset,
  uvindex,
  rain,
) {
  const detailView = `
    <div class="detailView">
      <div class="detailView__humidity singleBox">
        <span class="text">Feuchtigkeit</span>
        <span class="text humidity">${humidity}</span>
      </div>
      <div class="detailView__feel singleBox">
        <span class="text">Gefühlt</span>
        <span class="text feel">${feel}</span>
      </div>
      <div class="detailView__sunrise singleBox">
        <span class="text">Sonnenaufgang</span>
        <span class="text sunrise">${sunrise}</span>
      </div>
      <div class="detailView__sunset singleBox">
        <span class="text">Sonnenuntergang</span>
        <span class="text sunset">${sunset}</span>
      </div>
      <div class="detailView__rain singleBox">
        <span class="text">Niederschlag</span>
        <span class="text rain">${uvindex}</span>
      </div>
      <div class="detailView__uvindex singleBox">
        <span class="text">UV-Index</span>
        <span class="text uvindex">${rain}</span>
      </div>
    </div>`;

  app.innerHTML += detailView;
}

export function setBackgroundConditionImage(url) {
  app.style.backgroundImage = `url(${url})`;
}

function buttonAction() {
  console.log("hello");
}

function checkIfSaved(id) {
  const allSavedCities = loadCitiesFromLocalStorage();
  for (let i = 0; i < allSavedCities.length; i++) {
    if (id === allSavedCities[i].id) {
      console.log("id gefunden");
      document.querySelector(".right_icon").style.display = "none";
      return;
    } else {
    }
  }
}

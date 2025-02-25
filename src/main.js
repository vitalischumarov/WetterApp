// import "./View/detailView";
import "./View/favoritesView";
import "./View/loadingView";
import { fetchData } from "./Model/api";

import {
  showHeader,
  showCurrentCityInformation,
  showTwentyFourHourForecast,
  showThreeDaysForecast,
} from "./View/detailView";

import { showingLoadingScreen } from "./View/loadingView";

showingLoadingScreen();
let cityData = await fetchData("Herford");
displayDetailView();

function displayDetailView() {
  showHeader();
  showCurrentCityInformation(cityData);
  renderTwentyFourHour();
  renderThreeDayForecast();
}

function renderTwentyFourHour() {
  let time = getCurrentHour(cityData);
  let selectedDay = 0;
  for (let i = 0; i <= 23; i++) {
    showTwentyFourHourForecast(
      modifyTime(time),
      cityData.forecast.forecastday[selectedDay].hour[time].condition.icon,
      cityData.forecast.forecastday[selectedDay].hour[time].temp_c,
    );
    time = time + 1;
    if (time > 23) {
      time = 0;
      selectedDay = 1;
    }
  }
}

function getCurrentHour(cityData) {
  const currentHour = new Date(cityData.location.localtime).getHours();
  return currentHour;
}

function modifyTime(time) {
  let currentTime = getCurrentHour(cityData);
  if (time === currentTime) {
    return "now";
  } else {
    return `${time} Uhr`;
  }
}

function renderThreeDayForecast() {
  let day = "";
  for (let i = 0; i < 3; i++) {
    if (i === 0) {
      day = "Heute";
    } else {
      day = getWeekDay(cityData.forecast.forecastday[i].date);
    }
    showThreeDaysForecast(
      day,
      `H: ${cityData.forecast.forecastday[i].day.maxtemp_c} L: ${cityData.forecast.forecastday[i].day.mintemp_c}`,
      cityData.forecast.forecastday[i].day.condition.icon,
      cityData.forecast.forecastday[i].day.maxwind_kph,
    );
  }
}

function getWeekDay(date) {
  const weekdays = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
  const dayIndex = new Date(date).getDay();
  return weekdays[dayIndex];
}

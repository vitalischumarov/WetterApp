import "./View/favoritesView";
import {
  showHeader,
  showCurrentCityInformation,
  showTwentyFourHourForecast,
  showThreeDaysForecast,
  showDetailInformation,
  setBackgroundConditionImage,
} from "./View/detailView";
import { showingLoadingScreen } from "./View/loadingView";
import { fetchData } from "./Model/api";
import { getConditionImagePath } from "./Model/condition";
import { display } from "./View/favoritesView";

showingLoadingScreen();
let cityData = await fetchData("Miland");
displayDetailView();

export function displayDetailView() {
  showHeader();
  showCurrentCityInformation(cityData);
  renderTwentyFourHour();
  renderThreeDayForecast();
  renderDetailInformation();
  setBackgroundConditionImage(renderConditionImage());
}

function renderTwentyFourHour() {
  let time = getCurrentHour(cityData);
  let selectedDay = 0;
  for (let i = 0; i <= 23; i++) {
    showTwentyFourHourForecast(
      modifyTime(time),
      cityData.forecast.forecastday[selectedDay].hour[time].condition.icon,
      cityData.forecast.forecastday[selectedDay].hour[time].temp_c
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
      cityData.forecast.forecastday[i].day.maxwind_kph
    );
  }
}

function getWeekDay(date) {
  const weekdays = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
  const dayIndex = new Date(date).getDay();
  return weekdays[dayIndex];
}

function renderDetailInformation() {
  const humidity = `${cityData.current.humidity}%`;
  const feel = `${cityData.current.feelslike_c}°`;
  const sunrise = convertTime(cityData.forecast.forecastday[0].astro.sunrise);
  const sunset = convertTime(cityData.forecast.forecastday[0].astro.sunset);
  const uvindex = cityData.forecast.forecastday[0].day.uv;
  const rain = `${cityData.forecast.forecastday[0].day.totalprecip_mm}mm`;

  showDetailInformation(humidity, feel, sunrise, sunset, uvindex, rain);
}

function convertTime(timeString) {
  const [time, period] = timeString.split(" ");
  let [hours, minutes] = time.split(":").map((num) => parseInt(num));

  if (period === "AM" && hours === 12) {
    hours = 0;
  } else if (period === "PM" && hours !== 12) {
    hours += 12;
  }
  const hoursFormatted = hours.toString().padStart(2, "0");
  const minutesFormatted = minutes.toString().padStart(2, "0");
  return `${hoursFormatted}:${minutesFormatted} Uhr`;
}

function dayOrNight(city, currentHour) {
  const dayStatus = city.forecast.forecastday[0].hour[currentHour].is_day;
  if (dayStatus === 1) {
    return false;
  } else {
    return true;
  }
}

function getConditionCode(city, currentHour) {
  const conditionCode =
    city.forecast.forecastday[0].hour[currentHour].condition.code;
  return conditionCode;
}

function renderConditionImage() {
  const code = getConditionCode(cityData, getCurrentHour(cityData));
  const isDay = dayOrNight(cityData, getCurrentHour(cityData));
  const url = getConditionImagePath(code, isDay);
  return url;
}

const button = document.querySelector(".left_icon");
button.addEventListener("click", () => {
  display();
});

import "./View/detailView";
import "./View/favoritesView";
import { fetchData } from "./Model/api";
import {
  showHeader,
  showCurrentCityInformation,
  showTwentyFourHourForecast,
} from "./View/detailView";

let cityData = await fetchData("Bielefeld");
displayDetailView();

function displayDetailView() {
  showHeader();
  showCurrentCityInformation(cityData);
  for (let i = 0; i < 12; i++) {
    showTwentyFourHourForecast(cityData);
  }
}

function getCurrentHour(cityData) {
  const currentHour = new Date(cityData.location.localtime).getHours();
  return currentHour;
}

import "./View/detailView";
import "./View/favoritesView";
import { fetchData } from "./Model/api";
import { showHeader, showCurrentCityInformation } from "./View/detailView";

let cityData = await fetchData("Bielefeld");
displayDetailView();

function displayDetailView() {
  showHeader();
  showCurrentCityInformation(cityData);
}

import { displayFavoriteView } from "../main";

export function loadCitiesFromLocalStorage() {
  let citiesStorage = JSON.parse(localStorage.getItem("allFavoriteCities"));
  return citiesStorage;
}

export function saveCityToLocalStorage(name, nr) {
  const city = {
    city: name,
    id: nr,
  };
  console.log(`new city is: ${name}`);
  const newListOfCities = addCityToList(city);
  const formatedList = JSON.stringify(newListOfCities);
  localStorage.setItem("allFavoriteCities", formatedList);
}

function addCityToList(name) {
  let list = loadCitiesFromLocalStorage();
  if (list === null) {
    console.log("ist leer");
    list = [];
    list.push(name);
  } else {
    list.push(name);
  }
  return list;
}

export function updateFavoriteList(favoriteList) {
  const formatedList = JSON.stringify(favoriteList);
  localStorage.setItem("allFavoriteCities", formatedList);
}

export function deleteElementFromLocalStorage(id) {
  console.log(`folgende id soll gelöscht werden: ${id}`);
  let loadedCities = loadCitiesFromLocalStorage();
  let newCityList = [];
  for (let i = 0; i < loadedCities.length; i++) {
    if (id !== loadedCities[i].id) {
      newCityList.push(loadedCities[i]);
    }
  }
  updateFavoriteList(newCityList);
  displayFavoriteView();
}

export function checkIfKeyAvailable() {
  const key = "allFavoriteCities";
  if (localStorage.getItem(key) === null) {
    return false;
  } else {
    return true;
  }
}

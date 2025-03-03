import { displayFavoriteView } from "../main";

export function loadCitiesFromLocalStorage() {
  let citiesStorage = JSON.parse(localStorage.getItem("allFavoriteCities"));
  return citiesStorage;
}

export function saveCityToLocalStorage(name) {
  console.log(`new city is: ${name}`);
  const newListOfCities = addCityToList(name);
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
  console.log(`current List ist: ${favoriteList}`);
  const formatedList = JSON.stringify(favoriteList);
  localStorage.setItem("allFavoriteCities", formatedList);
}

export function deleteElementFromLocalStorage(city) {
  let loadedCities = loadCitiesFromLocalStorage();
  let newCityList = [];
  console.log(loadedCities);
  for (let i = 0; i < loadedCities.length; i++) {
    console.log(`i hat den Wert ${i} mit der Stadt ${loadedCities[i]}`);
    if (city !== loadedCities[i]) {
      newCityList.push(loadedCities[i]);
    }
  }
  updateFavoriteList(newCityList);
  displayFavoriteView();
}

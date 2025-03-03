import "../Style/favoritesViewStyle.scss";
import { fetchData, fetchCityNames, fetchSuggestions } from "../Model/api";
import { displayDetailView } from "../main";
import { deleteElementFromLocalStorage } from "../Model/localStorage";

const app = document.querySelector(".app");

// let editIsActive = false;
const cityName = "";
let timeSinceTyped;

export function showHeaderOfFavorite() {
  const basicStructure = `
          <div class="header_favorite">
              <span class="header_favorite__text">Wetter</span>
              <button class="header_favorite__button">Bearbeiten</button>
          </div>
          <div class="inputField">
              <input
                  type="text"
                  class="inputField__element"
                  placeholder="Gebe den Namen einer Stadt an"
              />
          </div>
          <div class="suggestionList"></div>
          <div class="favoriteList"></div>
    `;
  app.innerHTML = basicStructure;

  document
    .querySelector(".inputField__element")
    .addEventListener("input", async () => {
      clearTimeout(timeSinceTyped);
      timeSinceTyped = setTimeout(async function () {
        const result = await fetchCityNames(
          `http://api.weatherapi.com/v1/search.json?q=${
            document.querySelector(".inputField__element").value
          }&key=4d9509708acc49a6a8740155253101`,
        );
        const resultNew = fetchSuggestions(
          document.querySelector(".inputField__element").value,
        );
        console.log(resultNew);
        for (let i = 0; i < result.length; i++) {
          displayPossibleCities(
            result[i].name,
            result[i].country,
            result[i].id,
          );
        }
      }, 2000);
    });
}

export function changeBackground() {
  app.style.backgroundImage = "none";
  app.style.backgroundColor = "rgb(40 40 40)";
}

export function showCity(
  name,
  country,
  condition,
  temp,
  maxTemp,
  minTemp,
  img,
  id,
) {
  // Erstellen des Containers für die Stadtkarte
  const cityEl = document.createElement("div");
  cityEl.classList.add("favorite");

  // Erstellen der deleteBox
  const deleteBoxDiv = document.createElement("div");
  deleteBoxDiv.classList.add("deleteBox", name);
  deleteBoxDiv.addEventListener("click", () => {
    deleteElementFromLocalStorage(id);
  });

  // Erstellen des SVG-Icons
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("fill", "none");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("stroke-width", "1.5");
  svg.setAttribute("stroke", "currentColor");
  svg.classList.add("deleteBox__icon");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  path.setAttribute(
    "d",
    "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0",
  );

  svg.appendChild(path);
  deleteBoxDiv.appendChild(svg);

  // Erstellen der rightBox
  const rightBoxDiv = document.createElement("div");
  rightBoxDiv.classList.add("rightBox");
  rightBoxDiv.id = name;
  rightBoxDiv.style.backgroundImage = `url(${img})`;

  // Erstellen der favorite__description
  const descriptionDiv = document.createElement("div");
  descriptionDiv.classList.add("favorite__description");

  const citySpan = document.createElement("span");
  citySpan.classList.add("text", "city");
  citySpan.textContent = name;

  const countrySpan = document.createElement("span");
  countrySpan.classList.add("text");
  countrySpan.textContent = country;

  const conditionSpan = document.createElement("span");
  conditionSpan.classList.add("text");
  conditionSpan.textContent = condition;

  descriptionDiv.appendChild(citySpan);
  descriptionDiv.appendChild(countrySpan);
  descriptionDiv.appendChild(document.createElement("br"));
  descriptionDiv.appendChild(conditionSpan);

  // Erstellen der favorite__values
  const valuesDiv = document.createElement("div");
  valuesDiv.classList.add("favorite__values");

  const temperatureSpan = document.createElement("span");
  temperatureSpan.classList.add("text", "temperature");
  temperatureSpan.textContent = `${temp}°`;

  const tempRangeSpan = document.createElement("span");
  tempRangeSpan.classList.add("text");
  tempRangeSpan.textContent = `H:${maxTemp} T:${minTemp}`;

  valuesDiv.appendChild(temperatureSpan);
  valuesDiv.appendChild(document.createElement("br"));
  valuesDiv.appendChild(tempRangeSpan);

  // Anhängen der Unterelemente an die rightBox
  rightBoxDiv.appendChild(descriptionDiv);
  rightBoxDiv.appendChild(valuesDiv);

  // Anhängen der deleteBox und rightBox an die Hauptkarte
  cityEl.appendChild(deleteBoxDiv);
  cityEl.appendChild(rightBoxDiv);

  // Hinzufügen der Karte zur Liste
  document.querySelector(".favoriteList").appendChild(cityEl);

  // Event-Listener für das Klick-Ereignis auf die Stadt
  document.getElementById(name).addEventListener("click", async () => {
    let cityData = await fetchData(name);
    displayDetailView(cityData);
  });
}

export async function displayPossibleCities(city, country, id) {
  console.log(id);
  let element = document.querySelector(".suggestionList");
  const box = document.createElement("div");
  box.classList.add("suggestionList__city");
  box.classList.add(city);
  const cityName = document.createElement("span");
  cityName.classList.add("cityNameSuggestion");
  cityName.setAttribute("id", city);
  const countryName = document.createElement("span");
  const text = document.createTextNode(city);
  const countryText = document.createTextNode(country);
  cityName.appendChild(text);
  countryName.appendChild(countryText);
  box.appendChild(cityName);
  box.appendChild(countryText);
  box.addEventListener("click", async () => {
    const cityEl = document.getElementById(city);
    let cityData = await fetchData(cityEl.innerHTML);
    displayDetailView(cityData, id);
  });
  element.appendChild(box);
}

export function showNoFavorites() {
  const el = document.createElement("span");
  const el_text = document.createTextNode("keine Favoriten gespeichert");
  el.appendChild(el_text);
  app.appendChild(el);
}

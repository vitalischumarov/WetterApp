import "../Style/favoritesViewStyle.scss";

const app = document.querySelector(".app");

export function display() {
  showHeader();
  changeBackground();
}

function showHeader() {
  const basicStructure = `
    <div class="app">
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
          <div class="favoriteList"></div>
      </div>
    `;
  app.innerHTML = basicStructure;
}

export function showCity(
  name,
  country,
  condition,
  temp,
  maxTemp,
  minTemp,
  img,
) {
  const city = `
    <div class="favorite">
      <div class="deleteBox ${name}"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="deleteBox__icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
      </div>
      <div class="rightBox" id="${name}" style="background-image: url(${img})">
        <div class="favorite__description">
        <span class="text city">Stadt</span>
        <span class="text">Land</span>
        <br />
        <span class="text">Condition</span>
      </div>
      <div class="favorite__values">
      <span class="text temperature">Temp°</span>
      <br />
      <span class="text">H: T:</span>
      </div>
      </div>
     </div>`;

  document.querySelector(".favoriteList").innerHTML += city;
}
function changeBackground() {
  app.style.backgroundImage = "none";
  app.style.backgroundColor = "red";
}

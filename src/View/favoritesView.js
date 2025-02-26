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

function changeBackground() {
  app.style.backgroundImage = "none";
  app.style.backgroundColor = "red";
}

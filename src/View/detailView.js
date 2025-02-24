import "../Style/detailViewStyle.scss";

const app = document.querySelector(".app");

export function showHeader() {
  const header = `<div class="header">
                  <div class="left_icon">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="backIcon"
                      >
                          <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                          />
                      </svg>
                  </div>
                  <div class="right_icon">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="saveButton__icon"
                      >
                          <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                          />
                      </svg>
                  </div>
              </div>`;

  app.innerHTML += header;
}

export function showCurrentCityInformation(cityName) {
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
              </div>`;
  app.innerHTML += currentInformation;
}

export function showTwentyFourHourForecast(time, icon, temperature) {
  const inputForForecast = document.querySelector(".allForcasts");
  const forcastInformation = `
    <div class="forecastData">
      <div class="forecastData__time text">
      Time Value
      </div>
      <div class="forecastData__image">
        <img src="image_url" alt="Weather image">
      </div>
      <div class="forecastData__temp text">
      Temperature Value
      </div>
    </div>`;
  inputForForecast.innerHTML += forcastInformation;
}

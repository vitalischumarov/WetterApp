import "../View/loadingView";

export async function fetchData(cityName) {
  const WEATHER_API_1 =
    "http://api.weatherapi.com/v1/forecast.json?key=4d9509708acc49a6a8740155253101&q=";
  const WEATHER_API_2 = "&lang=DE&days=3";
  let response = await fetch(WEATHER_API_1 + cityName + WEATHER_API_2);
  if (!response.status) {
    return;
  }
  let data = await response.json();
  return data;
}

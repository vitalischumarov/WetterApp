import "../Style/loadingView.scss";

export function showingLoadingScreen() {
  console.log("loading view wird angezeigt");
  const container = document.createElement("div");
  container.classList.add("loadingContainer");
  const span = document.createElement("span");
  span.classList.add("loader");
  container.appendChild(span);
  document.querySelector(".app").appendChild(container);
}

export function disableLoading() {
  const spinners = document.querySelectorAll(".loadingContainer");
  spinners.forEach((element) => {
    element.remove();
  });
}

export function disableFavoriteView() {
  document.querySelector(".header_favorite").classList.add("hide");
  document.querySelector(".inputField").classList.add("hide");
  document.querySelector(".suggestionList").classList.add("hide");
  document.querySelector(".favoriteList").classList.add("hide");
}

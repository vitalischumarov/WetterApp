import "../Style/loadingView.scss";

export function showingLoadingScreen() {
  console.log("loading view wird angezeigt");
  document.querySelector(".app").innerHTML = `<span class="loader"></span>`;
}

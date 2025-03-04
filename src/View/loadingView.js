import "../Style/loadingView.scss";

export function showingLoadingScreen() {
  document.querySelector(".app").innerHTML = `<span class="loader"></span>`;
}

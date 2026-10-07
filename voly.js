// app.js
const state = { A: 0, B: 0, setA: 0, setB: 0, serving: "A" };

function showPopup(id) {
  document.getElementById(id).classList.remove("hidden");
}

function hidePopup(id) {
  document.getElementById(id).classList.add("hidden");
}

function render() {
  document.getElementById("scoreA").textContent = state.A;
  document.getElementById("scoreB").textContent = state.B;
  document.getElementById("setA").textContent = state.setA;
  document.getElementById("setB").textContent = state.setB;
  document.getElementById("serve").textContent = state.serving === "A" ? "◀" : "▶";
}

function checkSetWinner() {
  if (state.A >= 25 && state.A - state.B >= 2) {
    return "A";
  }
  if (state.B >= 25 && state.B - state.A >= 2) {
    return "B";
  }
  return null; // no winner yet
}

function Reset() {
  state.A = 0;
  state.B = 0;
  state.setA = 0;
  state.setB = 0;
  render();
  showPopup("servePopup");
}

function nextSet() {
  const winner = checkSetWinner();
  if (winner === null) {
    return;
  }
  state["set" + winner]++;
  state.A = 0;
  state.B = 0;
  render();
  hidePopup("winPopup");
  showPopup("servePopup");
}
function change(team, amount) {
  state[team] = Math.max(0, state[team] + amount);
  if (amount > 0) state.serving = team;
  render();

  const winner = checkSetWinner();
  if (winner) {
    document.getElementById("winText").textContent = "Team " + winner + " wins the set!";
    document.getElementById("winnerarrow").textContent = winner === "A" ? "◀" : "▶";
    const box = document.querySelector("#winPopup .popup");
    box.style.backgroundColor = getComputedStyle(document.getElementById("side" + winner)).backgroundColor;
    showPopup("winPopup");
  }
}

function chooseServe(team) {
  console.log("serve button clicked", team);
  state.serving = team;
  render();
  hidePopup("servePopup");
}

document.getElementById("sideA").addEventListener("click", () => change("A", 1));
document.getElementById("sideB").addEventListener("click", () => change("B", 1));
document.getElementById("nextSet").addEventListener("click", nextSet);
document.getElementById("Reset").addEventListener("click", Reset);
document.getElementById("serveA").addEventListener("click", () => chooseServe("A"));
document.getElementById("serveB").addEventListener("click", () => chooseServe("B"));


if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}


render();
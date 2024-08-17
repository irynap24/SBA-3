const options = {
  brat: "It's ____ summer",
  pepper: "Salt's partner",
  stop: "opposite of go",
  classics: "what you wanna hear in the club",
  feathers: "whats heavier, a kilorgram of steel, or a kilogram of",
  kilogram: "but they both weight a ",
};

// Initial References
const message = document.getElementById("message");
const hintRef = document.querySelector(".hint-ref");
const controls = document.querySelector(".controls-container");
const startBtn = document.getElementById("start");
const letterContainer = document.getElementById("letter-container");
const userInpSection = document.getElementById("user-input-section");
const resultText = document.getElementById("result");
const word = document.getElementById("word");
const tryAgainBtn = document.getElementById("tryAgain");
const gameOverSound = document.getElementById("gameOverSound");

const words = Object.keys(options);
let randomWord = "",
  randomHint = "";
let winCount = 0,
  lossCount = 0;

const generateRandomValue = (array) => Math.floor(Math.random() * array.length);
const blocker = () => {
  let lettersButtons = document.querySelectorAll(".letters");
  lettersButtons.forEach((button) => (button.disabled = true));
  stopGame();
};

const stopGame = () => {
  controls.classList.remove("hide");
  tryAgainBtn.classList.remove("hide"); // Show the "Try Again" button
  startBtn.classList.add("hide"); // Hide the "Start" button
};

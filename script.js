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

const clearGameState = () => {
  resultText.innerHTML = "";
  word.innerHTML = "";
  userInpSection.innerHTML = "";
  letterContainer.innerHTML = "";
  message.innerText = "";
};

tryAgainBtn.addEventListener("click", () => {
  clearGameState(); // Clear any lingering game end messages
  init();
  tryAgainBtn.classList.add("hide"); // Hide the "Try Again" button
  startBtn.classList.remove("hide"); // Show the "Start" button
});

startBtn.addEventListener("click", () => {
  controls.classList.add("hide");
  init();
});

const generateWord = () => {
  letterContainer.classList.remove("hide");
  userInpSection.innerText = "";
  randomWord = words[generateRandomValue(words)];
  randomHint = options[randomWord];
  hintRef.innerHTML = `<div id="wordHint"><span>Hint: </span>${randomHint}</div>`;
  let displayItem = "";
  randomWord.split("").forEach(() => {
    displayItem += '<span class="inputSpace">_ </span>';
  });
  userInpSection.innerHTML = displayItem;
  userInpSection.innerHTML += `<div id='chanceCount'>Chances Left: ${lossCount}</div>`;
};

const init = () => {
  winCount = 0;
  lossCount = 5;
  randomWord = "";
  randomHint = "";
  letterContainer.classList.add("hide");
  clearGameState();
  generateWord();

  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    button.innerText = String.fromCharCode(i);
    button.addEventListener("click", () => {
      message.innerText = `Correct Letter`;
      message.style.color = "#008000";
      let charArray = randomWord.toUpperCase().split("");
      let inputSpace = document.getElementsByClassName("inputSpace");

      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          if (char === button.innerText) {
            button.classList.add("correct");
            inputSpace[index].innerText = char;
            winCount += 1;
            if (winCount == charArray.length) {
              resultText.innerHTML = "You Won";
              startBtn.innerText = "Restart";
              blocker();
            }
          }
        });
      } else {
        button.classList.add("incorrect");
        lossCount -= 1;
        document.getElementById(
          "chanceCount"
        ).innerText = `Chances Left: ${lossCount}`;
        message.innerText = `Incorrect Letter`;
        message.style.color = "#ff0000";
        if (lossCount == 0) {
          word.innerHTML = `The word was: <span>${randomWord}</span>`;
          resultText.innerHTML = "Game Over";
          blocker();
        }
      }
      button.disabled = true;
    });
    letterContainer.appendChild(button);
  }
};

window.onload = () => {
  init();
};

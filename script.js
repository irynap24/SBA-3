const options = {
  brat: "It's ____ summer",
  pepper: "Salt's partner",
  stop: "opposite of go",
  classics: "what you wanna hear in the club",
  feathers: "whats heavier, a kilogram of steel, or a kilogram of",
  kilogram: "but they both weigh a ",
};

const message = document.getElementById("message");
const hintRef = document.querySelector(".hint-ref");
const controls = document.querySelector(".controls-container");
const startBtn = document.getElementById("start");
const letterContainer = document.getElementById("letter-container");
const userInput = document.getElementById("user-input");
const resultText = document.getElementById("result");
const word = document.getElementById("word");
const gameOverSound = document.getElementById("gameOverSound");
const words = Object.keys(options);
let randomWord = "",
  randomHint = "";
let winCount = 0,
  lossCount = 0;

// Generate random value
const generateRandomValue = (array) => Math.floor(Math.random() * array.length);

// Block all the buttons
const blocker = () => {
  let lettersButtons = document.querySelectorAll(".letters");
  lettersButtons.forEach((button) => (button.disabled = true));
};

// Start Game
startBtn.addEventListener("click", () => {
  controls.classList.add("hide");
  startBtn.style.display = "none"; // Hide the Start button
  initializeGame();
});

// Stop Game
const stopGame = () => {
  controls.classList.remove("hide");
  tryAgainButton(); // Create "Try Again" button when the game is stopped
};

// Create Try Again button
const tryAgainButton = () => {
  let existingButton = document.getElementById("try-again");
  if (!existingButton) {
    let tryAgainButton = document.createElement("button");
    tryAgainButton.id = "try-again";
    tryAgainButton.innerText = "Try Again";
    tryAgainButton.classList.add("try-again");
    tryAgainButton.addEventListener("click", () => {
      startBtn.style.display = "block"; // Show the Start button again
      document.getElementById("try-again").remove(); // Remove Try Again button
      startBtn.click(); // Simulate a click on the start button to restart the game
    });
    controls.appendChild(tryAgainButton);
  }
};

// Generate Word Function
const generateWord = () => {
  letterContainer.classList.remove("hide");
  userInput.innerText = "";
  randomWord = words[generateRandomValue(words)];
  randomHint = options[randomWord];
  hintRef.innerHTML = `<div id="wordHint">
  <span>Hint: </span>${randomHint}</div>`;
  let displayItem = "";
  randomWord.split("").forEach((value) => {
    displayItem += '<span class="inputSpace">_ </span>';
  });

  // Display each element as span
  userInput.innerHTML = displayItem;
  userInput.innerHTML += `<div id='chanceCount'>Chances Left: ${lossCount}</div>`;
};

// Initial Function
const initializeGame = () => {
  winCount = 0;
  lossCount = 5;
  randomWord = "";
  word.innerText = "";
  randomHint = "";
  message.innerText = "";
  userInput.innerHTML = "";
  letterContainer.classList.add("hide");
  letterContainer.innerHTML = "";
  generateWord();

  // For creating letter buttons
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    button.innerText = String.fromCharCode(i);

    // Character button onclick
    button.addEventListener("click", () => {
      message.style.color = "#008000";
      let charArray = randomWord.toUpperCase().split("");
      let inputSpace = document.getElementsByClassName("inputSpace");

      // If array contains clicked value replace the matched Dash with Letter
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          // If character in array is same as clicked button
          if (char === button.innerText) {
            button.classList.add("correct");
            // Replace dash with letter
            inputSpace[index].innerText = char;
            // Increment counter
            winCount += 1;
            // If winCount equals word length
            if (winCount == charArray.length) {
              resultText.innerHTML = "You Won";
              startBtn.innerText = "Restart";
              // Block all buttons
              blocker();
              stopGame(); // Stop the game and show Try Again button
            }
          }
        });
      } else {
        // Lose count
        button.classList.add("incorrect");
        lossCount -= 1;
        document.getElementById(
          "chanceCount"
        ).innerText = `Chances Left: ${lossCount}`;
        message.style.color = "#ff0000";
        if (lossCount == 0) {
          word.innerHTML = `The word was: <span>${randomWord}</span>`;
          resultText.innerHTML = "Game Over";
          blocker();
          gameOverSound.play();
          stopGame(); // Stop the game and show Try Again button
        }
      }

      // Disable clicked buttons
      button.disabled = true;
    });

    // Append generated buttons to the letters container
    letterContainer.appendChild(button);
  }
};

window.onload = () => {
  initializeGame();
};

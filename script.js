// Options for hints corresponding to different words
const options = {
  brat: "It's ____ summer",
  pepper: "Salt's partner",
  stop: "opposite of go",
  classics: "what you wanna hear in the club",
  feathers: "whats heavier, a kilogram of steel, or a kilogram of",
  kilogram: "but they both weigh a ",
};

// DOM elements
const message = document.getElementById("message");
const hintRef = document.querySelector(".hint-ref");
const controls = document.querySelector(".controls-container");
const startBtn = document.getElementById("start");
const letterContainer = document.getElementById("letter-container"); // Container for letter buttons
const userInput = document.getElementById("user-input"); // Element to display blanks for the word
const resultText = document.getElementById("result"); // Element to display game result (win/lose)
const word = document.getElementById("word"); // Element to display the guessed word
const gameOverSound = document.getElementById("gameOverSound"); // Sound to play when game is lost
const words = Object.keys(options); // Array of words from the options object
let randomWord = "", // Variable to hold the randomly selected word
  randomHint = ""; // Variable to hold the hint for the selected word
let winCount = 0,
  lossCount = 0;

// Generate a random index based on the array length
const generateRandomValue = (array) => Math.floor(Math.random() * array.length);

// Disable all letter buttons to prevent re-selection if a letter is not in the word
const blocker = () => {
  let lettersButtons = document.querySelectorAll(".letters");
  lettersButtons.forEach((button) => (button.disabled = true));
};

// Event listener for the Start button
startBtn.addEventListener("click", () => {
  controls.classList.add("hide"); // Hide the controls container
  startBtn.style.display = "none"; // Hide the Start button
  initializeGame(); // Initialize the game
});

// Stop Game function, handles both "Try Again" and "Play Again" buttons
const stopGame = (gameWon) => {
  controls.classList.remove("hide"); // Show the controls container
  if (gameWon) {
    playAgainButton(); // Create "Play Again" button when the game is won
    resultText.innerHTML = `Congrats! You guessed <span>${randomWord}</span>`; // Display the win message with the correct word
  } else {
    tryAgainButton(); // Create "Try Again" button when the game is stopped
    resultText.innerHTML = "Game Over"; // Display game over message
  }
};

// Function to create and display the Try Again button after losing game
const tryAgainButton = () => {
  let existingButton = document.getElementById("try-again");
  if (!existingButton) {
    let tryAgainButton = document.createElement("button");
    tryAgainButton.id = "try-again";
    tryAgainButton.innerText = "Try Again";
    tryAgainButton.classList.add("try-again");
    tryAgainButton.addEventListener("click", () => {
      startBtn.style.display = "block"; // Show the Start button again
      document.getElementById("try-again").remove(); // Remove the Try Again button
      startBtn.click(); // Simulate a click on the Start button to restart the game
    });
    controls.appendChild(tryAgainButton);
  }
};
// Create Play Again button after winning a game
const playAgainButton = () => {
  let existingButton = document.getElementById("play-again");
  if (!existingButton) {
    let playAgainButton = document.createElement("button"); // Create the Play Again button
    playAgainButton.id = "play-again";
    playAgainButton.innerText = "Play Again"; // Set button text
    playAgainButton.classList.add("play-again"); // Add class for styling
    playAgainButton.addEventListener("click", () => {
      startBtn.style.display = "block"; // Show the Start button again
      document.getElementById("play-again").remove(); // Remove the Play Again button
      startBtn.click(); // Simulate a click on the Start button to restart the game
    });
    controls.appendChild(playAgainButton); // Add the Play Again button to the controls container
  }
};

// Function to generate a new word and hint for the game
const generateWord = () => {
  letterContainer.classList.remove("hide"); // Show the letter buttons container
  userInput.innerText = ""; // Clear previous word display
  randomWord = words[generateRandomValue(words)]; // Select a random word
  randomHint = options[randomWord]; // Get the hint for the selected word
  hintRef.innerHTML = `<div id="wordHint">
  <span>Hint: </span>${randomHint}</div>`; // Display the hint

  // Create a display of underscores (_ _ _ _) for each letter in the word
  let underscorePlaceholder = "";
  randomWord.split("").forEach(() => {
    underscorePlaceholder += '<span class="inputSpace">_ </span>';
  });

  userInput.innerHTML = underscorePlaceholder; // Display underscores in the user input area
  userInput.innerHTML += `<div id='chanceCount'>Chances Left: ${lossCount}</div>`; // Display remaining chances
};

// Initialize the game
const initializeGame = () => {
  winCount = 0; // Reset win count
  lossCount = 5; // Set initial number of chances
  randomWord = ""; // Clear previous word
  word.innerText = ""; // Clear displayed word
  randomHint = ""; // Clear previous hint
  message.innerText = ""; // Clear message display
  userInput.innerHTML = ""; // Clear user input display
  letterContainer.classList.add("hide"); // Hide letter buttons container
  letterContainer.innerHTML = ""; // Clear letter buttons

  generateWord(); // Generate a new word and hint

  // Create letter buttons for the alphabet
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button"); // Create a button for each letter
    button.classList.add("letters");
    button.innerText = String.fromCharCode(i); // Set button text to letter

    // Event listener for letter button clicks
    button.addEventListener("click", () => {
      let charArray = randomWord.toUpperCase().split(""); // Convert word to uppercase and split into an array
      let inputSpace = document.getElementsByClassName("inputSpace"); // Get all input spaces (underscores)

      // Check if the clicked letter is in the word
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          // If character matches clicked button, replace underscore with letter
          if (char === button.innerText) {
            button.classList.add("correct"); // Mark button as correct
            inputSpace[index].innerText = char; // Replace underscore with letter
            winCount += 1; // Increment win count
            // Check if all letters have been guessed
            if (winCount === charArray.length) {
              blocker(); // Disable all letter buttons
              // Slight delay before showing the win message
              setTimeout(() => {
                resultText.innerHTML = `Congrats! You guessed <span>${randomWord}</span>`; // Display the win message with the correct word
                stopGame(true); // Call stopGame with true to show Play Again button
              }, 2000); // Delay of 2,000 milliseconds
            }
          }
        });
      } else {
        // Handle incorrect guesses
        button.classList.add("incorrect"); // Mark button as incorrect
        lossCount -= 1; // Decrement loss count
        document.getElementById(
          "chanceCount"
        ).innerText = `Chances Left: ${lossCount}`; // Update chances left
        message.style.color = "#ff0000"; // Set message color to red for incorrect guesses
        // Check if no chances are left
        if (lossCount === 0) {
          word.innerHTML = `The word was: <span>${randomWord}</span>`; // Display the word
          blocker(); // Disable all letter buttons
          gameOverSound.play(); // Play game over sound
          stopGame(false); // Stop the game and show Try Again button
        }
      }

      button.disabled = true;
    });

    letterContainer.appendChild(button); // Add the button to the letter container
  }
};

// Initialize the game when the window loads
window.onload = () => {
  initializeGame();
};

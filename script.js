const input = document.querySelector("input"),
  guess = document.querySelector(".guess"),
  checkButton = document.getElementById("guessBtn"),
  remainChances = document.querySelector(".chances"),
  guessedList = document.querySelector(".guessed"),
  overlay = document.getElementById("overlay"),
  resultBox = document.querySelector(".result-box"),
  resultTitle = document.getElementById("resultTitle"),
  resultText = document.getElementById("resultText"),
  restartBtn = document.getElementById("restartBtn");

const MAX_CHANCES = 10;

let randomNum;
let chance;
let guessedNumbers;

function newGame() {
  randomNum = Math.floor(Math.random() * 100) + 1; // 1 to 100
  chance = MAX_CHANCES;
  guessedNumbers = [];

  remainChances.textContent = chance;
  guess.textContent = "";
  guessedList.textContent = "";
  input.value = "";
  input.disabled = false;
  checkButton.disabled = false;
  overlay.hidden = true;
  input.focus();
}


input.addEventListener("input", () => {
  input.value = input.value.replace(/\D/g, "");
});

function showResult(won) {
  resultBox.classList.toggle("won", won);
  resultBox.classList.toggle("lost", !won);
  resultTitle.textContent = won ? "You won the game! " : "You lost the game!";
  resultText.textContent = won
    ? "Great job! You guessed " + randomNum + " in " + (MAX_CHANCES - chance) + " guesses."
    : "The number was " + randomNum + ".";
  restartBtn.textContent = won ? "Play again" : "Try again";
  input.disabled = true;
  checkButton.disabled = true;
  overlay.hidden = false;
  restartBtn.focus();
}

function checkGuess() {
  if (input.disabled) return;

  const value = Number(input.value);

  if (input.value === "") {
    guess.textContent = "Enter a number from 1 to 100";
    guess.style.color = "#DE0611";
    input.focus();
    return;
  }


  if (!Number.isInteger(value) || value < 1 || value > 100) {
    guess.textContent = "Your number is invalid";
    guess.style.color = "#DE0611";
    input.value = "";
    input.focus();
    return;
  }

 
  if (guessedNumbers.includes(value)) {
    guess.textContent = "You already tried " + value;
    guess.style.color = "#DE0611";
    input.value = "";
    input.focus();
    return;
  }

  chance--;
  guessedNumbers.push(value);
  remainChances.textContent = chance;
  guessedList.textContent = "Numbers you guessed: " + guessedNumbers.join(", ");
  input.value = "";
  input.focus();

  if (value === randomNum) {
    guess.textContent = "";
    showResult(true);
  } else if (chance === 0) {
    guess.textContent = "";
    showResult(false);
  } else {
    guess.textContent = value > randomNum ? "Your guess is high" : "Your guess is low";
    guess.style.color = "#333";
  }
}

checkButton.addEventListener("click", checkGuess);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkGuess();
});
restartBtn.addEventListener("click", newGame);

newGame();

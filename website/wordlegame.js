import { getSolution } from "./wordchangetest.js";

let Solution = getSolution();
let Sol_array = Solution.split("");
let ValidWordSet = new Set();
async function loadWordList() {
  const response = await fetch("ValidWords.json"); // Step 1: Fetch the file
  const wordsArray = await response.json(); // Step 2: Parse JSON into array
  ValidWordSet = new Set(wordsArray.map((word) => word.toUpperCase())); // Normalize & store
}
function endgame(result) {
  const postgame = document.querySelector(".postgame");
  const postgametext = document.querySelector(".postgame-title");
  postgametext.textContent =
    result === "win" ? "🎉 You Win!" : `😢 You Lost! Word was ${Solution}`;
  postgame.style.display = "flex"; // show overlay
  wordle.style.display = "none"; // hide grid
}

(async () => {
  await loadWordList();
  console.log(`Dictionary loaded. ${ValidWordSet.size} words ready.`);
})();

function checkValid(array) {
  let word = array.join("");
  console.log(
    "checking word:",
    word,
    "in set?",
    ValidWordSet.has(word.toUpperCase())
  );
  return ValidWordSet.has(word.toUpperCase()); // Always compare uppercase
}

const wordle = document.querySelector(".wordle");
let currentRow = 1;
let currentCol = 1;
let choice = [];
let last_attempt = "";
let letter = "";

wordle.addEventListener("click", () => {
  console.log("playing wordle");
  wordle.focus();
});

wordle.addEventListener("keydown", (event) => {
  if (event.key.length === 1 && /[a-z]/i.test(event.key)) {
    if (currentCol <= 5) {
      const cell = document.getElementById(`cell-${currentRow}${currentCol}`);
      letter = event.key.toUpperCase();
      cell.textContent = letter;
      choice.push(letter);
      console.log(choice);
      currentCol++;
    }
  }

  if (currentCol > 5 && event.key === "Enter") {
    if (checkValid(choice)) {
      let index = 0;
      let row = currentRow;
      let col = 1;
      while (col < currentCol) {
        let cellid = `cell-${row}${col}`;
        let cell = document.getElementById(cellid);
        console.log(choice[index]);
        let letter = choice[index];
        if (letter == Sol_array[index]) {
          cell.style.backgroundColor = "green";
        } else if (Sol_array.includes(letter)) {
          cell.style.backgroundColor = "yellow";
          cell.style.color = "black";
        } else cell.style.backgroundColor = "gray";

        index++;
        col++;
      }

      last_attempt = choice.join("");
      if (last_attempt === Solution) {
        endgame("win");
        return;
      }
      if (currentRow === 6) {
        endgame("lose");
        return;
      }

      console.log("Moving to next row");

      choice = [];
      currentCol = 1;
      currentRow++;
    } else {
      alert("invalid word");
    }
  } else if (event.key == "Backspace" && currentCol > 1) {
    currentCol--;
    const cell = document.getElementById(`cell-${currentRow}${currentCol}`);
    console.log("Backspace key pressed!");
    cell.textContent = null;
    choice.pop();
    console.log(choice);
  }
});

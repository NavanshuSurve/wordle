console.log("I will tell you what date it is today");
let solution = null;
let Solutions = null;

async function loadWordList() {
  try {
    const response = await fetch("ValidWords.json"); // Step 1: Fetch the file
    const wordsArray = await response.json(); // Step 2: Parse JSON into array
    Solutions = wordsArray.map((word) => word.toUpperCase());
  } catch (error) {
    console.error("Failed to load Solutions due to", error);
    throw error;
  }
}
async function runDailyTask() {
  //Set Solution
  await loadWordList();
  const randomword = Solutions[Math.floor(Math.random() * Solutions.length)];
  solution = randomword;
  localStorage.setItem("solutionWord", solution);
  console.log("Todays word is", solution);
}

const lastRun = localStorage.getItem("lastRunDate");
const today = new Date().toDateString();

(async () => {
  if (lastRun != today) {
    await runDailyTask();
    localStorage.setItem("lastRunDate", today);
  } else {
    solution = localStorage.getItem("solutionWord");
    console.log("reusing todays solution");
  }
})();

export function getSolution() {
  return solution;
}

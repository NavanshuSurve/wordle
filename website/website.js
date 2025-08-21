


function play(UserChoice) {
  const choices = ["rock", "paper", "scissors"];
  let pcchoice = choices[Math.floor(Math.random() * choices.length)];
  result = "";
  console.log(pcchoice);
  if (UserChoice == pcchoice) {
    result = "TIE";
  } else if (
    (UserChoice == "rock" && pcchoice == "scissors") ||
    (UserChoice == "paper" && pcchoice == "rock") ||
    (UserChoice == "scissors" && pcchoice == "paper")
  ) {
    result = "WIN";
  } else {
    result = "LOSE";
  }

  const newDiv = document.createElement("div");
  newDiv.style.width = "200px";
  newDiv.style.height = "50px";
  newDiv.style.backgroundColor = "orange";
  newDiv.style.margin = "5px";
  newDiv.textContent = `YOU chose: ${UserChoice} and the CAT chose: ${pcchoice}. YOU ${result}`;

  document.querySelector(".result").appendChild(newDiv);
}
document.querySelectorAll(".hand").forEach((btn) => {
  btn.addEventListener("click", () => {
    const choice = btn.id;
    play(choice);
  });
});

async function catfacts() {
  try {
    const response = await axios.get("https://catfact.ninja/facts");

    let choice =
      response.data.data[Math.floor(Math.random() * response.data.data.length)];

    const factText = choice.fact;
    const box = document.querySelector(".catfacts");
    box.textContent = factText;
  } catch (error) {
    alert(`Error: ${error}`);
  }
}
catfacts();



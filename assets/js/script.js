let gameBoard = document.querySelectorAll(".cell");
let turnLetter = document.querySelector("#turnContainer");
let resetButton = document.querySelector("#reset");
let turn = document.querySelector("#turn");
let gameState = [null, null, null, null, null, null, null, null, null];
let currentPlayer = "X";
let computerPlayer = "O";
let multiPlayerSelected = false;
let singlePlayerSelected = false;
let player = currentPlayer;
let winningCombinations = [
[0, 1, 2], // Top row
[3, 4, 5], // Middle row
[6, 7, 8], // Bottom row
[0, 3, 6], // Left column
[1, 4, 7], // Middle column
[2, 5, 8], // Right column
[0, 4, 8], // Diagonal top-left to bottom-right
[2, 4, 6], // Diagonal top-right to bottom-left
];
let gameStillActive = true;

multiplayerOrSingle();
startGame();
restart();
whosTurn();
console.log(multiPlayerSelected);

function multiplayerOrSingle() {
let multiplayer = document.querySelector("#multiplayerbutton");
if (multiplayer) {
multiplayer.addEventListener("click", function () {
multiPlayerSelected = true;
});
}
let singleplayer = document.querySelector("#singleplayerbutton");
if (singleplayer) {
singleplayer.addEventListener("click", function () {
singlePlayerSelected = true;
});
}
}

function startGame() {
let startButton = document.querySelector("#start");
startButton.addEventListener("click", function () {
startButton.style.display = "none";
resetButton.style.display = "flex";
turnLetter.style.opacity = "1";
game();
});
}

function game() {
gameBoard.forEach((cell, index) => {
cell.addEventListener("click", function (event) {
if (!gameStillActive) return;
turnLetter.style.opacity = "100%";
if (gameState[index] == null) {
gameState[index] = currentPlayer;
cell.innerText = currentPlayer;
let winner = checkWinner();
if (winner) {
jiggle(winner);
gameStillActive = false;
event.preventDefault();
return;
}
console.log(gameState);
switchPlayer();
setTimeout(computersTurn, 300);
}
});
});
}

function computersTurn() {
if (multiPlayerSelected == true) {
let available = [];

for (let i = 0; i < gameState.length; i++)
if (gameState[i] === null) {
available.push(i);
}
let random = Math.floor(Math.random() * available.length);
let computerIndex = available[random];
gameState[computerIndex] = computerPlayer;
gameBoard[computerIndex].innerText = computerPlayer;
let winner = checkWinner();
if (winner) {
jiggle(winner);
gameStillActive = false;
return;
}
switchPlayer();
game();
}
}

function checkWinner() {
for (let combo of winningCombinations) {
if (combo.every((index) => gameState[index] === "X")) {
return combo;
} else if (combo.every((index) => gameState[index] === "O")) {
return combo;
}
}
}

function restart() {
resetButton.addEventListener("click", function () {
gameStillActive = true;
gameState = [null, null, null, null, null, null, null, null, null];
gameBoard.forEach((cell) => {
cell.innerText = "";
turnLetter.style.opacity = "60%";
cell.classList.remove("jiggle");
});
});
}

function switchPlayer() {
if (multiPlayerSelected == true) {
player = player === computerPlayer ? currentPlayer : computerPlayer;
whosTurn();
} else if (singlePlayerSelected == true) {
currentPlayer = currentPlayer === "X" ? "O" : "X";
whosTurn();
}
}

function whosTurn() {
if (player == currentPlayer) {
turn.innerText = currentPlayer;
} else if (player == computerPlayer) {
turn.innerText = computerPlayer;
} else {
turn.innerText = currentPlayer;
}
}

function jiggle(winningCombo) {
winningCombo.forEach((index) => {
gameBoard[index].classList.add("jiggle");
});
}

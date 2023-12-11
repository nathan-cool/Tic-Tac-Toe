let gameBoard = document.querySelectorAll(".cell");
let turnLetter = document.querySelector("#turnContainer");
let resetButton = document.querySelector("#reset");
let turn = document.querySelector("#turn");
let gameState = [null, null, null, null, null, null, null, null, null];
let currentPlayer = "X";
let computerPlayer = "O";
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


startGame();
whosTurn();
restart()

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
        cell.addEventListener("click", function () {
            turnLetter.style.opacity = "100%";
            if (gameState[index] == null) {
                gameState[index] = currentPlayer;
                cell.innerText = currentPlayer;
                switchPlayer();
                if (Checkwinner()) {
                    jiggle(winner);
                }
            }
        });
    });
}

function checkWinner() {
    for (let combo of winningCombinations) {
        if (combo.every((index) => gameState[index] ===  currentPlayer)) {
            return combo;
        } else if (combo.every((index) => gameState[index] === computerPlayer)) {
            return combo;
        }
    }
    return null;
}

function restart() {
    resetButton.addEventListener("click", function () {
        gameState = [null, null, null, null, null, null, null, null, null];
        gameBoard.forEach((cell) => {
            cell.innerText = "";
            turnLetter.style.opacity = "60%";
            cell.classList.remove("jiggle");
        });
    });
}

function switchPlayer() {
    currentPlayer = (currentPlayer === currentPlayer) ? computerPlayer : currentPlayer;
    whosTurn();
}

function whosTurn() {
    if (currentPlayer) {
        turn.innerText = currentPlayer;
    } else if (computerPlayer) {
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
let gameBoard = document.querySelectorAll(".cell");

let gameState = [null, null, null, null, null, null, null, null, null];

let currentPlayer = "X";

let winningCombinations = [
    [0, 1, 2],  // Top row
    [3, 4, 5],  // Middle row
    [6, 7, 8],  // Bottom row
    [0, 3, 6],  // Left column
    [1, 4, 7],  // Middle column
    [2, 5, 8],  // Right column
    [0, 4, 8],  // Diagonal top-left to bottom-right
    [2, 4, 6]   // Diagonal top-right to bottom-left
];

gameBoard.forEach((cell, index) => {
    cell.addEventListener("click", function() {
        if (gameState[index] == null) {
            gameState[index] = currentPlayer
            cell.innerText = currentPlayer;
            switchPlayer();
            if (checkWinner()) {
                alert("You won!");
                restart();
            }
            else {
                switchPlayer();
            }
        }
    });
});


function checkWinner(){
    for (let combo of winningCombinations) {
        if (combo.every(index => gameState[index] === "X" )){
            return true;
        }
    }
    return false;
}

function restart() {
    gameState= [null, null, null, null, null, null, null, null, null];
    gameBoard.forEach((cell) => {
        cell.innerText = "";
    });
}

function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

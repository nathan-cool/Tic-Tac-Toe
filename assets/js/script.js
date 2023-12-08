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

whosTurn()
startGame()


function startGame() {
    let startButton = document.querySelector("#start");
    startButton.addEventListener("click", function() {
        startButton.style.display = "none";
        document.querySelector("#reset").style.display = "flex";
        document.querySelector("#turnContainer").style.visibility = "visible";
        document.querySelector("#turnContainer").style.opacity= "1";
        game();
    });
   
    
}

function game() {
    gameBoard.forEach((cell, index) => {
        cell.addEventListener("click", function () {
            document.querySelector("#turnContainer").style.opacity = "100%";
            if (gameState[index] == null) {
                gameState[index] = currentPlayer
                cell.innerText = currentPlayer;
                switchPlayer();
                if (checkWinner()) {
                    alert("You won!");
                    restart();
                }
            }
        
        });
    });
}

function checkWinner(){
    for (let combo of winningCombinations) {
        if (combo.every(index => gameState[index] === "X")) {
            return true;
        }
    }
    for (let combo of winningCombinations) {
        if (combo.every(index => gameState[index] === "O" )){
            return true;
        }
       
    }
    
}

function restart() {
    gameState= [null, null, null, null, null, null, null, null, null];
    gameBoard.forEach((cell) => {
        cell.innerText = "";
        document.querySelector("#turnContainer").style.opacity = "60%";

    });
}

function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    whosTurn()
    
}



let reset = document.querySelector("#reset").addEventListener("click", function () {
    restart();
    console.log("reset");
});


function whosTurn(){
    let turn = document.querySelector("#turn");
    if (currentPlayer === "X") {
        turn.innerText = "X";
    } else if (currentPlayer === "O"){
        turn.innerText = "O";
        console.log("O")
    }
    else {
        turn.innerText = "X";
    }

}

function updateCellonHover() {
    gameBoard.forEach((cell, index) => {
        cell.addEventListener("mouseover", function () {
            if (gameState[index] == null) {
                cell.innerText = currentPlayer;
            }
        });
    });
    
}

function jiggle

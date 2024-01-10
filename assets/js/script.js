// Selecting game elements and setting initial states
let gameBoard = document.querySelectorAll(".cell"); // Selects all the game cells
let turnLetter = document.querySelector("#turnContainer"); // Selects the element displaying the turn
let resetButton = document.querySelector("#reset"); // Selects the reset button
let turn = document.querySelector("#turn"); // Selects the element showing whose turn it is
let startButton = document.querySelector("#start"); // Selects the start game button
let gameState = [null, null, null, null, null, null, null, null, null]; // Initializes the game state array
let currentPlayer = "X"; // Sets the current player to X
let computerPlayer = "O"; // Sets the computer player to O
let multiPlayerSelected = false; // Flag for multiplayer mode
let singlePlayerSelected = false; // Flag for single player mode
let winner = false; // Flag to indicate if there's a winner
let player = currentPlayer; // Variable to track the current player
let numberOfSquares = 9
let gameControls = document.querySelector("#gameControls")
let gameContainer = document.querySelector("#game-container")
let winningCombinations = [
    // Defines the winning combinations on the board
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6] // Diagonal top-right to bottom-left
];
let gameStillActive = true; // Flag to indicate if the game is still active

// Initial setup functions
multiplayerOrSingle(); // Calls function to choose between multiplayer or single player
restart(); // Calls function to handle game restart
whosTurn(); // Calls function to display who's turn it is
informationIcon();
// Function to choose between multiplayer or single player
function multiplayerOrSingle() {
    // Event listener for multiplayer button
    let multiplayer = document.querySelector("#multiplayerbutton");
    let singleplayer = document.querySelector("#singleplayerbutton");
    let gameControls = document.querySelector("#gameControls")
    let gameContainer = document.querySelector("#game-container")
    if (singleplayer) {
        singleplayer.addEventListener("click", function () {
            multiPlayerSelected = false;
            singlePlayerSelected = true;
            gameContainer.style.display = 'flex'
            gameControls.style.display = "none"
            startGame(); // Starts the game in multiplayer mode
        });
    }
    if (multiplayer) {
        // Event listener for single player button
        multiplayer.addEventListener("click", function () {
            multiPlayerSelected = true;
            singlePlayerSelected = false;
            gameContainer.style.display = 'flex'
            gameControls.style.display = "none"
            startGame(); // Starts the game in single player mode
        });
    }
}

// Function to start the game
function startGame() {
    startButton.style.display = "none"; // Hides the start button
    resetButton.style.display = "flex"; // Shows the reset button
    turnLetter.style.opacity = "1"; // Makes the turn display visible
    game(); // Calls the function to handle the game logic
}

// Function to handle the game logic
function game() {
    gameBoard.forEach((cell, index) => {
        // Adding click event listener to each cell
        cell.addEventListener("click", function (event) {
            if (!gameStillActive) return; // Prevent action if game is over
            turnLetter.style.opacity = "100%";
            if (gameState[index] == null) { // Check if cell is empty
                gameState[index] = currentPlayer; // Update gameState with current player's move
                cell.innerText = currentPlayer; // Display current player's symbol in cell
                let winner = checkWinner(); // Check if there's a winner
                if (winner) {
                    jiggle(winner); // Apply jiggle effect to winning combination
                    gameStillActive = false; // Set game as over
                    event.preventDefault();
                    return;
                }
                switchPlayer();
                if (singlePlayerSelected == true) {
                    setTimeout(computersTurn, 300); // Calls computer's turn after a delay
                }
               
            }
        });
    });
}

function computersTurn() {
    // Handles the computer's turn logic
    if (singlePlayerSelected == true) {
        let available = [];

        for (let i = 0; i < gameState.length; i++)
            if (gameState[i] === null) {
                available.push(i); // Finds all available cells
                console.log("test")
            }
        let random = Math.floor(Math.random() * available.length); // Selects a random cell
        let computerIndex = available[random];
        gameState[computerIndex] = computerPlayer; // Sets the computer's move in gameState
        gameBoard[computerIndex].innerText = computerPlayer; // Displays computer's move
        let winner = checkWinner();
        if (winner) {
            jiggle(winner); // Apply jiggle effect if computer wins
            gameStillActive = false; // End the game if there's a winner
            return;
            
        }
        switchPlayer(); // Switches player after computer's turn
        game(); // Continues the game
    }
}

 // Function to check if there is a winner
function checkWinner() {
    let winningMessageLetter = document.querySelector("#winningMessageLetter")
    let winningMessage = document.querySelector("#winningMessage")
    for (let combo of winningCombinations) {
        if (combo.every(index => gameState[index] === "X")) {
            winningMessageLetter.innerText = "X";
            winningMessage.style.display = "flex";
            turnLetter.style.display = "none";
            return combo; // Returns the winning combination for X
        } else if (combo.every(index => gameState[index] === "O")) {
            winningMessageLetter.innerText = "O";
            winningMessage.style.display = "flex";
            turnLetter.style.display = "none";
            return combo; // Returns the winning combination for O
        }
        tie();
    }
}

 // Function to check if there is a tie
function tie() {
    let tieChecker = 0
    for (let i = 0; i < gameState.length; i++) {
        if (gameState[i] != null) {
            tieChecker++
        }
    }
    if (tieChecker == numberOfSquares && winner == false) {
        winningMessageLetter.innerText = "Tie!";
        winningMessage.style.display = "flex";
        winningMessage.style.innerText = "";
        turnLetter.style.display = "none";
        
    }
}

function minimax() {
    let scores = { X: 10, tie: 0, O: -10 } // X is max, O is min
    let outcome = checkWinner() 
    if (checkWinner != null) { // If a winner etc was found 
        return outcome[scores] // Return the outcome[score] example, x[-10]
    }

}
    

function restart() {
    // Function to handle game restart
    resetButton.addEventListener("click", function () {
        gameStillActive = true;
        gameState = [null, null, null, null, null, null, null, null, null]; // Resets the gameState
        gameBoard.forEach(cell => {
            cell.innerText = ""; // Clears all cells
            turn.innerText = "X";
            cell.classList.remove("jiggle"); // Removes jiggle effect from all cells
            turnLetter.style.display = "flex";
            winningMessage.style.display = "none";
            currentPlayer = "X"; // Resets current player to X
        });
    });
}

function switchPlayer() {
    // Function to switch between players
    if (multiPlayerSelected == true) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        whosTurn(); // Updates the turn display
    } else if (singlePlayerSelected == true) {
        player = player === computerPlayer ? currentPlayer : computerPlayer;
        whosTurn(); // Updates the turn display for single player
    }
}

function whosTurn() {
    // Function to update the display of who's turn it is
    if (player == currentPlayer) {
        turn.innerText = currentPlayer;
    } else if (player == computerPlayer) {
        turn.innerText = computerPlayer;
    } else {
        turn.innerText = currentPlayer;
    }
}

function jiggle() {
    // Function to add jiggle effect to winning cells
    let winner = checkWinner()
    if (winner) {
        winner.forEach(index => {
            gameBoard[index].classList.add("jiggle");
        });
    }
}

function informationIcon(){
    let infoClick = document.querySelector(".navigation-link")
    infoClick.addEventListener("click", function () {
        gameControls.style.display = "flex"
        gameContainer.style.display = "none"
    })
}
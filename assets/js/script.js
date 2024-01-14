// Selecting game elements and setting initial states
let gameBoard = document.querySelectorAll(".cell"); // Selects all the game cells
let turnLetter = document.querySelector("#turnContainer"); // Selects the element displaying the turn
let resetButton = document.querySelector("#reset"); // Selects the reset button
let turn = document.querySelector("#turn"); // Selects the element showing whose turn it is
let startButton = document.querySelector("#start"); // Selects the start game button
let difficulty = document.querySelector("#difficulty")
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
let isCooldown = false;
let cellHover = document.querySelector(".cell")
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
let gameStillActive = true;// Flag to indicate if the game is still active
let easySelected = false;
let normalSelected = false;
let hardSelected = false;
let wins = document.querySelector("#wins")



// Initial setup functions
multiplayerOrSingle(); // Calls function to choose between multiplayer or single player
restart(); // Calls function to handle game restart
whosTurn(); // Calls function to display who's turn it is
informationIcon();
difficultyToStart();
// Function to choose between multiplayer or single player
function multiplayerOrSingle() {
    // Event listener for multiplayer button
    let multiplayer = document.querySelector("#multiplayerbutton");
    let singleplayer = document.querySelector("#singleplayerbutton");
    let gameControls = document.querySelector("#gameControls")
    if (singleplayer) {
        singleplayer.addEventListener("click", function () {
            multiPlayerSelected = false;
            singlePlayerSelected = true;
            difficulty.style.display = 'flex'
            gameControls.style.display = 'none'
            // Starts the game in multiplayer mode
        });
    }
    if (multiplayer) {
        // Event listener for single player button
        multiplayer.addEventListener("click", function () {
            multiPlayerSelected = true;
            singlePlayerSelected = false;
            startGame()
            // Starts the game in single player mode
        });
    }
}

function difficultyToStart() {
    let easyButton = document.querySelector("#easyButton")
    let normalButton = document.querySelector("#normalButton")
    let hardButton = document.querySelector("#hardButton")
    if (easyButton) {
        easyButton.addEventListener("click", function () {
            easySelected = true;
            normalSelected = false;
            hardSelected = false;
            startGame()
        })
    }
    if (normalButton) {
        normalButton.addEventListener("click", function () {
            easySelected = false;
            normalSelected = true;
            hardSelected = false;
            startGame()
        })
    }
    if (hardButton) {
        hardButton.addEventListener("click", function () {
            easySelected = false;
            normalSelected = false;
            hardSelected = true;
            startGame()
        })
    }

}

// Function to start the game
function startGame() {
    difficulty.style.display = 'none'
    gameControls.style.display = 'none'
    resetButton.style.display = "flex"; // Shows the reset button
    turnLetter.style.opacity = "1"; // Makes the turn display visible
    gameContainer.style.display = "flex";
    game(); // Calls the function to handle the game logic
}

// Function to handle the game logic
function game() {
    gameBoard.forEach((cell, index) => {
        // Adding click event listener to each cell
        cell.addEventListener("click", function (event) {
            if (!gameStillActive || isCooldown) return; // Prevent action if game is over or cooldown is active
            turnLetter.style.opacity = "100%";
            if (gameState[index] == null) { // Check if cell is empty
                gameState[index] = currentPlayer; // Update gameState with current player's move
                cell.innerText = currentPlayer; // Display current player's symbol in cell
                let winner = checkWinner(); // Check if there's a winner
                if (winner) {
                    event.preventDefault();
                    jiggle(winner); // Apply jiggle effect to winning combination
                    return;
                }
                isCooldown = true;

                setTimeout(() => {
                    isCooldown = false;
                }, 300);
                switchPlayer();
                if (singlePlayerSelected && easySelected) {
                    setTimeout(computersTurnEasy, 300); // Calls computer's turn after a dela
                } else if (singlePlayerSelected && normalSelected) {
                    setTimeout(computersTurnNormal, 300); // Calls computer's turn after a delay
                } else if (singlePlayerSelected && hardSelected) {
                    setTimeout(computersTurnHard, 300); // Calls computer's turn after a delay
                }
            }
        });
    });
}

function computersTurnEasy() {
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

function computersTurnNormal() {
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

function computersTurnHard() {
    let bestScore = -Infinity;
    let bestMove;
    for (let i = 0; i < gameState.length; i++) {
        if (gameState[i] === null) {
            gameState[i] = computerPlayer;
            let score = minimax(gameState, 0, false);
            gameState[i] = null;
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    gameState[bestMove] = computerPlayer;
    gameBoard[bestMove].innerText = computerPlayer;
    let winner = checkWinner();
    if (winner) {
        jiggle(winner);
        gameStillActive = false;
    } else {
        switchPlayer();
        game();
    }
}

// Function to check if there is a winner
function checkWinner() {
    let winningMessageLetter = document.querySelector("#winningMessageLetter");
    let winningMessage = document.querySelector("#winningMessage");
    let tieChecker = 0;

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
    }

    // Check for a tie
    for (let i = 0; i < gameState.length; i++) {
        if (gameState[i] != null) {
            tieChecker++;
        }
    }

    if (tieChecker === numberOfSquares) {
        winningMessageLetter.innerText = "Tie!";
        winningMessage.style.display = "flex";
        winningMessage.style.innerText = "";
        turnLetter.style.display = "none";
        wins.innerText = "";
    }
}

function minimax(board, depth, isMaximizing) {
    let result = checkWinner();
    let scores = { 'X': -10, 'O': 10, 'tie': 0 };

    if (result !== null) {
        return scores[result];
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                board[i] = computerPlayer;
                let score = minimax(board, depth + 1, false);
                board[i] = null;
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                board[i] = currentPlayer;
                let score = minimax(board, depth + 1, true);
                board[i] = null;
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
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
    }); wins.innerText = " wins!";
}

function switchPlayer() {
    // Function to switch between players
    if (multiPlayerSelected == true) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    } else if (singlePlayerSelected == true) {
        player = player === computerPlayer ? currentPlayer : computerPlayer;
    }
    whosTurn(); // Updates the turn display for single player
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

function informationIcon() {
    let infoClick = document.querySelector(".navigation-link")
    infoClick.addEventListener("click", function () {
        gameControls.style.display = "flex"
        gameContainer.style.display = "none"
    })
}

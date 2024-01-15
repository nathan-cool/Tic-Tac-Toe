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
let gameStillActive = true; // Flag to indicate if the game is still active
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

/**
* Function to choose between multiplayer or single player
* It attaches click event listeners to the Multiplayer and Single buttons. 
*/
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
/**
 * Sets up the game difficulty based on the user's selection and starts the game.
 * It attaches click event listeners to the difficulty buttons.
 * When a button is clicked, the correct difficulty level is selected and starts the game.
 */
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

/** 
*Function to start the game by calling the game function 
*Hides Difficulty, GameControls blocks*/
function startGame() {
    difficulty.style.display = 'none'
    gameControls.style.display = 'none'
    resetButton.style.display = "flex"; // Shows the reset button
    turnLetter.style.opacity = "1"; // Makes the turn display visible
    gameContainer.style.display = "flex";
    game(); // Calls the function to handle the game logic
}

/**
 * Manages the game logic. 
 * It iterates through each cell of the game board adding click event listeners to them. 
 * When a cell is clicked the function checks the game state and player's turn updates the UI
 * and determines if there's a winner. It also manages cooldowns between turns
 * in single-player mode triggers the AI based on the selected difficulty level.
 * Returns if the same id not have or there is a cooldown on clicks
 */
function game() {
    gameBoard.forEach((cell, index) => {
        cell.addEventListener("click", function (event) {
            if (!gameStillActive || isCooldown) return;
            turnLetter.style.opacity = "100%";
            if (gameState[index] == null) {
                gameState[index] = currentPlayer;
                cell.innerText = currentPlayer;
                let winner = checkWinner();

                if (winner) {
                    updateUIAfterCheck(winner);
                    event.preventDefault();
                    jiggle(winner);
                    return;
                }
                isCooldown = true;

                setTimeout(() => {
                    isCooldown = false;
                }, 300);
                switchPlayer();
                if (singlePlayerSelected && easySelected) {
                    setTimeout(computersTurnEasy, 300);
                } else if (singlePlayerSelected && normalSelected) {
                    setTimeout(computersTurnNormal, 300);
                } else if (singlePlayerSelected && hardSelected) {
                    setTimeout(computersTurnHard, 300);
                }
            }
        });
    });
}
/**
 * Function for computer's turn in easy mode single-player game. Selects a random empty cell for the computer's move
 * updates the game state and board, and checks for a winner. If there is a winner it triggers end-game.
 * Otherwise, it passes the turn to the human player and continues the game.
 */
function computersTurnEasy() { 
    if (singlePlayerSelected == true) {
        let available = [];
        for (let i = 0; i < gameState.length; i++)
            if (gameState[i] === null) {
                available.push(i); 
                console.log("test")
            }
        let random = Math.floor(Math.random() * available.length); 
        let computerIndex = available[random]; // Gets the index of the random cell
        gameState[computerIndex] = computerPlayer; // Sets the computer's move in gameState
        gameBoard[computerIndex].innerText = computerPlayer; // Displays computer's move
        let winner = checkWinner();
        if (winner) {
            jiggle(winner); // Apply jiggle effect if computer wins
            updateUIAfterCheck(winner)
            gameStillActive = false; // End the game if there's a winner
            return;
        }
        switchPlayer(); // Switches player after computer's turn
        game(); // Continues the game
    }
}

/**
 * Function for computer's turn in Normal mode single-player game. This function uses the minimax algorithm to determine 50% of the time
 * Otherwise picks a random cell for the computer's move using the easy mode function.
 */
function computersTurnNormal() {
    let random = Math.floor(Math.random() * 10);
    if (random < 5) {
        computersTurnEasy()
    } else
        computersTurnHard()
}

/** Function for computer's turn in Hard mode single-player game. This function uses the minimax algorithm to determine the best move.
 * updates the game state and board, and checks for a winner. If there is a winner triggers end-game.
 * Otherwise, it passes the turn to the human player and resumes the game. */
function computersTurnHard() {
    let bestScore = -Infinity; // Sets the best score to -Infinity
    let bestMove; // Variable to store the best move
    for (let i = 0; i < gameState.length; i++) { // Loops through all cells
        if (gameState[i] === null) { // Checks if cell is empty
            gameState[i] = computerPlayer; // Sets the computer's move in gameState
            let score = minimax(gameState, 0, false); // Calls the minimax algorithm
            gameState[i] = null; // Resets the cell to empty
            if (score > bestScore) { // Checks if the score is better than the best score
                bestScore = score; // Updates the best score
                bestMove = i; // Updates the best move
            }
        }
    }
    gameState[bestMove] = computerPlayer; // Sets the computer's move in gameState
    gameBoard[bestMove].innerText = computerPlayer; // Displays computer's move
    let winner = checkWinner(); // Checks if there's a winner
    if (winner) { // If there's a winner
        jiggle(winner); // Apply jiggle effect if computer wins
        updateUIAfterCheck(winner) // Updates the UI
        gameStillActive = false; // End the game if there's a winner
    } else {
        switchPlayer();
        game();
    }
}

/** 
 * Function to check if there's a winner. 
 * It iterates through the winning combinations and checks if the cells in the combination */
function checkWinner() {
    for (let combo of winningCombinations) {
        if (combo.every(index => gameState[index] === "X")) { // Checks if X wins
            return 'X'; // X wins
        } else if (combo.every(index => gameState[index] === "O")) { // Checks if O wins
            return 'O'; // O wins
        }
    }

    if (gameState.every(cell => cell !== null)) {
        return 'tie'; // Game is a tie
    }
    return null; // Game is still ongoing
}

/** 
 * Function to update the UI after checking for a winner.
 *  It displays the winning message or if game was a tie  
 */
function updateUIAfterCheck(result) {
    let winningMessageLetter = document.querySelector("#winningMessageLetter");
    let winningMessage = document.querySelector("#winningMessage");

    if (result === 'X' || result === 'O') {
        // Display the winner
        winningMessageLetter.innerText = result;
        winningMessage.style.display = "flex";
        turnLetter.style.display = "none";
        jiggle(result); // Function to highlight the winning combination
    } else if (result === 'tie') {
        winningMessageLetter.innerText = "Tie!";// Display a tie message
        winningMessage.style.display = "flex";
        turnLetter.style.display = "none";
    }
}

/** 
 * Function to highlight the winning combination and jiggle them
 * Finds winner by looking at the winning combination 
 */
function jiggle(winner) {
    let winningCombination = winningCombinations.find(combo =>  // Finds the winning combination
        combo.every(index => gameState[index] === winner) // Checks if the winning combination is the same as the winner
    );
    if (winningCombination) { // If there's a winning combination
        winningCombination.forEach(index => { // Apply jiggle effect to each cell in the winning combination
            gameBoard[index].classList.add("jiggle") // Adds jiggle effect to the winning combination
        });
    }
}

/** 
 * Minimax algorithm to determine the best move for the computer player 
 * It recursively simulates all possible moves in the game to determine the best move. 
 */
function minimax(board, depth, isMaximizing) { // Minimax algorithm
    let result = checkWinner(); // Checks if there's a winner
    let scores = { // Scores for each outcome
        'X': -10,
        'O': 10,
        'tie': 0
    };

    if (result !== null) { // If there's a winner
        return scores[result]; // Return the score
    }

    if (isMaximizing) { // If it's the maximizing player's turn
        let bestScore = -Infinity; // Sets the best score to -Infinity
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) { // Checks if cell is empty
                board[i] = computerPlayer; // Sets the computer's move in gameState
                let score = minimax(board, depth + 1, false); // Calls the minimax algorithm
                board[i] = null; // Resets the cell to empty
                bestScore = Math.max(score, bestScore); // Updates the best score
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity; // Sets the best score to Infinity
        for (let i = 0; i < board.length; i++) { // Loops through all cells
            if (board[i] === null) {
                board[i] = currentPlayer; // Sets the player's move in gameState
                let score = minimax(board, depth + 1, true);  // Calls the minimax algorithm
                board[i] = null; // Resets the cell to empty
                bestScore = Math.min(score, bestScore); // Updates the best score
            }
        }
        return bestScore; 
    }
}

/**
 * Resets the game to its start state when the reset button is clicked.
 * Restarts the game state, clearing the game board, setting the current player to "X"
 * and updating UI elements to their default states.
 */
function restart() {
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
    wins.innerText = " wins!";
}

/**
 * Switches the current player. In multiplayer mode, it alternates between "X" and "O".
 * In single-player (Vs Computer) mode it switches between the human player and the computer.
 * Also updates the turn display for the current player.
 */
function switchPlayer() {
    // Function to switch between players
    if (multiPlayerSelected == true) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    } else if (singlePlayerSelected == true) {
        player = player === computerPlayer ? currentPlayer : computerPlayer;
    }
    whosTurn(); // Updates the turn display for single player
}

/**
 * Updates the display to indicate whose turn it is in the game.
 * It sets the display to show the current player's "X" or "O" in multiplayer mode.
 */
function whosTurn() {
    if (player == currentPlayer) {
        turn.innerText = currentPlayer;
    } else if (player == computerPlayer) {
        turn.innerText = computerPlayer;
    } else {
        turn.innerText = currentPlayer;
    }
}

function informationIcon() {
    let infoClick = document.querySelector(".navigation-link")
    let button = document.querySelector(".button")
    infoClick.addEventListener("click", function () {
        gameControls.style.display = "flex"
        gameContainer.style.display = "none"
        difficulty.style.display = "none"
        button.style.display = "none"
    })
}


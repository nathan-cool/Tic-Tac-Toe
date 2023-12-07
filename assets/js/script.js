let gameBoard = document.querySelectorAll(".cell");

let array = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

console.log('hi');

gameBoard.forEach(cell => {
    cell.addEventListener("click", function(){
        const row = this.getAttribute("data-row");
        const col = this.getAttribute("data-col");
        cell.innerText = "X";
        array[row][col] = "x";
        console.log(array);
    });
})

function winner() {
    for (let row = 0; row < 3; row++) {
        if (array[row][0] === "x" && array[row][1] === "x" && array[row][2] === "x") {
            return true;
        }
    }
    for (let col = 0; col < 3; col++) {
        if (array[0][col] === "x" && array[1][col] === "x" && array[2][col] === "x") {
            return true;
        }
    }
    if  (winner() === true) {
        console.log("winner");
    }
    else {
        console.log("no winner");
    }
    return false;
    
}
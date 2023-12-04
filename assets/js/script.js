let gameBoard = document.querySelectorAll(".cell");

let array = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];



gameBoard.forEach(cell => {
    cell.addEventListener("click", function(){
        const row = this.getAttribute("data-row");
        const col = this.getAttribute("data-col");
        cell.innerText = "X";
        array[row][col] = "2";
        console.log(array);
    });
})

function 
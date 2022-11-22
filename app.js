var gridItems = document.querySelectorAll('.grid-item');
let startButton = document.querySelector('#start-button');

// Tic Tac Toe
let playerOne = 'player-one';
let playerTwo = 'player-two';
let currentPlayer = playerOne;
let gameOver = false;
let timer = 0;

let playerOneSelections = [];
let playerTwoSelections = [];

startButton.addEventListener('click', function () {
    startGame();
});
let winningCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

function startGame() {
    timer = 0;
    timerInterval = setInterval(function () {
        timer++;
        // console.log(timer);
    }, 1000);
    currentPlayer = playerOne;
    console.log('Game started');
    playGame();

}

function playGame() {
    gridItems.forEach(function (gridItem) {
        gridItem.addEventListener('click', function () {
            console.log("-------------------------")
            if (getCurrentPlayer() === playerOne) {
                gridItem.setAttribute('data-selectedBy', playerOne);
                playerOneSelections.push(parseInt(gridItem.getAttribute('data-position')));
                checkWinner();
                switchPlayer();
            }
            else if (getCurrentPlayer() === playerTwo) {
                gridItem.setAttribute('data-selectedBy', playerTwo);
                playerTwoSelections.push(parseInt(gridItem.getAttribute('data-position')));
                checkWinner();
                switchPlayer();
            }
            else {
                console.log('Something went wrong');
            }
        });
    });
}

function switchPlayer() {
    if (currentPlayer === playerOne) {
        currentPlayer = playerTwo;
    }
    else if (currentPlayer === playerTwo) {
        currentPlayer = playerOne;
    }
}

function getCurrentPlayer() {
    return currentPlayer;
}

function checkWinner() {
    if (checkForWin(playerOneSelections)) {
        console.log('Player One Wins');
        endGame();
    }
    else if (checkForWin(playerTwoSelections)) {
        console.log('Player Two Wins');
        endGame();
    }
    else if (checkForDraw()) {
        console.log('Draw');
        endGame();
    }
}

function checkForWin(playerSelections) {
    let win = false;
    winningCombinations.forEach(function (winningCombination) {
        let count = 0;
        winningCombination.forEach(function (winningPosition) {
            if (playerSelections.indexOf(winningPosition) > -1) {
                count++;
            }
        });
        if (count === 3) {
            win = true;
        }
    });
    return win;
}

function checkForDraw() {
    let draw = false;
    if (playerOneSelections.length + playerTwoSelections.length === 9) {
        draw = true;
    }
    return draw;
}

function endGame() {
    gameOver = true;
    clearInterval(timerInterval);
    console.log('Time taken: ' + timer + ' seconds');
    timer = 0;

    gridItems.forEach(function (gridItem) {
        setTimeout(() => {
            gridItem.setAttribute('data-selectedBy', 'none');
            gridItem.removeEventListener('click', function () {
            });
        }, 4000);

    });
}

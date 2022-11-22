let root = document.documentElement;
let gameContainer = document.getElementById('game-container');
let gridItems = document.querySelectorAll('.grid-item');
let startButton = document.querySelector('#start-button');
let resetButton = document.querySelector('#reset-button');
let form = document.querySelector('#player-form');
let winnerContainer = document.querySelector('.winner-container');

// Tic Tac Toe
let playerOne = 'player-one';
let playerTwo = 'player-two';
let currentPlayer = playerOne;
let gameOver = false;
let timer = 0;
let win = false;
let playerOneSelections = [];
let playerTwoSelections = [];
let timerInterval;

if (document.cookie) {
    form.classList.add('hidden');
}

startButton.addEventListener('click', function () {
    startGame();
});

resetButton.addEventListener('click', function () {
    resetGame();
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
    setPlayers();
    timer = 0;
    timerInterval = setInterval(function () {
        timer++;
        // console.log(timer);
    }, 1000);
    currentPlayer = playerOne;
    console.log('Game started');
    gameContainer.classList.remove('hidden');
    startButton.classList.add('hidden');
    resetButton.classList.remove('hidden');
    playGame();

}

function playGame() {
    gridItems.forEach(function (gridItem) {
        gridItem.addEventListener('click', function () {
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
    if (getCurrentPlayer() === playerOne) {
        currentPlayer = playerTwo;
    }
    else if (getCurrentPlayer() === playerTwo) {
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
    winningCombinations.forEach(function (winningCombination) {
        let count = 0;
        winningCombination.forEach(function (winningPosition) {
            if (playerSelections.indexOf(winningPosition) > -1) {
                count++;
            }
        });
        if (count === 3) {
            win = true;
            count = 0;
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
    resetButton.classList.remove('hidden');
    clearInterval(timerInterval);
    winnerContainer.classList.remove('hidden');
    let winnerNamePlaceHolder = document.querySelector('#winner-name');
    if (win) {
        if (getCurrentPlayer() === playerOne) {
            winnerNamePlaceHolder.textContent = playerOneName;
        }
        else if (getCurrentPlayer() === playerTwo) {
            winnerNamePlaceHolder.textContent = playerTwoName;
        }
    }
    else {
        winnerContainer.innerHTML = `<h1>Draw!</h1>`;
    }

    setTimeout(() => {
        gameContainer.classList.add('hidden');
    }, 4000);

}

function resetGame() {
    window.location.reload();
}


// theme switcher
let darkModeButton = document.getElementById('dark-button');
let lightModeButton = document.getElementById('light-button');

darkModeButton.addEventListener('click', function () {
    document.body.classList.add('dark');
    document.body.classList.remove('light');
    localStorage.setItem('theme', 'dark');
});

lightModeButton.addEventListener('click', function () {
    document.body.classList.add('light');
    document.body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
});

// Get and store current theme
let currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.body.classList.add(currentTheme);
}

function setPlayers() {

    playerOneName = document.getElementById('player-one-name').value;
    playerTwoName = document.getElementById('player-two-name').value;
    playerOneColorSelection = document.querySelector('input[name="color-p1"]:checked').value;
    playerTwoColorSelection = document.querySelector('input[name="color-p2"]:checked').value;

    //log data
    console.log(playerOneName, playerTwoName, playerOneColorSelection, playerTwoColorSelection);

    //change css variables to match player colors
    document.documentElement.style.setProperty('--player-one-theme', playerOneColorSelection);
    document.documentElement.style.setProperty('--player-two-theme', playerTwoColorSelection);

    form.style.display = 'none';
}

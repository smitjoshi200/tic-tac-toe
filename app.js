let root = document.documentElement;
let heading = document.querySelector('.title');
let navButton = document.querySelector('.nav-button');
let themeButtonContainer = document.querySelector('.theme-button-container');
let gameContainer = document.getElementById('game-container');
let playerIndicatorSpan = document.querySelector('.current-player-indicator span');
let gridItems = document.querySelectorAll('.grid-item');
let startButton = document.querySelector('#start-button');
let resetButton = document.querySelector('#reset-button');
let restartButton = document.querySelector('#restart-button');
let form = document.querySelector('#player-form');
let winnerContainer = document.querySelector('.winner-container');

// Tic Tac Toe - 4 x 4
let playerOne = 'player-one';
let playerTwo = 'player-two';
let currentPlayer = playerOne;
let gameOver = false;
let timer = 0;
let win = false;
let playerOneSelections = [];
let playerTwoSelections = [];
let timerInterval;
let playerOneName;
let playerTwoName;
let playerOneColorSelection;
let playerTwoColorSelection;

window.onload = function () {
    localStorage.getItem('theme') === 'dark' ? document.querySelector('body').classList.add('dark') : document.querySelector('body').classList.add('light');
    if (localStorage.getItem('playerOneName') != null) {
        form.style.display = 'none';
    }
}

navButton.addEventListener('click', function () {
    this.classList.toggle('open');
    if (this.classList.contains('open')) {
        themeButtonContainer.style.display = 'block';
    }
    else {
        themeButtonContainer.style.display = 'none';
    }
});

startButton.addEventListener('click', function () {
    startGame();
});

resetButton.addEventListener('click', function () {
    resetGame();
});

restartButton.addEventListener('click', function () {
    resetPlayers();
});

let winningCombinations = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [4, 8, 12, 16],
    [1, 6, 11, 16],
    [4, 7, 10, 13]
];

function startGame() {
    setPlayers();
    timer = 0;
    timerInterval = setInterval(function () {
        timer++;
        // console.log(timer);
    }, 1000);
    currentPlayer = playerOne;
    playerIndicatorSpan.innerText = playerOneName;
    console.log('Game started');
    heading.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    startButton.classList.add('hidden');
    resetButton.classList.add('hidden');
    restartButton.classList.add('hidden');
    winnerContainer.classList.add('hidden');
    playGame();

}

function playGame() {
    gridItems.forEach(function (gridItem) {
        gridItem.addEventListener('click', function () {
            if (gridItem.getAttribute('data-selectedBy') == 'none') {
                if (getCurrentPlayer() === playerOne) {
                    if (playerOneSelections.length < 4) {
                        gridItem.setAttribute('data-selectedBy', playerOne);
                        playerOneSelections.push(parseInt(gridItem.getAttribute('data-position')));
                        gridItem.classList.add(playerOneColorSelection);
                    }
                    else {
                        let firstItem = playerOneSelections.shift();
                        let firstItemElement = document.querySelector(`[data-position="${firstItem}"]`);
                        firstItemElement.setAttribute('data-selectedBy', 'none');
                        firstItemElement.classList.remove(playerOneColorSelection);
                        gridItem.setAttribute('data-selectedBy', playerOne);
                        playerOneSelections.push(parseInt(gridItem.getAttribute('data-position')));
                        gridItem.classList.add(playerOneColorSelection);
                    }

                    checkWinner();
                    switchPlayer();
                }
                else if (getCurrentPlayer() === playerTwo) {
                    if (playerTwoSelections.length < 4) {
                        gridItem.setAttribute('data-selectedBy', playerTwo);
                        playerTwoSelections.push(parseInt(gridItem.getAttribute('data-position')));
                        gridItem.classList.add(playerTwoColorSelection);
                    }
                    else {
                        let firstItem = playerTwoSelections.shift();
                        let firstItemElement = document.querySelector(`[data-position="${firstItem}"]`);
                        firstItemElement.setAttribute('data-selectedBy', 'none');
                        firstItemElement.classList.remove(playerTwoColorSelection);
                        gridItem.setAttribute('data-selectedBy', playerTwo);
                        playerTwoSelections.push(parseInt(gridItem.getAttribute('data-position')));
                        gridItem.classList.add(playerTwoColorSelection);
                    }
                    checkWinner();
                    switchPlayer();
                }
                else {
                    console.log('Something went wrong');
                }
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
    playerIndicatorSpan.innerText = getCurrentPlayer() == playerOne ? playerOneName : playerTwoName;
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
        if (count === 4) {
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
    gameContainer.classList.add('hidden');
    restartButton.classList.remove('hidden');
    resetButton.classList.remove('hidden');

}

function resetGame() {
    window.location.reload();
}

function resetPlayers() {
    localStorage.removeItem('playerOneName');
    localStorage.removeItem('playerTwoName');
    localStorage.removeItem('playerOneColorSelection');
    localStorage.removeItem('playerTwoColorSelection');
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

    if (localStorage.getItem('playerOneName') != null) {
        playerOneName = localStorage.getItem('playerOneName');
        playerTwoName = localStorage.getItem('playerTwoName');
        playerOneColorSelection = localStorage.getItem('playerOneColorSelection');
        playerTwoColorSelection = localStorage.getItem('playerTwoColorSelection');
    }
    else {

        playerOneName = document.getElementById('player-one-name').value;
        playerTwoName = document.getElementById('player-two-name').value;
        playerOneColorSelection = document.querySelector('input[name="color-p1"]:checked').value;
        playerTwoColorSelection = document.querySelector('input[name="color-p2"]:checked').value;


        //set as local storage
        localStorage.setItem('playerOneName', playerOneName);
        localStorage.setItem('playerTwoName', playerTwoName);
        localStorage.setItem('playerOneColorSelection', playerOneColorSelection);
        localStorage.setItem('playerTwoColorSelection', playerTwoColorSelection);
    }

    //change css variables to match player colors
    document.documentElement.style.setProperty('--player-one-theme', playerOneColorSelection);
    document.documentElement.style.setProperty('--player-two-theme', playerTwoColorSelection);

    form.style.display = 'none';
}

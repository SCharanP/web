document.addEventListener('DOMContentLoaded', function() {
    const boardSize = 5;
    let gameBoard = document.getElementById('gameBoard');
    let timerElement = document.getElementById('timer');
    let timer = null;
    let seconds = 0;

    // Create the board
    function createBoard() {
        while (gameBoard.firstChild) {
            gameBoard.removeChild(gameBoard.firstChild);
        }
        for (let i = 0; i < boardSize * boardSize; i++) {
            let cell = document.createElement('div');
            cell.className = 'cell';
            cell.addEventListener('click', () => toggleCells(i));
            gameBoard.appendChild(cell);
        }
    }

    // Reset game
    document.getElementById('resetButton').addEventListener('click', resetGame);

    function resetGame() {
        stopTimer();
        seconds = 0;
        updateTimer();
        createBoard();
        randomSetup();
        startTimer();
    }

    // Timer functions
    function startTimer() {
        timer = setInterval(() => {
            seconds++;
            updateTimer();
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timer);
    }

    function updateTimer() {
        timerElement.textContent = `Time: ${seconds} seconds`;
    }

    // Function to toggle cells
    function toggleCells(index) {
        const toggle = (idx) => {
            if (idx >= 0 && idx < boardSize * boardSize) {
                document.getElementsByClassName('cell')[idx].classList.toggle('is-off');
            }
        };

        toggle(index); // Toggle the clicked cell
        if (index % boardSize !== 0) toggle(index - 1); // Toggle left
        if (index % boardSize !== boardSize - 1) toggle(index + 1); // Toggle right
        if (index >= boardSize) toggle(index - boardSize); // Toggle above
        if (index < boardSize * (boardSize - 1)) toggle(index + boardSize); // Toggle below

        checkWin();
    }

    // Check for win condition
    function checkWin() {
        const isWin = [...document.getElementsByClassName('cell')]
                        .every(cell => cell.classList.contains('is-off'));
        if (isWin) {
            window.alert('You win!');
            stopTimer();
        }
    }

    // Randomly click cells to setup the board
    function randomSetup() {
        for (let i = 0; i < boardSize * boardSize; i++) {
            if (Math.random() < 0.5) toggleCells(i);
        }
    }

    // Initialize game
    resetGame();

    // Update last modified date
    document.getElementById('lastModified').textContent = document.lastModified;
});

// script.js

// Select DOM elements
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset-btn');

let board = Array(9).fill(null); // The game board, initialized to null (empty)
let currentPlayer = 'X'; // The starting player

// Function to handle cell click
function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');
    
    if (board[index] || checkWinner()) return; // Ignore if the cell is already filled or the game is over

    // Mark the cell with the current player's symbol
    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    // Check for a winner after each move
    if (checkWinner()) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
    } else if (board.every(cell => cell !== null)) {
        statusText.textContent = 'It\'s a draw!';
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Function to check if there's a winner
function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

// Function to reset the game
function resetGame() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = '');
}

// Add event listeners to each cell
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Add event listener to the reset button
resetButton.addEventListener('click', resetGame);

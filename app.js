document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');
    const resetButton = document.getElementById('resetButton');

    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameEnded = false;

    const checkWinner = () => {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a]; // return the winner (X or O)
            }
        }

        if (!board.includes('')) {
            return 'draw'; // game is a draw
        }

        return null; // no winner yet
    };

    const handleCellClick = (index) => {
        if (!gameEnded && board[index] === '') {
            board[index] = currentPlayer;
            cells[index].textContent = currentPlayer;

            const winner = checkWinner();
            if (winner) {
                gameEnded = true;
                if (winner === 'draw') {
                    message.textContent = "It's a draw!";
                } else {
                    message.textContent = `${winner} wins!`;
                }
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                message.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    };

    const resetGame = () => {
        currentPlayer = 'X';
        board = ['', '', '', '', '', '', '', '', ''];
        gameEnded = false;
        cells.forEach((cell) => {
            cell.textContent = '';
        });
        message.textContent = `Player ${currentPlayer}'s turn`;
    };

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            handleCellClick(index);
        });
    });

    resetButton.addEventListener('click', () => {
        resetGame();
    });

    resetGame(); // initialize the game
});

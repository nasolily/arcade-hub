import React, { useState } from 'react';
import { loadSettings } from "../logic/settings"; 

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    // prevent clicking if there's a winner or the square is already filled
    if (calculateWinner(squares) || squares[i]) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  const isTie = squares.every(square => square !== null) && !winner;

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (isTie) {
    status = "It's a tie!";
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export function TicTacToePage() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  const isTie = squares.every(square => square !== null) && !winner;
  const isGameOver = !!winner || isTie;

  function handlePlayAgain() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  function handlePlay(nextSquares) {
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  return (
    <main className="page-container">
      <h2>Tic-Tac-Toe</h2>
      <section>
        <div className="game">
          <div className="game-board">
            <Board xIsNext={xIsNext} squares={squares} onPlay={handlePlay} />
          </div>
          
          <div className="game-info">
            {isGameOver && (
              <div className="game-over-section">
                <button className="play-again-btn" onClick={handlePlayAgain}>
                  Play Again
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6],           // diagonals
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
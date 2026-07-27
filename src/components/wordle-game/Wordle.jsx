import React, { useState, useEffect } from 'react';

const CONFIG = { wordLength: 5, maxAttempt: 6 };

const Wordle = () => {
  const [targetWord, setTargetWord] = useState("");
  const [guesses, setGuesses] = useState(Array(CONFIG.maxAttempt).fill(""));
  const [currentGuess, setCurrentGuess] = useState("");
  const [currentRow, setCurrentRow] = useState(0);
  const [message, setMessage] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  // Get random word
  useEffect(() => {
    fetch(`https://random-word-api.herokuapp.com/word?length=${CONFIG.wordLength}`)
      .then(res => res.json())
      .then(data => setTargetWord(data[0].toUpperCase()))
      .catch(() => setTargetWord("REACT"));
  }, []);

  // 🔥 Reset overlay whenever game ends
  useEffect(() => {
    if (isGameOver) {
      setShowOverlay(true);
    }
  }, [isGameOver]);

  // Handle typing
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isGameOver) return;

      if (e.key === 'Enter') submitGuess();
      else if (e.key === 'Backspace') setCurrentGuess(prev => prev.slice(0, -1));
      else if (/^[a-zA-Z]$/.test(e.key) && currentGuess.length < CONFIG.wordLength) {
        setCurrentGuess(prev => prev + e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentGuess, isGameOver]);

  const submitGuess = async () => {
    if (currentGuess.length !== CONFIG.wordLength || isGameOver) return;

    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${currentGuess.toLowerCase()}`);
    if (!res.ok) {
      setMessage("Invalid word!");
      return;
    }

    const newGuesses = [...guesses];
    const formattedGuess = currentGuess.toUpperCase();
    newGuesses[currentRow] = formattedGuess;
    setGuesses(newGuesses);

    if (formattedGuess === targetWord) {
      setMessage("You won! 🎉");
      setIsGameOver(true);
      return;
    }

    if (currentRow === CONFIG.maxAttempt - 1) {
      setMessage(`You lost! The word was ${targetWord}`);
      setIsGameOver(true);
      return;
    }

    setCurrentRow(prev => prev + 1);
    setCurrentGuess("");
    setMessage("");
  };

  // Tile color logic
  const getTileStatus = (guess, colIndex) => {
    const letter = guess[colIndex];

    if (targetWord[colIndex] === letter) return "correct";

    if (targetWord.includes(letter)) {
      const totalOccurrences = targetWord.split("").filter(l => l === letter).length;

      const correctMatches = guess.split("").filter(
        (char, i) => char === letter && targetWord[i] === char
      ).length;

      const seenBeforeAsYellow = guess
        .slice(0, colIndex)
        .split("")
        .filter((char, i) => char === letter && targetWord[i] !== char).length;

      if (seenBeforeAsYellow < (totalOccurrences - correctMatches)) {
        return "misplaced";
      }
    }

    return "incorrect";
  };

  return (
    <div className="wordle-game">

      {!isGameOver && message && (
        <div className="game-message">{message}</div>
      )}

      <div className="wordle-grid">
        {guesses.map((guess, rowIndex) => {
          const isCurrentRow = rowIndex === currentRow;

          const displayWord = isCurrentRow
            ? currentGuess.padEnd(CONFIG.wordLength, " ")
            : guess.padEnd(CONFIG.wordLength, " ");

          return (
            <div key={rowIndex} className="wordle-row">
              {displayWord.split("").map((letter, colIndex) => {
                const shouldColor =
                  rowIndex < currentRow || (isGameOver && rowIndex === currentRow);

                const status = shouldColor
                  ? getTileStatus(guess, colIndex)
                  : "";

                return (
                  <div key={colIndex} className={`wordle-tile ${status}`}>
                    {letter}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* 👇 Button BELOW grid after closing overlay */}
      {isGameOver && !showOverlay && (
        <div className="play-again-container">
          <button onClick={() => window.location.reload()}>
            Play Again
          </button>
        </div>
      )}

      {/* 👇 Overlay */}
      {isGameOver && showOverlay && (
        <div className="game-over-box">
          <button
            className="close-btn"
            onClick={() => setShowOverlay(false)}
          >
            ✕
          </button>

          <h2>GAME OVER!</h2>
          <p>
            The word was:{" "}
            <span className="highlight-word">{targetWord}</span>
          </p>

          <button onClick={() => window.location.reload()}>
            Play Again
          </button>
        </div>
      )}

    </div>
  );
};

export default Wordle;
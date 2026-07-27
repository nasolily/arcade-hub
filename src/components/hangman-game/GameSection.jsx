import { useState, useEffect } from "react";
import { getRoomState, updateRoomState } from "../../logic/hangman-api";
import { getMaskedWord, getGameStatus, getMistakeCount, MAX_MISTAKES } from "../../logic/hangman";
import { KeyButton } from "./KeyButton";
import { useSettings } from "../../context/SettingsContext";
import { getRandomWord } from "../../logic/wordbank";

export function GameSection({ roomId, gameMode, isHost }) {
  const { settings } = useSettings();

  const [localState, setLocalState] = useState(() => ({
    word: getRandomWord(),
    guesses: [],
    status: "playing"
  }));

  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    if (gameMode !== 'multi' || !roomId) return;
    const fetchState = async () => {
      try {
        const state = await getRoomState(roomId);
        setGameState(state);
      } catch (err) {
        console.error("Fetch failed", err);
      }
    };
    fetchState();
    const interval = setInterval(fetchState, 3000);
    return () => clearInterval(interval);
  }, [roomId, gameMode]);

  const handleGuess = async (letter) => {
    const currentState = gameMode === 'multi' ? gameState : localState;
    const upperLetter = letter.toUpperCase();

    if (!currentState || currentState.guesses.includes(upperLetter) || currentState.status !== "playing") return;

    const newGuesses = [...currentState.guesses, upperLetter];
    const newStatus = getGameStatus(currentState.word, newGuesses);

    const updatedState = { ...currentState, guesses: newGuesses, status: newStatus };

    if (gameMode === 'multi') {
      setGameState(updatedState);
      await updateRoomState(roomId, updatedState);
    } else {
      setLocalState(updatedState);
    }
  };

  const activeState = gameMode === 'multi' ? gameState : localState;

  if (gameMode === 'multi' && !activeState) {
    return <p>Connecting to Room {roomId}...</p>;
  }

  const { word, guesses, status } = activeState;
  const mistakes = getMistakeCount(word, guesses);

  const resetGame = () => {
    if (gameMode === 'single') {
      setLocalState({ word: getRandomWord(), guesses: [], status: "playing" });
    } else {
      window.location.reload();
    }
  };

  return (
    <section className="game-section">
      <div className="game-info">
        <h3>{gameMode === 'multi' ? `Room: ${roomId}` : "Solo Practice"}</h3>
        <p>{isHost ? "Friend is guessing..." : "My Mistakes"}: {mistakes} / {MAX_MISTAKES}</p>
      </div>

      <div className="word-display" style={{ fontSize: '2.5rem', margin: '20px 0', letterSpacing: '8px' }}>
        {getMaskedWord(word, guesses)}
      </div>

      <div className="keyboard" style={{ 
        display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center',
        pointerEvents: (gameMode === 'multi' && isHost) ? 'none' : 'auto',
        opacity: (gameMode === 'multi' && isHost) ? 0.5 : 1
      }}>
        {"abcdefghijklmnopqrstuvwxyz".split("").map((l) => (
          <KeyButton
            key={l}
            letter={l}
            onClick={handleGuess}
            isUsed={guesses.includes(l.toUpperCase())} 
            disabled={status !== "playing" || (gameMode === 'multi' && isHost)}
          />
        ))}
      </div>

      {status !== "playing" && (
        <div className="results-overlay" style={{ marginTop: '20px', padding: '20px', border: '2px solid white' }}>
          <h2>{status === "won" ? "VICTORY!" : "GAME OVER!"}</h2>
          <p>The word was: <strong style={{ color: '#d63384' }}>{word}</strong></p>
          <button onClick={resetGame} style={{ marginTop: '10px', padding: '10px 20px' }}>
            Play Again
          </button>
        </div>
      )}
    </section>
  );
}
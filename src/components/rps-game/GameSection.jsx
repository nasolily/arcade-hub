import { GameHeader } from "./GameHeader";
import { HistorySection } from "./HistorySection";
import { beats, decideWinner, getCpuMove, nextScore } from "../../logic/game";
import { MoveButton } from "./MoveButton";
import { ScoreBoard } from "./ScoreBoard";
import { useState } from "react";

export const GameSection = ({ difficulty }) => {
  const [score, setScore] = useState({
    player: 0,
    cpu: 0,
    ties: 0,
  });
  const [history, setHistory] = useState([]);
  const [lastMove, setLastMove] = useState(null); //track last move for hard mode
  const moves = Object.keys(beats);

  const playRound = (move) => {
    const cpuMove = getCpuMove({ difficulty, lastPlayerMove: lastMove });
    
    const outcome = decideWinner(move, cpuMove);
    
    setScore((currentScore) => nextScore(currentScore, outcome));
    
//update history
    const newEntry = { 
      playerMove: move, 
      cpuMove: cpuMove, 
      outcome: outcome 
    };
    
    setHistory((currentHistory) => [...currentHistory, newEntry]);
    
    setLastMove(move);
  };

  const onResetGame = () => {
    setScore({
      player: 0,
      cpu: 0,
      ties: 0,
    });
    setHistory([]);
    setLastMove(null);
  };

  return (
    <section aria-labelledby="game-heading" className="card rps-wrapper">
      <GameHeader difficulty={difficulty} />
      <ScoreBoard score={score} />
      
      <div className="move-buttons-container">
        {moves.map((m) => (
          <MoveButton 
            key={m} 
            label={m} 
            className="rps-tile" 
            onClick={() => playRound(m)} 
          />
        ))}
      </div>

      <HistorySection history={history} />

      <div className="game-actions">
        <button id="reset-game" className="reset-btn" type="button" onClick={onResetGame}>
          Reset Game
        </button>
      </div>
    </section>
  );
};
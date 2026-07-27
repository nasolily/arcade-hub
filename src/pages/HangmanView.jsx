import { GameSection } from "../components/hangman-game/GameSection";
import { useNavigate } from "react-router-dom";

export function GameView({ playerName, playerAvatar, roomId, gameMode, isHost }) {
  const navigate = useNavigate();

  return (
    <main>
      <header>
        <h2>{gameMode === 'multi' ? 'Co-op Hangman' : 'Hangman'}</h2>
      </header>
      
      {gameMode === 'multi' && (
        <div className="room-banner">
          <p>Invite a friend! Room Code: <strong>{roomId}</strong></p>
        </div>
      )}
      
      <GameSection roomId={roomId} gameMode={gameMode} isHost={isHost} />
    </main>
  );
  
}
import { Link } from "react-router-dom";
import { GameSection } from "../components/rps-game/GameSection";
import { HighScoresSection } from "../components/rps-game/HighScoresSection";
import { loadSettings } from '../logic/settings';

export function RPSGamePage() {
  const settings = loadSettings();
  
  const playerName = settings?.name || 'Player';
  const playerAvatar = settings?.avatar;
  const difficulty = settings?.difficulty || 'normal';


return (
    <GameView 
      difficulty={difficulty} 
    />
  );
}

export function GameView({ playerName, playerAvatar, difficulty }) {
return (
    <main>
        <h2>Rock Paper Scissors</h2>
      <GameSection difficulty={difficulty} />
    </main>
  );
}
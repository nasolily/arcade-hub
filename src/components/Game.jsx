import { GameSection } from "./rps-game/GameSection";
import { HighScoresSection } from "./rps-game/HighScoresSection";
import { PlayerInfoCard } from "./rps-game/PlayerInfoCard";

export function GameView({ playerName, playerAvatar, difficulty }) {
  const handleBackToSettings = () => {
    console.log(`going back to the settings view`);
  };
  console.log(playerAvatar);
  return (
    <main>
      <header>
        <h2>Rock Paper Scissors</h2>
        <nav>
          <a onClick={handleBackToSettings} className="nav-link">
            ← Back to Settings
          </a>
        </nav>
      </header>
      <PlayerInfoCard playerName={playerName} playerAvatar={playerAvatar} />
      <GameSection difficulty={difficulty} />
      <HighScoresSection />
    </main>
  );
}

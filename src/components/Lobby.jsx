import { capitalize } from "../utils/string_formatting";
import { avatars } from "../logic/avatars";
import { useLocation, useNavigate } from "react-router-dom"; // Added useNavigate

export const LobbyView = ({
  onGameStart,
  onSettingsSave,
  name,
  setName,
  avatar,
  setAvatar,
  difficulty,
  setDifficulty,
  darkMode,
  setDarkMode,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isGameStartEnabled = avatar !== undefined && name !== ``;

  const handleGameStart = () => {
    onGameStart();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    saveSettings({ name, avatar, difficulty, darkMode });
    
    onSettingsSave();
    
    const from = location.state?.from;
    navigate(from || "/");
  };

  return (
    <section aria-labelledby="settings-heading" className="card">
      <h2 id="settings-heading">Player Settings</h2>

      <div role="status" aria-live="polite" data-testid="greeting">
        {name ? `Hello ${name}` : null}
      </div>
      
      <form id="settings-form" onSubmit={handleFormSubmit} noValidate>
        <button id="save-settings" type="submit">
          Save Settings
        </button>
      </form>

      <div className="game-actions">
        <button id="start-game" type="button" onClick={handleGameStart} disabled={!isGameStartEnabled}>
          Start Game
        </button>
      </div>
    </section>
  );
};
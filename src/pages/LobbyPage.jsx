import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { capitalize } from "../utils/string_formatting";
import { avatars } from "../logic/avatars";
import { loadSettings, saveSettings } from "../logic/settings";
import { applySavedTheme } from "../utils/theme";

export const LobbyView = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const existingSettings = loadSettings();
  const [name, setName] = useState(existingSettings?.name || "");
  const [avatar, setAvatar] = useState(existingSettings?.avatar);
  const [difficulty, setDifficulty] = useState(existingSettings?.difficulty || "normal");
  const [darkMode, setDarkMode] = useState(existingSettings?.darkMode || false);

  const isInvalid = name.trim().length < 3 || !avatar;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Safety check: block submission if the requirements aren't met
    if (isInvalid) return;

    const newSettings = { name, avatar, difficulty, darkMode };
    saveSettings(newSettings);
    applySavedTheme();

    const from = location.state?.from;
    navigate(from || "/");
  };

  return (
    <section aria-labelledby="settings-heading" className="card">
      <h2 id="settings-heading">Player Settings</h2>

      <div role="status" aria-live="polite" data-testid="greeting">
        {name.trim().length >= 3 ? `Hello ${name}!` : "Please enter a name of at least 3 characters!"}
      </div>

      <form id="settings-form" onSubmit={handleFormSubmit} noValidate>
        <div className="field">
          <label htmlFor="player-name">Player Name</label>
          <input
            id="player-name"
            name="player-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="off"
          />
        </div>

        <fieldset>
          <legend>Choose an avatar</legend>
          <div className="avatar-options">
            {avatars.map((a) => (
              <label key={a.key} className={`avatar-option ${a.key === avatar ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="avatar"
                  value={a.key}
                  checked={a.key === avatar}
                  onChange={() => setAvatar(a.key)}
                />
                <img src={a.image} alt={a.key} />
                <span>{capitalize(a.key)}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="field">
          <label htmlFor="difficulty">Difficulty</label>
          <select id="difficulty" name="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="Easy">Easy</option>
            <option value="Normal">Normal</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="field checkbox">
          <label>
            <input
              id="theme-toggle"
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode((darkMode) => !darkMode)}
            />{" "}
            Dark Theme
          </label>
        </div>

<button 
          id="save-settings" 
          type="submit" 
          disabled={isInvalid}
        >
          Save Settings
        </button>
      </form>
    </section>
  );
};
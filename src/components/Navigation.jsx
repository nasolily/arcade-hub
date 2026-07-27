import { NavLink, useNavigate } from "react-router-dom";
import { loadSettings } from "../logic/settings";
import { avatars } from "../logic/avatars"; 

export function Navigation() {
  const navigate = useNavigate();
  const settings = loadSettings();

  const userAvatar = avatars.find((a) => a.key === settings?.avatar) || avatars[0];

  const handleLogout = () => {
    localStorage.removeItem("game.settings");
    navigate("/");
  };

  return (
    <nav className="main-nav">
      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        {` | `}
        <NavLink to="/lobby">Lobby</NavLink>
        {` | `}
        <NavLink to="/game/hangman">Hangman</NavLink>
        {` | `}
        <NavLink to="/game/rps">Rock Paper Scissors</NavLink>
        {` | `}
        <NavLink to="/game/tic-tac-toe">Tic-Tac-Toe</NavLink>
        {` | `}
        <NavLink to="/game/wordle">Wordle</NavLink>
      </div>

      {settings && settings.name && (
        <div className="nav-user-section">
          <img 
            src={userAvatar.image} 
            alt="User avatar" 
            className="nav-avatar-icon" 
          />
          
          <span className="nav-user-name">{settings.name}</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
import './App.css';
import { HashRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { SettingsProvider } from './context/SettingsContext';
import { AppBase } from './components/AppShell';
import { HomePage } from './components/HomePage';
import { LobbyPage } from './components/LobbyPage';
import { RPSGamePage } from './pages/RPSGamePagePage';
import { TicTacToePage } from './pages/TicTacToePage';
import  WordlePage  from './pages/WordlePage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { HangmanGamePage } from './pages/HangmanGamePage';

export function App() {
  return (
    <SettingsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AppBase />}>
            <Route index element={<HomePage />} />
            <Route path="lobby" element={<LobbyPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="game/rps" element={<RPSGamePage />} />
              <Route path="game/tic-tac-toe" element={<TicTacToePage />} />
              <Route path="/game/wordle" element={<WordlePage />} />
              <Route path="game/hangman" element={<HangmanGamePage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </SettingsProvider>
  );
}
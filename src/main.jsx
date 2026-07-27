import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { HomePage } from "./pages/HomePage";
import { LobbyView } from "./pages/LobbyPage";
import { RPSGamePage } from "./pages/RPSGamePage";
import { TicTacToePage } from "./pages/TicTacToePage";
import  WordlePage  from "./pages/WordlePage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { applySavedTheme } from "./utils/theme";
import { HangmanGamePage } from "./pages/HangmanGamePage";
import { SettingsProvider } from "./context/SettingsContext";

// Apply theme on app start
applySavedTheme();

const router = createHashRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/lobby", element: <LobbyView /> },
      {
        path: "/game/rps",
        element: (
          <ProtectedRoute>
            <RPSGamePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/game/tic-tac-toe",
        element: (
          <ProtectedRoute>
            <TicTacToePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/game/hangman",
        element: (
          <ProtectedRoute>
            <HangmanGamePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/game/wordle",
        element: (
          <ProtectedRoute>
            <WordlePage />
          </ProtectedRoute>
        ),
      },
    ],
  }, {basename: "/arcade-hub"},
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SettingsProvider>
      <RouterProvider router={router} />
    </SettingsProvider>
  </StrictMode>
);
import { useEffect } from "react";
import { Navigation } from "./Navigation";
import { Outlet } from "react-router-dom";
import { applySavedTheme } from "../utils/theme";
import "../App.css";

export function AppLayout() {
  // Apply theme when component mounts
  useEffect(() => {
    applySavedTheme();
  }, []);
  
  return (
    <main>
      <header>
        <h1>Welcome to PrismPlay</h1>
        <p>Developed by: Nadia Cowins</p>
      </header>
      <Navigation />
      <Outlet />
    </main>
  );
}
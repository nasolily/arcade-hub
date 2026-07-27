import { createContext, useContext, useState } from "react";
import { loadSettings, saveSettings as saveToStorage } from "../logic/settings";

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => loadSettings());

  const saveSettings = (newSettings) => {
    const isNameValid = newSettings.name?.trim().length >= 3;
    const isAvatarValid = !!newSettings.avatar;

    if (isNameValid && isAvatarValid) {
      setSettings(newSettings);
      saveToStorage(newSettings);
    } else {
      console.warn("Save blocked: Requirements not met.");
    }
  };
  
  const clearSettings = () => {
    setSettings(null);
    localStorage.removeItem("game.settings");
  };

  return (
    <SettingsContext.Provider value={{ settings, saveSettings, clearSettings }}>{children}</SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within SettingsProvider");
  }
  return context;
}

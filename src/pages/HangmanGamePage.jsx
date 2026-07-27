import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { GameView as HangmanView } from "./HangmanView";
import { createRoom } from "../logic/hangman-api";

export function HangmanGamePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [gameMode, setGameMode] = useState(null);
  const [roomId, setRoomId] = useState(searchParams.get("room"));
  const [customWord, setCustomWord] = useState("");
  
  // States to track which menu we are looking at
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [isJoiningRoom, setIsJoiningRoom] = useState(false);
  const [joinCode, setJoinCode] = useState("");

  useEffect(() => {
    const roomFromUrl = searchParams.get("room");
    if (roomFromUrl) {
      setRoomId(roomFromUrl);
      setGameMode('multi');
    }
  }, [searchParams]);

  const handleCreateMultiplayer = async () => {
    if (customWord.trim().length < 3) {
      alert("Word must be at least 3 letters!");
      return;
    }
    try {
      const room = await createRoom(customWord.trim().toUpperCase());
      const newId = room.id || room.roomId;
      setRoomId(newId);
      setSearchParams({ room: newId });
      setGameMode('multi');
    } catch (err) {
      alert("Failed to create room.");
    }
  };

  // logic to join an existing room manually
  const handleJoinExisting = () => {
    if (joinCode.trim().length < 4) {
      alert("Please enter a valid room code!");
      return;
    }
    const cleanId = joinCode.trim();
    setRoomId(cleanId);
    setSearchParams({ room: cleanId });
    setGameMode('multi');
  };

//select mode
  if (!gameMode && !isCreatingRoom && !isJoiningRoom) {
    return (
      <div className="mode-selection card" style={{ textAlign: 'center', padding: '20px' }}>
        <h2>Hangman</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button onClick={() => setGameMode('single')}>Single Player</button>
          <button onClick={() => setIsCreatingRoom(true)}>Create Duel (Host)</button>
          <button class="join-button"
            onClick={() => setIsJoiningRoom(true)} 
          >
            Join a Room (Guest)
          </button>
        </div>
      </div>
    );
  }

  //create room
  if (isCreatingRoom && !gameMode) {
    return (
      <div className="mode-selection card" style={{ textAlign: 'center', padding: '20px' }}>
        <h2>Setup Duel</h2>
        <p>Enter the word for your friend to guess:</p>
        <input 
          type="password" 
          value={customWord}
          onChange={(e) => setCustomWord(e.target.value)}
          placeholder="Secret word..."
          style={{ padding: '10px', marginBottom: '10px', display: 'block', width: '100%' }}
        />
        <button onClick={handleCreateMultiplayer}>Create Room</button>
        <button onClick={() => setIsCreatingRoom(false)} style={{ marginTop: '10px', background: 'none', border: 'none', color: 'gray', cursor: 'pointer' }}>
          Go Back
        </button>
      </div>
    );
  }

  // --- MENU 3: Join (Guest) Form ---
  if (isJoiningRoom && !gameMode) {
    return (
      <div className="mode-selection card" style={{ textAlign: 'center', padding: '20px' }}>
        <h2>Join a Room</h2>
        <p>Enter the code shared by your friend:</p>
        <input 
          type="text" 
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value)}
          placeholder="Paste code here..."
          style={{ padding: '10px', marginBottom: '10px', display: 'block', width: '100%', textAlign: 'center' }}
        />
        <button onClick={handleJoinExisting}>Join Game</button>
        <button onClick={() => setIsJoiningRoom(false)} style={{ marginTop: '10px', background: 'none', border: 'none', color: 'gray', cursor: 'pointer' }}>
          Go Back
        </button>
      </div>
    );
  }

  // --- THE ACTUAL GAME ---
  return (
    <HangmanView 
      gameMode={gameMode} 
      roomId={roomId} 
      isHost={isCreatingRoom} 
    />
  );
}
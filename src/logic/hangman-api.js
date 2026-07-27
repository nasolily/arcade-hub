const API_BASE = "https://game-room-api.fly.dev/api/rooms";

export async function createRoom(initialWord) {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      initialState: {
        word: initialWord.toUpperCase(),
        guesses: [],
        status: "playing"
      }
    })
  });
  return response.json();
}

export async function getRoomState(roomId) {
  const response = await fetch(`${API_BASE}/${roomId}`);
  const data = await response.json();
  return data.gameState;
}

export async function updateRoomState(roomId, newState) {
  const response = await fetch(`${API_BASE}/${roomId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ gameState: newState })
  });
  return response.json();
}
const API_URL = "http://localhost:5002/api";

export const gameService = {
  startGame: async (sessionId) => {
    const response = await fetch(`${API_URL}/game/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId }),
    });
    return response.json();
  },

  takeAction: async (sessionId, evidenceId) => {
    const response = await fetch(`${API_URL}/game/action`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId, evidence_id: evidenceId }),
    });
    return response.json();
  },

  makeAccusation: async (sessionId, guess) => {
    const response = await fetch(`${API_URL}/game/accuse`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId, guess }),
    });
    return response.json();
  },
};

export const aiService = {
  getSuggestion: async (sessionId) => {
    const response = await fetch(`${API_URL}/ai/suggest`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId }),
    });
    return response.json();
  },

  getMinimaxSuggestion: async () => {
    const response = await fetch(`${API_URL}/ai/minimax`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    return response.json();
  },

  askQuestion: async (questionId) => {
    const response = await fetch(`${API_URL}/interrogation/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question_id: questionId }),
    });
    return response.json();
  },
};
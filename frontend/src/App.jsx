import { useState } from "react";
import Header from "./components/Header";
import GameControls from "./components/GameControls";
import GameStatus from "./components/GameStatus";
import AvailableActions from "./components/AvailableActions";
import CurrentDomains from "./components/CurrentDomains";
import InvestigationHistory from "./components/InvestigationHistory";
import AISuggestionPanel from "./components/AISuggestionPanel";
import MinimaxPanel from "./components/MinimaxPanel";
import AccusationPanel from "./components/AccusationPanel";
import ResultModal from "./components/ResultModal";
import { gameService, aiService } from "./services/api";

function App() {
  const [sessionId] = useState("user-session-" + Date.now());
  const [gameState, setGameState] = useState(null);
  const [availableActions, setAvailableActions] = useState([]);
  const [history, setHistory] = useState([]);
  const [aiSuggestion, setAiSuggestion] = useState(null);
  const [aiEvaluations, setAiEvaluations] = useState([]);
  const [minimaxData, setMinimaxData] = useState(null);
  const [modalResult, setModalResult] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = async () => {
    try {
      const data = await gameService.startGame(sessionId);
      if (data.success) {
        setGameState(data.game_state);
        setAvailableActions(data.available_actions);
        setHistory([]);
        setAiSuggestion(null);
        setMinimaxData(null);
        setGameStarted(true);
      }
    } catch (error) {
      console.error("Error starting game:", error);
      alert("Failed to start game. Make sure the backend is running on port 5002.");
    }
  };

  const handleTakeAction = async (evidenceId) => {
    try {
      const data = await gameService.takeAction(sessionId, evidenceId);
      if (data.success) {
        setGameState(data.game_state);
        setAvailableActions(data.available_actions);
        setHistory((prev) => [data.evidence, ...prev]);
      }
    } catch (error) {
      console.error("Error taking action:", error);
    }
  };

  const handleAISuggest = async () => {
    try {
      const data = await aiService.getSuggestion(sessionId);
      if (data.success) {
        setAiSuggestion(data.suggestion);
        setAiEvaluations(data.all_evaluations);
      }
    } catch (error) {
      console.error("Error getting AI suggestion:", error);
    }
  };

  const handleMinimaxSuggest = async () => {
    try {
      const data = await aiService.getMinimaxSuggestion();
      if (data.success) {
        setMinimaxData({
          bestQuestion: data.best_question,
          evaluations: data.all_evaluations,
          gameTree: data.game_tree,
        });
      }
    } catch (error) {
      console.error("Error getting Minimax suggestion:", error);
    }
  };

  const handleAskQuestion = async (questionId) => {
    try {
      const data = await aiService.askQuestion(questionId);
      if (data.success) {
        const result = data.result;
        alert(
          `Question: ${result.question}\n\nResponse: "${result.response}"\n\nType: ${result.response_type}\nUtility: ${result.utility_gained}`
        );
      }
    } catch (error) {
      console.error("Error asking question:", error);
    }
  };

  const handleMakeAccusation = async (guess) => {
    try {
      const data = await gameService.makeAccusation(sessionId, guess);
      if (data.success) {
        setModalResult(data);
      }
    } catch (error) {
      console.error("Error making accusation:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-purple-800 p-5">
      <div className="max-w-7xl mx-auto">
        <Header />
        <GameControls
          onStartGame={handleStartGame}
          onAISuggest={handleAISuggest}
          onMinimaxSuggest={handleMinimaxSuggest}
          gameStarted={gameStarted}
        />
        <GameStatus gameState={gameState} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
          <AvailableActions
            actions={availableActions}
            onTakeAction={handleTakeAction}
          />
          <div>
            <CurrentDomains domains={gameState?.current_domains} />
            <AISuggestionPanel
              suggestion={aiSuggestion}
              evaluations={aiEvaluations}
            />
            {minimaxData && (
              <MinimaxPanel
                bestQuestion={minimaxData.bestQuestion}
                evaluations={minimaxData.evaluations}
                onAskQuestion={handleAskQuestion}
              />
            )}
          </div>
          <InvestigationHistory history={history} />
        </div>

        {gameStarted && (
          <AccusationPanel onMakeAccusation={handleMakeAccusation} />
        )}

        <ResultModal
          isOpen={!!modalResult}
          onClose={() => setModalResult(null)}
          result={modalResult}
          gameState={gameState}
        />
      </div>
    </div>
  );
}

export default App;
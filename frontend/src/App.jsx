import React, { useState } from "react";
import Header from "./components/Header";
import GameControls from "./components/GameControls";
import DetectiveStats from "./components/DetectiveStats";
import AvailableActions from "./components/AvailableActions";
import CurrentDomains from "./components/CurrentDomains";
import InvestigationHistory from "./components/InvestigationHistory";
import AIDetectivePanel from "./components/AIDetectivePanel";
import AccusationPanel from "./components/AccusationPanel";
import ResultModal from "./components/ResultModal";
import AlgorithmVisualization from "./components/AlgorithmVisualization";
import { gameService, aiService } from "./services/api";
import CutoutTextLoader from "./components/Loader";

function App() {
  const [sessionId] = useState("user-session-" + Date.now());
  const [gameState, setGameState] = useState(null);
  const [availableActions, setAvailableActions] = useState([]);
  const [humanHistory, setHumanHistory] = useState([]);
  const [aiHistory, setAIHistory] = useState([]);
  const [aiProgress, setAIProgress] = useState(null);
  const [algorithmSteps, setAlgorithmSteps] = useState([]);
  const [modalResult, setModalResult] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [raceMode] = useState(true);
  const [winner, setWinner] = useState(null);
  const [aiThinking, setAIThinking] = useState(false);
  const [waitingForAITurn, setWaitingForAITurn] = useState(false);


  const handleStartGame = async () => {
    try {
      const data = await gameService.startGame(sessionId);
      if (data.success) {
        setGameState(data.game_state);
        setAvailableActions(data.available_actions);
        setHumanHistory([]);
        setAIHistory([]);
        setAIProgress(null);
        setAlgorithmSteps([]);
        setGameStarted(true);
        setWinner(null);
        setWaitingForAITurn(false);
      }
    } catch (error) {
      alert("Backend not running on 5002");
    }
  };

  const handleTakeAction = async (evidenceId) => {
    try {
      const data = await gameService.takeAction(sessionId, evidenceId);
      if (data.success) {
        setGameState(data.game_state);
        setAvailableActions(data.available_actions);
        setHumanHistory((prev) => [data.evidence, ...prev]);
        setAlgorithmSteps(data.csp_result?.steps || []);
      }
      // 🚀 Start AI turn automatically
      setTimeout(() => {
        setAIThinking(true);

        // optional delay before AI move (e.g., 1.5 sec)
        setTimeout(async () => {
          await handleAIMakeMove();
          setAIThinking(false);
        }, 3000)
      }, 5000)
    } catch (error) {
      console.error(error);
    }
  };

  const handleAIMakeMove = async () => {
    try {
      const data = await aiService.makeAIMove(sessionId);
      if (data.success) {
        setAIProgress(data.ai_state);
        setAIHistory((prev) => [data.action_taken, ...prev]);
        setAlgorithmSteps(data.algorithm_explanation || []);
        setWaitingForAITurn(false);

        if (data.ai_state.solved) {
          setWinner("ai");
          setTimeout(() => {
            setModalResult({
              correct: false,
              winner: "AI Detective",
              solution: data.ai_state.solution,
              message: "The AI solved the case!"
            });
          }, 500);
        }
      }
    } catch (error) { }
  };

  const handleMakeAccusation = async (guess) => {
    try {
      const data = await gameService.makeAccusation(sessionId, guess);
      if (data.success) {
        if (data.correct) {
          setWinner("human");
          setModalResult({ ...data, winner: "Human Detective" });
        } else {
          // Wrong accusation - show result briefly, then trigger AI turn
          setModalResult({ ...data, winner: null });
          setWaitingForAITurn(true);
          
          // Close modal after 2 seconds and start AI turn
          setTimeout(() => {
            setModalResult(null);
            setAIThinking(true);
            
            // AI makes move after brief delay
            setTimeout(async () => {
              await handleAIMakeMove();
              setAIThinking(false);
            }, 1500);
          }, 2000);
        }
      }
    } catch (error) { }
  };

  const handleAutoSolve = async () => {
    try {
      const data = await aiService.autoSolve(sessionId);
      if (data.success) {
        setAlgorithmSteps(data.solution_path || []);
        setWinner("ai");
        setTimeout(() => {
          setModalResult({
            correct: false,
            winner: "AI Detective",
            solution: data.solution,
            message: `AI solved in ${data.steps_taken} steps`
          });
        }, 500);
      }
    } catch (error) { }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#2a2a2a] p-5 text-white">
      <div className="max-w-[1600px] mx-auto">
        {aiThinking && (
          <CutoutTextLoader />
        )}

        <Header raceMode={raceMode} winner={winner} />

        <GameControls
          onStartGame={handleStartGame}
          onAIMakeMove={handleAIMakeMove}
          onAutoSolve={handleAutoSolve}
          gameStarted={gameStarted}
          winner={winner}
        />

        {gameStarted && (
          <DetectiveStats
            humanState={gameState}
            aiState={aiProgress}
            winner={winner}
          />
        )}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">

          {/* HUMAN SIDE */}
          <div className="space-y-6">
            <div className="backdrop-blur-xl bg-[#0b1216]/80 border border-cyan-400/30 rounded-2xl p-6 shadow-[0_0_25px_rgba(0,255,255,0.12)]">

              <h2 className="text-2xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
                🧠 Human Detective
              </h2>

              <div className="space-y-4">

                <div className="bg-white/5 p-4 rounded-xl border border-white/10">

                  <AvailableActions
                    actions={availableActions}
                    onTakeAction={handleTakeAction}
                    disabled={!!winner || waitingForAITurn}
                  />
                </div>

                <CurrentDomains
                  title="Your Deductions"
                  domains={gameState?.current_domains}
                />

                <InvestigationHistory
                  history={humanHistory}
                  title="Your Investigation"
                  color="blue"
                />

              </div>
            </div>
          </div>


          {/* AI SIDE */}
          <div className="space-y-6">
            <div className="backdrop-blur-xl bg-[#100b16]/80 border border-purple-400/30 rounded-2xl p-6 shadow-[0_0_25px_rgba(180,0,255,0.12)]">

              <h2 className="text-2xl font-bold text-purple-300 mb-4 flex items-center gap-2">
                ⚙️ AI Detective
              </h2>

              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <AIDetectivePanel
                  aiState={aiProgress}
                  aiHistory={aiHistory}
                  onMakeMove={handleAIMakeMove}
                  disabled={!!winner}
                />
              </div>

            </div>
          </div>


        </div>

        {algorithmSteps.length > 0 && <AlgorithmVisualization steps={algorithmSteps} />}

        {gameStarted && !winner && (
          <AccusationPanel 
            onMakeAccusation={handleMakeAccusation} 
            disabled={waitingForAITurn}
          />
        )}

        <ResultModal
          isOpen={!!modalResult}
          onClose={() => setModalResult(null)}
          result={modalResult}
          humanState={gameState}
          aiState={aiProgress}
        />
      </div>
    </div>
  );
}

export default App;

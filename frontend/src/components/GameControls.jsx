const GameControls = ({ onStartGame, onAISuggest, onMinimaxSuggest, gameStarted }) => {
  return (
    <div className="flex gap-4 justify-center mb-5 flex-wrap">
      <button
        onClick={onStartGame}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold shadow-md hover:bg-blue-600 hover:-translate-y-0.5 transition-all duration-300"
      >
        🎮 Start New Game
      </button>
      <button
        onClick={onAISuggest}
        disabled={!gameStarted}
        className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold shadow-md hover:bg-green-600 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        🤖 Get AI Suggestion (A*)
      </button>
      <button
        onClick={onMinimaxSuggest}
        disabled={!gameStarted}
        className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold shadow-md hover:bg-green-600 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        🧠 Best Question (Minimax)
      </button>
    </div>
  );
};

export default GameControls;
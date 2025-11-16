// const GameControls = ({ onStartGame, onAIMakeMove, onAutoSolve, gameStarted, winner }) => {
//   return (
//     <div className="flex gap-4 justify-center mb-5 flex-wrap">
//       <button
//         onClick={onStartGame}
//         className="px-8 py-4 bg-green-500 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-green-600 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
//       >
//         🎮 Start New Race
//       </button>
//       <button
//         onClick={onAIMakeMove}
//         disabled={!gameStarted || !!winner}
//         className="px-8 py-4 bg-purple-500 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-purple-600 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         🤖 AI Make Move
//       </button>
//       <button
//         onClick={onAutoSolve}
//         disabled={!gameStarted || !!winner}
//         className="px-8 py-4 bg-orange-500 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-orange-600 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         ⚡ Watch AI Auto-Solve
//       </button>
//     </div>
//   );
// };

// export default GameControls;

const GameControls = ({ onStartGame, onAIMakeMove, onAutoSolve, gameStarted, winner }) => {
  return (
    <div className="flex gap-4 justify-center mb-8 flex-wrap">

      {/* Start Button */}
      <button
        onClick={onStartGame}
        className="px-8 py-4 rounded-2xl font-semibold text-lg 
        bg-linear-to-r from-emerald-500/20 to-cyan-500/20 
        border border-cyan-400/30 text-cyan-300 
        shadow-[0_0_15px_rgba(0,255,255,0.15)]
        hover:shadow-[0_0_25px_rgba(0,255,255,0.35)]
        hover:-translate-y-1 hover:border-cyan-300 
        transition-all duration-300">
        🎮 Start New Race
      </button>

      {/* AI Move Button */}
      <button
        onClick={onAIMakeMove}
        disabled={!gameStarted || !!winner}
        className="px-8 py-4 rounded-2xl font-semibold text-lg 
        bg-white/5 border border-white/10 text-gray-200
        hover:bg-white/10 hover:border-cyan-300 hover:text-cyan-300
        hover:shadow-[0_0_22px_rgba(0,255,255,0.35)]
        hover:-translate-y-1 transition-all duration-300
        disabled:opacity-40 disabled:cursor-not-allowed">
        🤖 AI Make Move
      </button>

      {/* Auto-Solve Button */}
      <button
        onClick={onAutoSolve}
        disabled={!gameStarted || !!winner}
        className="px-8 py-4 rounded-2xl font-semibold text-lg 
        bg-linear-to-r from-blue-600/20 to-indigo-600/20 
        border border-indigo-400/30 text-indigo-300
        hover:shadow-[0_0_25px_rgba(100,100,255,0.4)]
        hover:-translate-y-1 hover:border-indigo-300 
        transition-all duration-300
        disabled:opacity-40 disabled:cursor-not-allowed">
        ⚡ Watch AI Auto-Solve
      </button>
    </div>
  );
};

export default GameControls;

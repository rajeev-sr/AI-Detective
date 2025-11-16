const GameStatus = ({ gameState }) => {
  if (!gameState) return null;

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.4)] mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        <StatusCard
          label="💰 Total Cost"
          value={gameState.total_cost}
          glow="cyan"
        />

        <StatusCard
          label="🔍 Actions Taken"
          value={gameState.actions_taken.length}
          glow="blue"
        />

        <StatusCard
          label="🎯 Possible Solutions"
          value={gameState.possible_solutions}
          glow="amber"
        />

        <StatusCard
          label="📊 Constraints"
          value={gameState.constraints_count}
          glow="purple"
        />

      </div>
    </div>
  );
};

export default GameStatus;
const StatusCard = ({ label, value, glow }) => {
  const colors = {
    cyan:   "from-cyan-400 to-blue-500 shadow-[0_0_25px_rgba(0,255,255,0.35)]",
    blue:   "from-blue-400 to-indigo-500 shadow-[0_0_25px_rgba(80,180,255,0.35)]",
    amber:  "from-amber-400 to-yellow-500 shadow-[0_0_25px_rgba(255,200,0,0.35)]",
    purple: "from-purple-400 to-fuchsia-500 shadow-[0_0_25px_rgba(200,0,255,0.35)]",
  };

  return (
    <div
      className={`
        rounded-xl p-5 text-center text-white font-bold
        bg-linear-to-br ${colors[glow]}
      `}
    >
      <p className="text-sm opacity-90">{label}</p>
      <p className="text-3xl tracking-wide">{value}</p>
    </div>
  );
};

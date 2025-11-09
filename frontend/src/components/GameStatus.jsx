const GameStatus = ({ gameState }) => {
  if (!gameState) return null;

  return (
    <div className="bg-white p-5 rounded-2xl shadow-lg mb-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-5 rounded-xl text-center text-white">
          <h3 className="text-sm mb-2 opacity-90">💰 Total Cost</h3>
          <p className="text-3xl font-bold">{gameState.total_cost}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-5 rounded-xl text-center text-white">
          <h3 className="text-sm mb-2 opacity-90">🔍 Actions Taken</h3>
          <p className="text-3xl font-bold">{gameState.actions_taken.length}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-5 rounded-xl text-center text-white">
          <h3 className="text-sm mb-2 opacity-90">🎯 Possible Solutions</h3>
          <p className="text-3xl font-bold">{gameState.possible_solutions}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-5 rounded-xl text-center text-white">
          <h3 className="text-sm mb-2 opacity-90">📊 Constraints</h3>
          <p className="text-3xl font-bold">{gameState.constraints_count}</p>
        </div>
      </div>
    </div>
  );
};

export default GameStatus;
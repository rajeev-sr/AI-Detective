const AvailableActions = ({ actions, onTakeAction, disabled }) => {
  return (
    <div className="backdrop-blur-xl">
      <h2 className="text-lg font-bold text-cyan-300 mb-4 flex items-center gap-2">
        📋 Available Evidence
      </h2>

      {disabled && (
        <div className="mb-3 p-2 bg-yellow-500/20 border border-yellow-500/50 rounded-lg text-yellow-200 text-sm text-center">
          ⏳ Waiting for AI Detective's turn...
        </div>
      )}

      {actions.length === 0 ? (
        <p className="text-center text-gray-400 italic py-6">
          Start investigating to reveal clues...
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {actions.map((action) => (
            <div
              key={action.id}
              className="p-4 rounded-xl bg-cyan-600/10 border border-cyan-400/30 shadow-[0_0_12px_rgba(0,255,255,0.08)] hover:shadow-[0_0_18px_rgba(0,255,255,0.35)] transition-all duration-300"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-100 text-sm tracking-wide">
                  {action.action}
                </span>

                <span className="px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-300 font-bold text-xs border border-yellow-400/40">
                  💰 {action.cost}
                </span>
              </div>

              <button
                onClick={() => onTakeAction(action.id)}
                disabled={disabled}
                className="
                  w-full py-2 rounded-lg text-sm font-semibold
                  bg-linear-to-r from-cyan-400 to-blue-500
                  hover:from-cyan-300 hover:to-blue-400
                  transition-all duration-300
                  shadow-[0_0_12px_rgba(0,200,255,0.4)]
                  hover:shadow-[0_0_20px_rgba(0,200,255,0.7)]
                  disabled:opacity-40 disabled:cursor-not-allowed
                "
              >
                🔍 Investigate This
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableActions;

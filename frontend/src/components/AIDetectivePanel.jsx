const AIDetectivePanel = ({ aiState, aiHistory, onMakeMove, disabled }) => {
  return (
    <div className="space-y-6">

      {/* 🧠 AI STATUS */}
      {aiState ? (
        <div className=" border-purple-400/30 ">

          <h3 className="panel-title text-purple-300">🧠 AI Strategy Status</h3>

          <AIStatRow label="Algorithm" value={aiState.algorithm ?? "A* Search + CSP"} />

          <AIStatRow
            label="Confidence"
            value={
              aiState.confidence
                ? `${(aiState.confidence * 100).toFixed(1)}%`
                : "Analyzing..."
            }
          />

          {aiState.next_best_action && (
            <div className="mt-3 p-3 rounded-xl bg-purple-600/10 border border-purple-400/40">
              <p className="font-semibold text-purple-300 mb-1">Next Move:</p>
              <p className="text-sm text-gray-300">{aiState.next_best_action}</p>
            </div>
          )}
        </div>
      ) : (
        <div className=" border-purple-400/30 text-center py-6">
          <p className="text-gray-400">AI is ready to start investigating…</p>

          <button
            onClick={onMakeMove}
            disabled={disabled}
            className="
              mt-4 px-6 py-3 rounded-xl font-semibold text-white
              bg-linear-to-r from-purple-400 to-fuchsia-500
              hover:opacity-90 transition-all duration-300
              shadow-[0_0_15px_rgba(180,0,255,0.45)]
              disabled:opacity-40 disabled:cursor-not-allowed
            "
          >
            🤖 Let AI Start
          </button>
        </div>
      )}

      {/* 🎯 AI DEDUCTIONS */}
      {aiState?.current_domains && (
        <div className="glass-card border-purple-400/30 shadow-purple">

          <h3 className="panel-title text-purple-300">🎯 AI Deductions</h3>

          <div className="space-y-3">
            {Object.entries(aiState.current_domains).map(([category, values]) => (
              <div
                key={category}
                className="p-3 rounded-xl bg-purple-600/10 border border-purple-400/30"
              >
                <p className="font-semibold text-purple-200 capitalize mb-1">
                  {category}
                </p>

                <div className="flex flex-wrap gap-2">
                  {values.map((val, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide
                      ${
                        values.length === 1
                          ? "bg-emerald-500 text-white shadow-[0_0_8px_rgba(0,255,140,.6)] animate-pulse"
                          : "bg-white/10 text-purple-200 border border-purple-400/40"
                      }`}
                    >
                      {val}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 📜 AI LOG */}
      {aiHistory?.length > 0 && (
        <div className="glass-card border-purple-400/30 shadow-purple">

          <h3 className="panel-title text-purple-300">📜 AI Investigation Log</h3>

          <div className="max-h-80 overflow-y-auto pr-2 space-y-2">
            {aiHistory.map((item, idx) => (
              <div
                key={idx}
                className="
                  p-3 rounded-lg text-sm
                  bg-purple-600/10 border-l-4 border-purple-400/60
                "
              >
                <p className="text-purple-200 font-semibold">
                  Step {aiHistory.length - idx}: {item.action}
                </p>

                <p className="text-[11px] text-gray-400 mt-1">
                  🧠 {item.reasoning ?? "Optimal path selected by A*"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default AIDetectivePanel;

/* 🎯 SMALL HELPER */
const AIStatRow = ({ label, value }) => (
  <div className="flex justify-between text-sm text-gray-300">
    <span className="font-semibold">{label}:</span>
    <span className="text-purple-300">{value}</span>
  </div>
);

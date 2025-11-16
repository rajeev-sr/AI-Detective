const AISuggestionPanel = ({ suggestion, evaluations }) => {
  if (!suggestion) return null;

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-purple-400/30 rounded-2xl p-6 mt-6 shadow-[0_0_25px_rgba(150,0,255,0.25)]">
      
      <h3 className="text-xl font-bold text-purple-300 mb-4 flex items-center gap-2">
        🤖 AI Suggestion
      </h3>

      {/* Suggested Action */}
      <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-400/40">
        <h4 className="text-emerald-400 font-semibold mb-1">🌟 Recommended Action:</h4>

        <p className="text-lg font-bold text-gray-100 tracking-wide">
          {suggestion.action}
        </p>

        <p className="mt-2 text-gray-300 text-sm opacity-90 leading-snug">
          {suggestion.explanation}
        </p>
      </div>

      {/* A* Evaluations */}
      {evaluations?.length > 0 && (
        <div className="mt-5">
          <h4 className="font-semibold text-purple-200 mb-2">
            📊 A* Node Evaluations (f-cost)
          </h4>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {evaluations.map((ev, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-2 rounded-lg
                  bg-white/5 border border-white/10 text-sm"
              >
                <span className="text-gray-300">{ev.action}</span>

                <span className="font-bold text-cyan-300">
                  f = {ev.f_cost.toFixed(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AISuggestionPanel;

const AlgorithmVisualization = ({ steps }) => {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-indigo-400/30 p-6 rounded-2xl shadow-[0_0_25px_rgba(140,0,255,0.25)] mt-8">
      
      <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 text-indigo-300">
        🔬 Algorithm Execution Trace
      </h2>

      <p className="text-gray-300 mb-4 text-sm opacity-80">
        Watch how the AI narrows down the solution step-by-step:
      </p>

      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-xl border-l-4 animate-slideIn shadow-[0_0_12px_rgba(255,255,255,0.06)]
              ${getStepColor(step.type)}
            `}
            style={{ animationDelay: `${idx * 0.08}s` }}
          >
            <div className="flex gap-3">
              <span className="text-2xl">{getIcon(step.type)}</span>

              <div className="flex-1">
                <div className="font-semibold text-gray-100">
                  STEP {idx + 1} · {step.algorithm || "CSP"}
                </div>

                <div className="text-gray-300 text-sm">
                  {step.message || step.description}
                </div>

                {step.details && (
                  <div className="mt-2 p-2 rounded bg-black/30 text-xs text-gray-400 border border-white/10">
                    {step.details}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlgorithmVisualization;

// 🎨 SMALL HELPER FUNCTIONS
function getStepColor(type) {
  switch (type) {
    case "elimination":
      return "border-red-500/70 bg-red-500/15";
    case "confirmation":
      return "border-green-400/70 bg-green-500/15";
    case "search":
      return "border-blue-400/70 bg-blue-500/15";
    default:
      return "border-gray-400/50 bg-gray-500/10";
  }
}

function getIcon(type) {
  return type === "elimination"
    ? "❌"
    : type === "confirmation"
    ? "✅"
    : type === "search"
    ? "🔍"
    : "📝";
}

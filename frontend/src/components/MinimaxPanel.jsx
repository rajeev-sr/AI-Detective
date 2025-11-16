const MinimaxPanel = ({ bestQuestion, evaluations, onAskQuestion }) => {
  if (!bestQuestion) return null;

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-fuchsia-400/30 p-6 rounded-2xl shadow-[0_0_25px_rgba(255,0,160,0.25)] mt-6">

      <h3 className="text-xl font-bold mb-4 text-fuchsia-300 flex items-center gap-2">
        🧠 Best Interrogation Question
      </h3>

      {/* 🔥 BEST QUESTION */}
      <div className="p-4 rounded-xl bg-fuchsia-600/10 border border-fuchsia-400/40 mb-4">
        <h4 className="text-emerald-400 font-semibold mb-1">💡 Best Question</h4>
        <p className="text-lg font-bold text-gray-100 tracking-wide">
          {bestQuestion.question}
        </p>
      </div>

      {/* 📊 ALL EVALUATIONS */}
      {evaluations?.length > 0 && (
        <>
          <h4 className="font-semibold text-fuchsia-200 mb-2">
            📊 All Questions (Expected Utility)
          </h4>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1 mb-4">
            {evaluations.map((ev, idx) => (
              <div
                key={idx}
                className="
                  p-2 rounded-md flex justify-between items-center text-sm
                  bg-white/5 border border-white/10
                "
              >
                <span className="text-gray-300">{ev.question}</span>

                <span className="font-bold text-cyan-300">
                  {ev.expected_utility.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ❓ CTA BUTTON */}
      <button
        onClick={() => onAskQuestion(bestQuestion.id)}
        className="
          w-full py-3 rounded-xl font-semibold text-white
          bg-linear-to-r from-emerald-400 to-green-500
          hover:from-emerald-300 hover:to-green-400
          shadow-[0_0_18px_rgba(0,255,160,0.5)]
          hover:shadow-[0_0_25px_rgba(0,255,160,0.8)]
          transition-all duration-300
        "
      >
        ❓ Ask This Question
      </button>
    </div>
  );
};

export default MinimaxPanel;

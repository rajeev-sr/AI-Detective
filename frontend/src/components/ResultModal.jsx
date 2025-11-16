const ResultModal = ({ isOpen, onClose, result, humanState, aiState }) => {
  if (!isOpen || !result) return null;

  const isAIWin = result.winner === "AI Detective";
  const isHumanWin = result.correct === true && !isAIWin;
  const isWrong = !isAIWin && !isHumanWin;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-999 animate-fadeIn"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          relative max-w-lg w-full p-8 rounded-2xl text-center
          animate-slideUp border 
          ${
            isAIWin
              ? "bg-purple-900/30 border-purple-400/40 shadow-[0_0_35px_rgba(180,0,255,0.45)]"
              : isHumanWin
              ? "bg-emerald-900/30 border-emerald-400/40 shadow-[0_0_35px_rgba(0,255,160,0.45)]"
              : "bg-red-900/30 border-red-400/40 shadow-[0_0_35px_rgba(255,0,90,0.45)]"
          }
        `}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute right-4 top-3 text-2xl text-gray-300 hover:text-white"
        >
          ✖
        </button>

        {/* AI WINS */}
        {isAIWin && (
          <>
            <div className="text-4xl font-extrabold text-purple-300 mb-3">
              🤖 AI WINS!
            </div>
            <p className="text-lg text-gray-200 mb-4">
              The machine solved the mystery first.
            </p>

            <SolutionDisplay solution={result.solution} />

            <p className="text-sm text-purple-200 opacity-80 mt-3">
              ⚙ Cost: {aiState?.total_cost ?? 0} · Actions:{" "}
              {aiState?.actions_taken ?? 0}
            </p>

            <PlayAgainBtn color="purple" />
          </>
        )}

        {/* HUMAN WINS */}
        {isHumanWin && (
          <>
            <div className="text-4xl font-extrabold text-emerald-300 mb-3">
              🎉 YOU WIN!
            </div>
            <p className="text-lg text-gray-200 mb-4">You cracked the case!</p>

            <SolutionDisplay solution={result.solution} />

            <p className="text-sm text-emerald-200 opacity-80 mt-3">
              🧠 Cost: {humanState?.total_cost ?? 0} · Actions:{" "}
              {humanState?.actions_taken?.length ?? 0}
            </p>

            <PlayAgainBtn color="emerald" />
          </>
        )}

        {/* WRONG GUESS */}
        {isWrong && (
          <>
            <div className="text-4xl font-extrabold text-red-300 mb-3">
              ❌ WRONG ACCUSATION
            </div>

            <p className="text-gray-200 mb-4">
              Keep investigating — the truth is still hidden.
            </p>

            <button
              onClick={onClose}
              className="
                px-6 py-3 rounded-xl font-semibold text-white
                bg-linear-to-r from-cyan-400 to-blue-500
                hover:shadow-[0_0_20px_rgba(0,200,255,0.6)] transition
              "
            >
              🔍 Continue Investigation
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ResultModal;

/* 🔹 REUSABLE MINI COMPONENTS */

const SolutionDisplay = ({ solution }) => (
  <p className="text-lg font-semibold text-gray-100 tracking-wide mb-2">
    🕵️ {solution.suspect} · 🗡 {solution.weapon} · 📍 {solution.location}
  </p>
);

const PlayAgainBtn = ({ color }) => (
  <button
    onClick={() => window.location.reload()}
    className={`
    w-full mt-5 py-3 rounded-xl font-semibold text-white text-lg
    bg-linear-to-r from-${color}-400 to-${color}-500
    hover:shadow-[0_0_30px_rgba(0,0,0,0.6)]
    transition-all duration-300
  `}
  >
    🔁 Play Again
  </button>
);

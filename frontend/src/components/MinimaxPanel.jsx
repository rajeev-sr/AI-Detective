const MinimaxPanel = ({ bestQuestion, evaluations, onAskQuestion }) => {
  if (!bestQuestion) return null;

  return (
    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl mt-5 border-2 border-blue-500">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        🧠 Best Interrogation Question
      </h3>
      <div className="bg-white p-4 rounded-lg mb-4">
        <h4 className="text-green-600 font-semibold mb-2">💡 Best Question</h4>
        <p className="font-bold text-gray-800">{bestQuestion.question}</p>
      </div>
      {evaluations && evaluations.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold mb-2">📊 All Questions (Expected Utility)</h4>
          <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
            {evaluations.map((ev, idx) => (
              <div
                key={idx}
                className="bg-gray-50 p-2 rounded-lg flex justify-between items-center text-sm"
              >
                <span>{ev.question}</span>
                <span className="font-semibold text-blue-600">
                  {ev.expected_utility}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={() => onAskQuestion(bestQuestion.id)}
        className="w-full bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-300"
      >
        ❓ Ask This Question
      </button>
    </div>
  );
};

export default MinimaxPanel;
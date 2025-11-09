const AISuggestionPanel = ({ suggestion, evaluations }) => {
  if (!suggestion) return null;

  return (
    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl mt-5 border-2 border-blue-500">
      <h3 className="text-xl font-bold text-gray-800 mb-4">🤖 AI Suggestion</h3>
      <div className="bg-white p-4 rounded-lg mb-4">
        <h4 className="text-green-600 font-semibold mb-2">🌟 Recommended Action</h4>
        <p className="font-bold text-gray-800">{suggestion.action}</p>
        <p className="mt-2 text-gray-600 text-sm">{suggestion.explanation}</p>
      </div>
      {evaluations && evaluations.length > 0 && (
        <div>
          <h4 className="font-semibold mb-2">📊 All Evaluations (A* f-cost)</h4>
          <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
            {evaluations.map((ev, idx) => (
              <div
                key={idx}
                className="bg-gray-50 p-2 rounded-lg flex justify-between items-center text-sm"
              >
                <span>{ev.action}</span>
                <span className="font-semibold text-blue-600">
                  f={ev.f_cost.toFixed(1)}
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
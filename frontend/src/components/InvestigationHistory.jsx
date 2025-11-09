const InvestigationHistory = ({ history }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-5 pb-2 border-b-4 border-blue-500">
        📜 Investigation History
      </h2>
      <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto">
        {history.length === 0 ? (
          <p className="text-center text-gray-400 italic p-5">No actions taken yet</p>
        ) : (
          history.map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-50 p-4 rounded-xl border-l-4 border-green-500 animate-slideIn"
            >
              <div className="font-semibold text-gray-800 mb-1">
                🔍 {item.action}
              </div>
              <div className="text-gray-600 text-sm italic">"{item.clue}"</div>
              <div className="mt-2 text-sm text-orange-600">💰 Cost: {item.cost}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InvestigationHistory;
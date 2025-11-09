const AvailableActions = ({ actions, onTakeAction }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-5 pb-2 border-b-4 border-blue-500">
        📋 Available Actions
      </h2>
      <div className="flex flex-col gap-3">
        {actions.length === 0 ? (
          <p className="text-center text-gray-400 italic p-5">
            No more actions available
          </p>
        ) : (
          actions.map((action) => (
            <div
              key={action.id}
              className="bg-gray-50 p-4 rounded-xl border-l-4 border-blue-500 hover:translate-x-1 transition-transform duration-300"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-800">{action.action}</span>
                <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  💰 {action.cost}
                </span>
              </div>
              <button
                onClick={() => onTakeAction(action.id)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-600 transition-colors duration-300"
              >
                🔍 Investigate
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AvailableActions;
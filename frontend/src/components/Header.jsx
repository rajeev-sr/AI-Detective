// const Header = ({ raceMode, winner }) => {
//   return (
//     <header className="bg-white p-8 rounded-2xl shadow-lg mb-5 text-center border-4 border-yellow-400">
//       <h1 className="text-5xl font-bold text-gray-800 mb-2">
//         🕵️‍♂️ AI vs Human Detective Challenge 🤖
//       </h1>
//       <p className="text-gray-600 text-xl mb-2">Who can solve the mystery faster?</p>
//       <div className="flex justify-center gap-8 mt-4">
//         <div className="flex items-center gap-2">
//           <span className="text-2xl">🧠</span>
//           <span className="font-semibold text-blue-600">Human Intuition</span>
//         </div>
//         <div className="text-3xl font-bold text-yellow-500">VS</div>
//         <div className="flex items-center gap-2">
//           <span className="text-2xl">⚙️</span>
//           <span className="font-semibold text-purple-600">AI Algorithms</span>
//         </div>
//       </div>
//       {winner && (
//         <div className="mt-4 p-4 bg-yellow-100 rounded-xl border-2 border-yellow-500">
//           <p className="text-2xl font-bold text-yellow-800">
//             🏆 Winner: {winner === 'human' ? 'Human Detective!' : 'AI Detective!'}
//           </p>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;

const Header = ({ raceMode, winner }) => {
  return (
    <header className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.4)] mb-8 text-center transition-all">

      <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-wide">
        🕵️‍♂️ <span className="bg-linear-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
          AI vs Human Detective Challenge
        </span> 🤖
      </h1>


      <p className="text-gray-300 text-lg md:text-xl opacity-80">
        Who can solve the mystery faster?
      </p>

      <div className="flex justify-center gap-10 mt-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl inline-block animate-bounce">🧠</span>

          <span className="font-semibold text-blue-300">Human Intuition</span>
        </div>

        <span className="px-4 py-1 text-sm font-bold rounded-full bg-white/10 text-gray-200 tracking-widest">
          VS
        </span>

        <div className="flex items-center gap-2">
          <span className="text-2xl inline-block animate-[spin_3s_linear_infinite]">⚙️</span>

          <span className="font-semibold text-cyan-300">AI Algorithms</span>
        </div>
      </div>

      {winner && (
        <div className="mt-6 rounded-2xl p-4 bg-linear-to-r from-emerald-500/20 to-cyan-400/10 border border-cyan-400/30">
          <p className="text-xl font-bold text-cyan-300 tracking-wide">
            🏆 Winner: {winner === "human" ? "Human Detective!" : "AI Detective!"}
          </p>
        </div>
      )}
    </header>
  );
};

export default Header;


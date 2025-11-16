import React, { useState } from "react";

const AccusationPanel = ({ onMakeAccusation }) => {
  const [suspect, setSuspect] = useState("");
  const [weapon, setWeapon] = useState("");
  const [location, setLocation] = useState("");

  const suspects = ["Butler", "Chef", "Gardener"];
  const weapons = ["Knife", "Poison", "Rope"];
  const locations = ["Kitchen", "Library", "Garden"];

  const handleAccuse = () => {
    if (!suspect || !weapon || !location) {
      alert("Please select all three options!");
      return;
    }
    onMakeAccusation({ suspect, weapon, location });
  };

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-cyan-400/30 rounded-2xl p-6 shadow-[0_0_20px_rgba(0,255,255,0.18)] mt-8">
      <h2 className="text-2xl font-bold mb-6 tracking-wide text-cyan-300 flex items-center gap-2">
        ⚖️ Make Your Accusation
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <AccuseSelect
          label="Suspect"
          value={suspect}
          setValue={setSuspect}
          options={suspects}
        />

        <AccuseSelect
          label="Weapon"
          value={weapon}
          setValue={setWeapon}
          options={weapons}
        />

        <AccuseSelect
          label="Location"
          value={location}
          setValue={setLocation}
          options={locations}
        />
      </div>

      <button
        onClick={handleAccuse}
        className="
          w-full mt-6 px-6 py-4 rounded-xl font-bold text-lg
          bg-linear-to-r from-rose-500 to-red-600
          hover:from-red-500 hover:to-rose-600
          transition-all duration-300
          shadow-[0_0_18px_rgba(255,90,90,0.4)]
          hover:shadow-[0_0_25px_rgba(255,90,90,0.7)]
        "
      >
        🎯 Make Accusation
      </button>
    </div>
  );
};

export default AccusationPanel;

// 🔹 SUB-COMPONENT — CLEAN SELECT BOX
const AccuseSelect = ({ label, value, setValue, options }) => (
  <div className="flex flex-col gap-3">
    <label className="text-gray-300 font-semibold">{label}:</label>

    <select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="
        p-3 rounded-lg bg-black/30 border border-white/20 text-gray-200
        focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/40
        transition-all duration-300 
      "
    >
      <option value="">Select {label}</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  </div>
);

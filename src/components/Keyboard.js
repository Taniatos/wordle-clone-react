import React from "react";

function Keyboard({ handleKeyPress }) {
  const rows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["Delete", "z", "x", "c", "v", "b", "n", "m", "Enter"],
  ];

  return (
    <div id="keyboard-cont">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`keyboard-row ${rowIndex === 1 ? "second-row" : ""}`}
        >
          {row.map((key) => (
            <button
              key={key}
              className="keyboard-button"
              onClick={() => handleKeyPress(key)}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;

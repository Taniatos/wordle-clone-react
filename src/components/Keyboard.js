import React from "react";

function Keyboard({ handleKeyPress, confirmedGuesses, rightGuessString }) {
  const determineColor = (key) => {
    let color = "white";

    for (let guess of confirmedGuesses) {
      if (guess.includes(key)) {
        const keyIndex = guess.indexOf(key);
        if (rightGuessString[keyIndex] === key) {
          color = "#68D580"; // green
        } else if (rightGuessString.includes(key)) {
          color = "#F4FFB1"; // yellow
        } else {
          color = "#CEC8C8"; // gray
        }
      }
    }
    return color;
  };

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
              style={{
                backgroundColor: determineColor(key),
              }}
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

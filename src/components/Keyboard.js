import React, { useState, useEffect } from "react";

function Keyboard({
  handleKeyPress,
  guesses,
  rightGuessString,
  NUMBER_OF_GUESSES,
  isSubmitted,
}) {
  const [submittedKeys, setSubmittedKeys] = useState([]);

  useEffect(() => {
    let allKeys = [];
    guesses.forEach((guess) => {
      allKeys = [...allKeys, ...guess];
    });
    setSubmittedKeys(allKeys);
  }, [guesses]);

  const determineColor = (key) => {
    let color = "white"; // default color

    for (let i = 0; i < guesses.length; i++) {
      const guess = guesses[i];
      if (guess.includes(key)) {
        const keyIndex = guess.indexOf(key);
        if (guess[keyIndex] === rightGuessString[keyIndex]) {
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
                backgroundColor: isSubmitted ? determineColor(key) : "white",
              }} // Use isSubmitted to determine if color should be applied
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

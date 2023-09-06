import React from "react";

function LetterRow({ guess, answer, isSubmitted }) {
  const determineColor = (char, index) => {
    if (!isSubmitted) return "white";
    if (!char) return "white";
    if (char === answer[index]) return "green";
    if (answer.includes(char)) return "yellow";
    return "gray";
  };

  return (
    <div className="letter-row">
      {guess.map((char, index) => (
        <div
          key={index}
          className="letter-box"
          style={{ backgroundColor: determineColor(char, index) }}
        >
          {char}
        </div>
      ))}
    </div>
  );
}

export default LetterRow;

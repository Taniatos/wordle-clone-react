import React from "react";

function LetterRow({ guess, answer, isSubmitted }) {
  const determineColor = (char, index) => {
    if (!isSubmitted || char === "") return "white";

    if (guess.join("") === answer) return "#68D580"; //green

    if (char === answer[index]) return "#68D580"; //green
    if (answer.includes(char)) return "#F4FFB1"; //yellow
    return "#CEC8C8";//gray
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

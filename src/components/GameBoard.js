import React from "react";
import LetterRow from "./LetterRow";

function GameBoard({ guesses, rightGuessString, currentRow }) {
  return (
    <div id="game-board">
      {guesses.map((guess, index) => (
        <LetterRow
          key={index}
          guess={guess}
          answer={rightGuessString}
          isSubmitted={index < currentRow}
        />
      ))}
    </div>
  );
}

export default GameBoard;

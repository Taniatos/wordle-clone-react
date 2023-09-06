import React, { useState, useEffect } from "react";
import GameBoard from "./GameBoard";
import Keyboard from "./Keyboard";
import toastr from "toastr";
import { WORDS } from "./Words.js";
import "./style.css";

function Wordle() {
  const NUMBER_OF_GUESSES = 6;

  const [guesses, setGuesses] = useState([Array(5).fill("")]);
  const [rightGuessString, setRightGuessString] = useState("");
  const [currentRow, setCurrentRow] = useState(0);

  useEffect(() => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setRightGuessString(randomWord);
  }, []);

  const handleKeyPress = (pressedKey) => {
    if (pressedKey === "Enter") {
      if (validateWord()) {
        checkGuess();
      } else {
        toastr.warning("Please enter a valid 5-letter word from the list!");
      }
    } else if (pressedKey === "Delete") {
      deleteLetter();
    } else {
      insertLetter(pressedKey);
    }
  };

  const checkGuess = () => {
    // Checking and updating logic here...
    // After checking, move to next row for next guess
    setCurrentRow((prevRow) => prevRow + 1);
    setGuesses((prevGuesses) => [...prevGuesses, Array(5).fill("")]);
  };

  const deleteLetter = () => {
    if (
      currentRow < NUMBER_OF_GUESSES &&
      guesses[currentRow].some((letter) => letter !== "")
    ) {
      const updatedGuess = [...guesses[currentRow]];
      const lastIndex = updatedGuess.lastIndexOf("");
      updatedGuess[lastIndex - 1] = "";
      const updatedGuesses = [...guesses];
      updatedGuesses[currentRow] = updatedGuess;
      setGuesses(updatedGuesses);
    }
  };

  const insertLetter = (letter) => {
    if (guesses[currentRow].includes("")) {
      const updatedGuess = [...guesses[currentRow]];
      const index = updatedGuess.indexOf("");
      updatedGuess[index] = letter;
      const updatedGuesses = [...guesses];
      updatedGuesses[currentRow] = updatedGuess;
      setGuesses(updatedGuesses);
    }
  };

  const validateWord = () => {
    const word = guesses[currentRow].join("");
    return word.length === 5 && WORDS.includes(word);
  };

  return (
    <div className="wordle-container">
      <h1>Wordle</h1>
      <GameBoard
        guesses={guesses}
        rightGuessString={rightGuessString}
        currentRow={currentRow}
      />
      <Keyboard handleKeyPress={handleKeyPress} />
      <p>Guesses Remaining: {NUMBER_OF_GUESSES - currentRow}</p>
    </div>
  );
}

export default Wordle;

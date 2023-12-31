import React, { useState, useEffect } from "react";
import GameBoard from "../GameBoard/GameBoard";
import Keyboard from "../Keyboard/Keyboard";
import toastr from "toastr";
import { WORDS } from "../Words/Words.js";
import "../Styles/style.css";

function Wordle() {
  const NUMBER_OF_GUESSES = 6;
  const [guesses, setGuesses] = useState(
    Array(NUMBER_OF_GUESSES).fill(Array(5).fill(""))
  );
  const [rightGuessString, setRightGuessString] = useState("");
  const [currentRow, setCurrentRow] = useState(0);
  const [hasGuessedCorrectly, setHasGuessedCorrectly] = useState(false);
  const [confirmedGuesses, setConfirmedGuesses] = useState([]);

  useEffect(() => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setRightGuessString(randomWord);
    console.log(randomWord);
  }, []);

  const handleKeyPress = (pressedKey) => {
    if (hasGuessedCorrectly || currentRow >= NUMBER_OF_GUESSES) {
      return;
    }
    if (pressedKey === "Enter") {
      if (validateWord()) {
        checkGuess();
        setConfirmedGuesses((prev) => [...prev, guesses[currentRow].join("")]);
        setCurrentRow((prevRow) => prevRow + 1);
      } else {
        toastr.warning("Please enter an existing 5-letter word.");
      }
    } else if (pressedKey === "Delete") {
      deleteLetter();
    } else {
      insertLetter(pressedKey);
    }
  };

  const checkGuess = () => {
    const currentWord = guesses[currentRow].join("");
    if (currentWord === rightGuessString) {
      setHasGuessedCorrectly(true);
      toastr.success("Wow! You've nailed it! Refresh the page to play again.");
    } else if (currentRow === NUMBER_OF_GUESSES - 1) {
      toastr.error(
        `Oops, better luck next time! The correct word was '${rightGuessString}'. Refresh the page to try again!`
      );
    }
  };

  const validateWord = () => {
    const word = guesses[currentRow].join("");
    return word.length === 5 && WORDS.includes(word);
  };

  const deleteLetter = () => {
    if (currentRow < NUMBER_OF_GUESSES) {
      const updatedGuess = [...guesses[currentRow]];
      let lastIndexToRemove = -1;

      for (let i = updatedGuess.length - 1; i >= 0; i--) {
        if (updatedGuess[i] !== "") {
          lastIndexToRemove = i;
          break;
        }
      }

      if (lastIndexToRemove !== -1) {
        updatedGuess[lastIndexToRemove] = "";
        const updatedGuesses = [...guesses];
        updatedGuesses[currentRow] = updatedGuess;
        setGuesses(updatedGuesses);
      }
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

  return (
    <div className="wordle-container">
      <img
        src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/096/710/original/wordle-w.png?1694462850"
        alt="wordle"
      />
      <GameBoard
        guesses={guesses}
        rightGuessString={rightGuessString}
        currentRow={currentRow}
        hasGuessedCorrectly={hasGuessedCorrectly}
      />
      <Keyboard
        handleKeyPress={handleKeyPress}
        confirmedGuesses={confirmedGuesses}
        rightGuessString={rightGuessString}
      />
      <p>Guesses Remaining: {NUMBER_OF_GUESSES - currentRow}</p>
    </div>
  );
}

export default Wordle;

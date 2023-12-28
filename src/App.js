import { useCallback, useEffect, useState } from 'react';

import './App.css';

import StartScreen from './components/startScreen/StartScreen';
import Game from './components/game/Game';
import End from './components/end/End';

import {wordsList} from './data/words';

const stages = [ 

  { id: 1, name: 'start' },
  { id: 2, name: 'game' },
  { id: 3, name: 'end' },

]

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);


  const pickWordAndCategory = useCallback(() => {

    //select random category
    const categories = Object.keys(words)
    const randomCategory = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    //select random word
    const randomWord = words[randomCategory][Math.floor(Math.random() * words[randomCategory].length)]

    return {randomWord, randomCategory}

  }, [words])

  const startGame = useCallback(() => { 

    clearLetterStates()

    const { randomWord, randomCategory } = pickWordAndCategory();

    let wordLetters = randomWord.split("");

    wordLetters = wordLetters.map((l) => l.toLowerCase());

    console.log(randomWord, randomCategory)
    console.log(wordLetters)

    setPickedCategory(randomCategory)
    setPickedWord(randomWord)
    setLetters(wordLetters)
    
    setGameStage(stages[1].name);

  }, [pickWordAndCategory])

  

  const verifyLetter = (letter) => {

    const normalizedLetter = letter.toLowerCase();

    if (
     
     guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)
    
    ) {

      return;

    }

    if (letters.includes(normalizedLetter)) {

      setGuessedLetters((actualGuessedLetters) => [

        ...actualGuessedLetters, normalizedLetter,

      ])

    } else {

      setWrongLetters((actualWrongLetters) => [

        ...actualWrongLetters, normalizedLetter,

      ])

      setGuesses((actualGuesses) => actualGuesses - 1)

    }

  }

  function clearLetterStates() {
    
    setGuessedLetters([]);
    setWrongLetters([]);
  
  }

  useEffect(() => {

    if (guesses <= 0) {

      setGameStage(stages[2].name);
      clearLetterStates()
      
    }

  }, [guesses])

  useEffect(() => {

    const uniqueLetter = [...new Set(letters)];

    if (guessedLetters.length === uniqueLetter.length && gameStage === stages[1].name) {

      setScore((actualScore) => actualScore += 100)
      startGame();

    } 

  }, [guessedLetters, gameStage, letters, startGame]);

  const restart = () => {

    setGameStage(stages[0].name);
    setScore(0)
    setGuesses(3)

  }

  return (

    <div className="App">
        
      {gameStage === 'start' && <StartScreen startGame={startGame} /> }

      {gameStage === 'game' && <Game
        
        verifyLetter={verifyLetter}
        pickedWord={pickedWord}
        pickedCategory={pickedCategory}
        letters={letters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score}
        
      /> }

      {gameStage === 'end' && <End restart={restart} score={score} /> }

    </div>

  );
       
}

export default App
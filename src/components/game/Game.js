import React from 'react'
import { useState, useRef } from "react";

import "./Game.css"

const Game = ({
  
  verifyLetter,
  pickedWord,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score

}) => {

  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null)

  const handleSubmit = (e) => {

    e.preventDefault();
    verifyLetter(letter);

    letterInputRef.current.focus();

    setLetter("");

  }

  return (
    
    <div className='game'>

      <h1>Adivinhe a palavra</h1>

      <p className='points'>

        <span>Pontuação: {score}</span>

      </p>

      <p>Tentativas restantes: {guesses}</p>

      <h3 className='tip'>
        
        Dica: <span>{pickedCategory}</span> 
        
      </h3>

      <div className='wordContainer'>

        {letters.map((letter, i ) => (

          guessedLetters.includes(letter) ? (

            <span key={i} className='letter'>{letter}</span>

          ) : (

            <span key={i} className='blankSquare'></span>

          )

        ))}

      </div>

      <div className='letterContainer'>

        <p>Tente adivinhar uma letra da palavra</p>

        <form onSubmit={handleSubmit}>

          <input  
          
            type='text' 
            name='letter' 
            maxLength='1' 
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            ref={letterInputRef}
            required 
          
          />
          
          <button>Enviar</button>

        </form>

      </div>

      <div className='wrongLettersContainer'>

        <p>Letras já utilizadas:</p>

        {wrongLetters.map((letter, i) => (

            <span key={i}>{letter.toUpperCase()} </span>

        ) )}

      </div>

    </div>

  )

}

export default Game
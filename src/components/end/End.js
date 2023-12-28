import React from 'react'
import "./End.css"

const End = ({restart, score}) => {
  return (
    <div>

      <h1>VOCÊ PERDEU</h1>

      <h2>Pontuação: {score}</h2>

      <button onClick={restart}>Reiniciar</button>

    </div>
  )
}

export default End
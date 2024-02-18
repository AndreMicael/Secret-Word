import React from 'react'
import './style.css'

const Game = ({verifyLetter}) => {
  return (
    <div className='game'>
      
      <h1>Game</h1>
      <p className="points">
        <span>Pontuação: 000</span>
      </p>

      <h1>Advinha a palavra:</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>Dica...</span>
      </h3>

      <div className="wordContainer">
        <span className='letter'>A</span>
        <span className="blankSquare"></span>
      </div>

      <div className="letterContainer">
        <p>Tente adivinhar uma letra da palavra:</p>
        <form>
          <input type='text' name='letter' maxLength="1" required/> 
          <button>Jogar! </button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Letras já utilizadas</p>
        <span>A,B,D</span>
      </div>

      <button onClick={verifyLetter}>Finalizar o jogo</button> 

    </div>
  )
}

export default Game
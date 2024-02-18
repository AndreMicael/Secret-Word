import React from 'react'
import './style.css'

const EndGame = ({retry}) => {
  return (
    <div>
      <h1>Game Over</h1>
      <button onClick={retry}>Resetar jogo</button>
      

    </div>
  )
}

export default EndGame
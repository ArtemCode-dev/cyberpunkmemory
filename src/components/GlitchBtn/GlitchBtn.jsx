import React from 'react'

function GhitchatBtn({onClick, gameStarted}) {
  return (
    <button onClick={() => onClick()} className='startGame'>
      <input class="input" name="btn" id="value-1" type="radio" />
      <div class="btn">
        <span ariaHidden="">_{gameStarted === 2 ? 'Restart game' : 'Start game'}</span>
        <span class="btn__glitch" ariaHidden="">Start game</span>
      </div>
      </button>
  )
}

export default GhitchatBtn
import React from "react"


function WinModal({isOpen, gameStarted, setIsWinModalOpen}) {
  const winTitle = 'The code has been hacked'
  const winBtn = 'Hack a new code'
  return (
    <>
    {isOpen && <div className='modal'>
        <div className='modal__content'>
          <div class="glitch-container">
            {winTitle}
            <span>{winTitle}</span>
            <span>{winTitle}</span>
          </div>
          <section>
          {gameStarted !== 2 && <p>
            You did it, here's the new code.
          </p>}
          <button onClick={() => {
            setIsWinModalOpen(false)
            
            }} class="ui-btn">
            <span>
            {winBtn} 
            </span>
          </button>
          </section>
          </div>
        </div>}
      </>
  )
}

export default WinModal
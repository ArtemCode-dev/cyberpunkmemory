import React from "react"
import GlitchText from "../GlitchText/GlitchText"


function Modal({isOpen, gameStarted, setIsModalOpen}) {
const modalTitle ='Rules'
const getStarted = 'Game started///'
  return (
    <>
    {isOpen && <div className='modal'>
        <div className='modal__content'>
        <GlitchText text={gameStarted !== 2 ? modalTitle : getStarted} />

          <section>
          {gameStarted !== 2 && <p>
            Hack the access code, <span className='glitchText'></span>
          </p>}
          <button onClick={() => setIsModalOpen(false)} class="ui-btn">
            <span>
            {gameStarted !== 2 ? '_Get started' : '_Ok'} 
            </span>
          </button>
          </section>
          </div>
        </div>}
      </>
  )
}

export default Modal
import React from 'react'

function GlitchText({text}) {
  return (
    <div class="glitch-container">
    {text}
    <span>{text}</span>
    <span>{text}</span>
    </div>
  )
}

export default GlitchText

import { useEffect, useState } from 'react';
import './index.css'
import bgimg from './91eb0fa06a837784a7a2c52145e30907.jpeg'
import skull from './skull.svg'

function App() {

  const [gameStarted, setGameStarted] = useState(0)
  const [array, setArray] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [error, setError] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [isWinModalOpen, setIsWinModalOpen] = useState(false)

  function shuffleArray() {

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    for(let i = 0; i < array.length; i++) {
      
    }
    return array;
}

function getGameStarted() {
  setGameStarted(1)
  setError(false)

  const shuffledArray = shuffleArray();
  shuffledArray.forEach((id, index) => {
      setTimeout(() => {
          const block = document.getElementById(id);
          if (block) {
              block.classList.add('content__block_blue');
              setTimeout(() => {
                  block.classList.remove('content__block_blue');
              }, 1000);
          }
          if(index + 1 === shuffledArray.length) {
            setTimeout(() => {
              // alert('Game started')
              setGameStarted(2)
              setIsModalOpen(true)
            }, 1500)

          }
      }, index * 1000); 

  });
}

const [resultedArr, setResultedArr] = useState([]);

const chooseRight = (id) => {
  if(gameStarted === 1 || gameStarted === 0) {
    return
  }
  setResultedArr((prevArr) => {

    let newArr = prevArr ? [...prevArr, id] : [id];
    const block = document.getElementById(id);
    block.classList.add('content__block_blue');

    if(id === array[newArr.length - 1]) {
      if(newArr.length === array.length) {
        setIsWinModalOpen(true)
        setGameStarted(0)
        newArr = []
        const blocks = document.querySelectorAll('.content__block');
        blocks.forEach(block => {
          block.classList.remove('content__block_blue');
        });
        return newArr
      }
      return newArr
    } 
    setError(true)
    setGameStarted(false)

    console.log('error', newArr, array)
    setGameStarted(0)
    newArr = []
    
    const blocks = document.querySelectorAll('.content__block');
    blocks.forEach(block => {
      block.classList.remove('content__block_blue');
    });

    return newArr;
  });
};

const title = 'Enter the code'
const modalTitle ='Rules'
const getStarted = 'Game started///'
const winTitle = 'The code has been hacked'
const winBtn = 'Hack a new code'
const renderArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  return (
    <div className="App">
            {isWinModalOpen && <div className='modal'>
        <div className='modal__content'>
          <div class="glitch-container">
            {winTitle}
            <span>{winTitle}</span>
            <span>{winTitle}</span>
          </div>
          <section>
          {gameStarted !== 2 && <p>
            You did it, samurai, here's the new code.
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
      {isModalOpen && <div className='modal'>
        <div className='modal__content'>
          <div class="glitch-container">
            {gameStarted !== 2 ? modalTitle : getStarted}
            <span>{gameStarted !== 2 ? modalTitle : getStarted}</span>
            <span>{gameStarted !== 2 ? modalTitle : getStarted}</span>
          </div>
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

      <img src={bgimg} className='bg' /> 

      <div className='container'>

      <div class="glitch-container">
      {title}
      <span>{title}</span>
      <span>{title}</span>
      </div>

      {!error ? <ul className="gameField">
      {renderArr.map((item) => (
        <li onClick={() => chooseRight(item)} className="content__block" id={item}>{item}</li>
      ))}
      
      </ul> : 
      <div className={'error'}>
        <img src={skull} /> 
        <p>Wrong password!!</p>
      </div>}

      {gameStarted === 1 ? 
      <p className='process'></p> : 
      <button onClick={() => getGameStarted()} className='startGame'>
      <input class="input" name="btn" id="value-1" type="radio" />
      <div class="btn">
        <span aria-hidden="">_{gameStarted === 2 ? 'Restart game' : 'Start game'}</span>
        <span class="btn__glitch" aria-hidden="">Start game</span>
        {/* <label class="number">r1</label> */}
      </div>
      </button>}
      </div>
    </div>
  );
}

export default App;

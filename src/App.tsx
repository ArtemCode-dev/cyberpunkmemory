
import { useEffect, useState } from 'react';
import './index.css'
import bgimg from './91eb0fa06a837784a7a2c52145e30907.jpeg'
import skull from './skull.svg'
import WinModal from './components/WinModal/WinModal';
import Modal from './components/Modal/Modal';
import GlitchText from './components/GlitchText/GlitchText';
import GhitchatBtn from './components/GlitchBtn/GlitchBtn';

enum GameStatus {
  NOT_STARTED = 'not_started',
  STARTED = 'started',
  ENDED = 'ended',
}

function App() {

  const [gameStarted, setGameStarted] = useState<boolean | GameStatus>(GameStatus.NOT_STARTED)
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
  setGameStarted(GameStatus.STARTED)
  setError(false)

  const shuffledArray = shuffleArray();
  shuffledArray.forEach((id:number, index:number) => {
      setTimeout(() => {
          const block = document.getElementById(String(id));
          if (block) {
              block.classList.add('content__block_blue');
              setTimeout(() => {
                  block.classList.remove('content__block_blue');
              }, 1000);
          }
          if(index + 1 === shuffledArray.length) {
            setTimeout(() => {
              // alert('Game started')
              setGameStarted(GameStatus.ENDED)
              setIsModalOpen(true)
            }, 1500)

          }
      }, index * 1000); 

  });
}

const [resultedArr, setResultedArr] = useState<number[] | []>([]);

const chooseRight = (id:number) => {
  if(gameStarted === GameStatus.NOT_STARTED || gameStarted === GameStatus.STARTED) {
    return
  }
  setResultedArr((prevArr) => {

    let newArr = prevArr ? [...prevArr, id] : [id];
    const block = document.getElementById(String(id));
    block?.classList.add('content__block_blue');

    if(id === array[newArr.length - 1]) {
      if(newArr.length === array.length) {
        setIsWinModalOpen(true)
        setGameStarted(GameStatus.NOT_STARTED)
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
    setGameStarted(GameStatus.NOT_STARTED)
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
const indexes = [1, 2, 3, 4, 5, 6, 7, 8, 9]

return (
  <div className="App">
    <WinModal isOpen={isWinModalOpen} gameStarted={gameStarted} setIsWinModalOpen={setIsWinModalOpen} />
    <Modal isOpen={isModalOpen} gameStarted={gameStarted} setIsModalOpen={setIsModalOpen} />

    <img src={bgimg} className='bg' alt='bg'/> 

    <div className='container'>

    <GlitchText text={title} />

    {!error ? <ul className="gameField">
    {indexes.map((item) => (
      <li onClick={() => chooseRight(item)} className="content__block" id={item}>{item}</li>
    ))}
    
    </ul> : 
    <div className={'error'}>
      <img src={skull} alt=''skull/> 
      <p>Wrong password!!</p>
    </div>}

    {gameStarted === GameStatus.STARTED ? 
    <p className='process'></p> : <GhitchatBtn gameStarted={gameStarted} onClick={() => getGameStarted()} />}
    </div>
  </div>
);
}

export default App;

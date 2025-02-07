
import { useEffect, useState } from 'react';
import './index.css'
import bgimg from './91eb0fa06a837784a7a2c52145e30907.jpeg'
import skull from './skull.svg'
import WinModal from './components/WinModal/WinModal';
import Modal from './components/Modal/Modal';
import GlitchText from './components/GlitchText/GlitchText';
import GhitchatBtn from './components/GlitchBtn/GlitchBtn';

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
              setGameStarted(2)
              setIsModalOpen(true)
            }, 1500)

          }
      }, index * 1000); 

  });
}

const [resultedArr, setResultedArr] = useState([]);

const chooseRight = (id) => {
  if (gameStarted === 1 || gameStarted === 0) {
  }

  setResultedArr((prevArr) => {
    let newArr = prevArr ? [...prevArr, id] : [id];
    const block = document.getElementById(id);

    if (block) {
      block.classList.add('content__block_blue');
    }

    if (id === array[newArr.length - 1]) {
      if (newArr.length === array.length) {
        resetGame(); 
        setIsWinModalOpen(true);
        return [];
      }
      return newArr; 
    }

    handleError(newArr);
    return [];
  });
};

const resetGame = () => {
  setGameStarted(0);
  const blocks = document.querySelectorAll('.content__block');
  blocks.forEach(block => block.classList.remove('content__block_blue'));
};

const handleError = (newArr) => {
  setError(true);
  setGameStarted(false);
  console.log('error', newArr, array);
  resetGame();
};

const title = 'Enter the code'
const renderArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  return (
    <div className="App">
      <WinModal isOpen={isWinModalOpen} gameStarted={gameStarted} setIsWinModalOpen={setIsWinModalOpen} />
      <Modal isOpen={isModalOpen} gameStarted={gameStarted} setIsModalOpen={setIsModalOpen} />

      <img src={bgimg} className='bg' alt='bg'/> 

      <div className='container'>

      <GlitchText text={title} />

      {!error ? <ul className="gameField">
      {renderArr.map((item) => (
        <li onClick={() => chooseRight(item)} className="content__block" id={item}>{item}</li>
      ))}
      
      </ul> : 
      <div className={'error'}>
        <img src={skull} alt=''skull/> 
        <p>Wrong password!!</p>
      </div>}

      {gameStarted === 1 ? 
      <p className='process'></p> : <GhitchatBtn gameStarted={gameStarted} onClick={() => getGameStarted()} />}
      </div>
    </div>
  );
}

export default App;

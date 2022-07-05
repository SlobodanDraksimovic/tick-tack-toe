import { useState, useEffect } from 'react';
import './index.css';
import Square from './Square';

const INITIAL_GAME_STATE = ['','','','','','','','',''];
const WINNING_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
];
const INITIAL_SCORE = {
  X: 0,
  O: 0
}

function App() {
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE)
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [score, setScore] = useState(INITIAL_SCORE)

  useEffect(() => {
    const storedScores = localStorage.getItem("score")
    if(storedScores){
      setScore(JSON.parse(storedScores))
    }
  },[])

  useEffect(() => {
    if(gameState === INITIAL_GAME_STATE){
      return
    }
    checkForWinner()
  },[gameState])

  const resetBoard = () => {
    setGameState(INITIAL_GAME_STATE);
  }
  const checkForWinner = () => {
    let roundWon = false;

    for(let i = 0; i < WINNING_COMBOS.length; i++){
      const winCombos = WINNING_COMBOS[i];

      let a = gameState[winCombos[0]];
      let b = gameState[winCombos[1]];
      let c = gameState[winCombos[2]];
      if([a,b,c].includes('')){
        continue
      } 
      if(a === b && b === c){
        roundWon = true;
        break;
      }
    }
      if(roundWon){
        setTimeout(() => {
          window.alert(`Congrats ${currentPlayer} : You are the winner`)
          const newPlayerScore = score[currentPlayer] + 1;
          const newScore = {...score};
          newScore[currentPlayer] = newPlayerScore;
          setScore(newScore)
           
          resetBoard()
        }, 500);
        return;
      }
      if(!gameState.includes('')){
        setTimeout(() => {
          window.alert("The game ended in a draw");
          resetBoard()
        }, 500)
        return;
      }
    changePlayer()
  }

  const changePlayer = () => {
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : "X")
  }

  const handleCellClick = (e) => {
    const cellIndex = Number(e.target.getAttribute('data-cell-index'));
    const currentValue = gameState[cellIndex];
    if(currentValue){
      return
    }
    const newValues = [...gameState];
    newValues[cellIndex] = currentPlayer;
    setGameState(newValues);
  }

  return (
    <div className="h-full p-8 tex-slate-800 bg-gradient-to-r from-cyan-500 to-blue-500">
      <h1 className='text-center text-5xl mb-4 font-display text-white'>Tick tack toe</h1>
      <div className='grid grid-cols-3 gap-3 mx-auto w-96'>
        {gameState.map((player, idx) => 
        <Square 
          onClick={handleCellClick} 
          key={idx} 
          {...{idx, player}} 
        />)}
      </div>
      <div className='m-auto w-96 text-2xl text-serif text-white'>
        <p>Next player: <span>{currentPlayer}</span></p>
        <p>Player X wins: <span>{score['X']}</span></p>
        <p>Player O wins: <span>{score['O']}</span></p>
      </div>
    </div>
  )
}

export default App

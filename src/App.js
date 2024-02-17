//Css
import './App.css';

//Hooks
import { useCallback, useEffect, useState } from 'react';

//Dados

//Componentes
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import EndGame from './components/EndGame';
import { wordsList } from './data/words';

const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"},
];


function App() {
  const [gameStage,setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  
  const startGame = () => {
    setGameStage(stages[1].name);
  }
 
  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && <Game/>}
      {gameStage === 'end' && <EndGame/>}
    </div>

  );
}

export default App;

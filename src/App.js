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
  
  const [pickedWord,setPickedWord] = useState('');
  const [pickedCategory, setPickedCategory] = useState('');
  const [letters, setLetters] = useState([]);

  const wordNCategory = () => {
    //Selecionar categoria aleatória
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random()*Object.keys(categories).length)];
    
    //Selecionar palavra aleatória
    const word = words[category][Math.floor(Math.random()*words[category].length)];

    return {word,category}
  }

  // Começa o jogo
  const startGame = () => {
  // Pegar Palavra e Categoria
   const {word, category} = wordNCategory();

  // Criar um array de letras
  let wordLetters = word.split('');
  wordLetters = wordLetters.map((l) => l.toLowerCase()); //Deixa as letras maiúsculas

  setPickedWord(word);
  setPickedCategory(category);
  setLetters(letters);


  setGameStage(stages[1].name);
}
  // Processar a letra
  const verifyLetter = () => {
    setGameStage(stages[2].name);
  };

  //Reiniciar o jogo

  const retry = () => {
    setGameStage(stages[0].name);
  }


 
  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && <Game verifyLetter={verifyLetter}/>}
      {gameStage === 'end' && <EndGame retry={retry}/>}
    </div>

  );
}

export default App;

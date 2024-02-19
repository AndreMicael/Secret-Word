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

const guessesQty = 3;


function App() {
  const [gameStage,setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  
  const [pickedWord,setPickedWord] = useState('');
  const [pickedCategory, setPickedCategory] = useState('');
  const [letters, setLetters] = useState([]);

  const [guessedLetters,setGuessedLetters] = useState([]);
  const [wrongLetters,setWrongLetters] = useState([]);
  const [guesses,setGuesses] = useState(guessesQty);
  const [score,setScore] = useState(50);




  const wordNCategory = useCallback(() => {
    //Selecionar categoria aleatória
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random()*Object.keys(categories).length)];
    
    //Selecionar palavra aleatória
    const word = words[category][Math.floor(Math.random()*words[category].length)];

    return {word,category}
  },[words]);

  // Começa o jogo
  const startGame = useCallback(() => {
  clearLetterStates();

  // Pegar Palavra e Categoria
   const {word, category} = wordNCategory();

  // Criar um array de letras
  let wordLetters = word.split('');
  wordLetters = wordLetters.map((l) => l.toLowerCase()); //Deixa as letras maiúsculas

  setPickedWord(word);
  setPickedCategory(category);
  setLetters(wordLetters);



  setGameStage(stages[1].name);
},[wordNCategory]);


  // Processar a letra
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    if (guessedLetters.includes(normalizedLetter) || 
    wrongLetters.includes(normalizedLetter)) {
      return;
    }

    // Enviar letras advinhadas ou removê-las
    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters, 
        normalizedLetter
      ] )
    
    }else {

      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters, 
        normalizedLetter
      ] )
      setGuesses((actualGuesses) => actualGuesses - 1);
    }





  };

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }

  useEffect(() => {
    if (guesses <= 0) {

      clearLetterStates();
      setGameStage(stages[2].name);
    }

  },[guesses])

  

  useEffect( ()=> {

    const uniqueLetters = [
    ...new Set(letters)
    ];

    if(guessedLetters.length === uniqueLetters.length) {
      setScore((actualScore => actualScore += 100));
   
      startGame();
    }

  },[guessedLetters,letters,startGame])

  //Reiniciar o jogo

  const retry = () => {
    setScore(50);
    setGuesses(guessesQty);
    setGameStage(stages[0].name);
  }


 
  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && <Game verifyLetter={verifyLetter}
      pickedWord={pickedWord} 
      pickedCategory={pickedCategory}
      letters={letters}
      guessedLetters={guessedLetters}
      wrongLetters={wrongLetters}
      guesses={guesses}
      score={score}
      retry={retry}


      />}
      {gameStage === 'end' && <EndGame retry={retry}
      score={score}/>}
    </div>

  );
}

export default App;

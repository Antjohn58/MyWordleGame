import { checkWordPositions } from "./wordle.js"; 
import { addToggleFunction }  from "./toggle-dark-mode.js";
const dictionary = ['apple', 'plane', 'spark', 'hello'];
const wordleGrid = document.getElementById('wordle-grid');

addToggleFunction();

const result = checkWordPositions('heeyy', 'hello');
console.log(result);

function addCellToGrid(row, col) {
    const cell = document.createElement('div');
    cell.classList.add('letter');
    cell.id = `${row}-${col}`;
    wordleGrid.appendChild(cell);
}

const gameConfig = {
    rows: 5,
    cols: 5,
    word: 'hello',
};

createGameGrid();

function createGameGrid() {
    for (let row = 0; row < gameConfig.rows; row++) {
        for (let col = 0; col < gameConfig.cols; col++) {
            addCellToGrid(row, col);
        }
    }
}

function addLetterToBox(letter, row, col) {
    const cell = document.getElementById(`${row}-${col}`);
    cell.innerText = letter;
}

const gameState = {
    currentAttempt: 0,
    currentPosition: 0
};

function isLetter(letter) {
    return letter.length === 1 && letter.match(/[a-z]/i);
}

async function isWordValid(word){
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`).then((response) => response.json());
    console.log(Array.isArray(response) && response.length > 0);
    return Array.isArray(response) && response.length > 0;
}

function updateAttemptGrid(){
    const result = checkWordPositions(gameState.currentGuess, gameConfig.word);
    SpeechRecognitionResultList.forEach((result, index) => {
        const cell = document.getElementById(`${gameState.currentAttempt}-${index}`);
        cell.classList.add(result);
    });
}

document.addEventListener('keydown', async(event) => {
    console.log(event.key);

    if (event.key === 'Enter') {
        //did they finish all their attempts
        if (gameState.currentAttempt === gameConfig.rows - 1) {
            console.log('Game Over');     
            return;              
        }
        //check if they provided 5 characters
        if(gameState.currentPosition !== gameConfig.cols - 1) {
            console.log('Please provide 5 characters');
            return;
        }
        //check if it is a correct word
        if (! await (isWordValid(gameState.currentGuess))) {
            console.log('You guessed an invalid word');
            return;
    }
        //are my characters in the correct position    
        uopdateAttemptGrid();    
        //if it is correct, show the word in green
        gameState.currentAttempt++;
        gameState.currentPosition = 0;
        gameState.currentGuess = '';
    }
    if (event.key === 'Backspace') {
        gameState.currentPosition--;
        addLetterToBox('', gameState.currentAttempt, gameState.currentPosition);
        return;
    }
    if (isLetter(event.key)) {
    addLetterToBox(
        event.key, 
        gameState.currentAttempt, 
        gameState.currentPosition);
    gameState.currentGuess += event.key;  
    if (gameState.currentPosition !== gameConfig.cols - 1) {
        gameState.currentPosition++;
    }  
}  
});
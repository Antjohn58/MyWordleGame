export function checkWordPositions(userGuess, wordToBeGuessed) {
    userGuess.split('').forEach((letter, index) => {
        if (letter === userGuess[index]) {
            console.log(`Letter ${letter} is in the correct position`);
            return `correct`
        }

        else if (wordToBeGuessed.includes(letter)) {
            console.log(`Letter ${letter} is not in the correct position`);
            return `misplaced`
        }

        else {
            console.log(`Letter ${letter} does not exist in the word`);
            return `wrong`
        }
    });
}

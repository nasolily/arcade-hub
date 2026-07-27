export const MAX_MISTAKES = 6;

export function getMaskedWord(word, guessedLetters) {
  return word
    .split("")
    .map((letter) => (guessedLetters.includes(letter.toUpperCase()) ? letter : "_"))
    .join(" ");
}

export function getMistakeCount(word, guessedLetters) {
  return guessedLetters.filter(
    (letter) => !word.toUpperCase().includes(letter.toUpperCase())
  ).length;
}

export function getGameStatus(word, guessedLetters) {
  const mistakes = getMistakeCount(word, guessedLetters);
  
  // check loss
  if (mistakes >= MAX_MISTAKES) return "lost";

  // check win
  const isWon = word
    .split("")
    .every((letter) => guessedLetters.includes(letter.toUpperCase()) || letter === " ");

  if (isWon) return "won";
  
  return "playing";
}
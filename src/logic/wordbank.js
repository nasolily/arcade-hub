export const WORDS = [
  "BUMBLEBEE", "AVOCADO", "CHAMPION", "GALAXY", "WHISPER",
  "JOURNEY", "PHANTOM", "TREASURE", "TURTLE", "VOLCANO",
  "NETWORK", "PYRAMID", "ZEPHYR", "HORIZON", "MYSTIC"
];

export const getRandomWord = () => {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
};
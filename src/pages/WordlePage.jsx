import React from 'react';
import Wordle from '../components/wordle-game/Wordle';

const WordlePage = () => {
  return (
    <main className="game-container">
      <h2>Wordle</h2>
      <section>
        <p className='wordle-message'>Guess the 5-letter word!</p>
        <Wordle />
      </section>
    </main>
  );
};

export default WordlePage;
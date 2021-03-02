import React from 'react';
import GameBoard from './components/GameBoard';

export const GamePage = () => {
  return (
    <div>
      {/* <h1>Minesweeper</h1> */}
      <div className="game">
        <GameBoard />
      </div>
    </div>
  )
}
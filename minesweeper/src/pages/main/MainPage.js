import React from 'react';

export const MainPage = () => {
  return (
    <div className="main-page">
      <h1>Minesweeper</h1>
      <div className="container main-buttons">
        <a href="/game" className="btn btn-primary">New Game</a>
        <a href="/settings" className="btn btn-primary">Settings</a>
        <a href="/rules" className="btn btn-primary">Rules</a>
        <a href="/score" className="btn btn-primary">Score</a>
        <a href="/auth" className="btn btn-primary">Authentication</a>
      </div>
    </div>
  )
}
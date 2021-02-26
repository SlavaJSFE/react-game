import React from 'react';

export const MainPage = () => {
  return (
    <div>
      <h1>React Game</h1>
      <div className="row main-buttons">
        <div className="col-sm">
          <a href="/game" className="btn btn-primary">New Game</a>
          <a href="/settings" className="btn btn-primary">Settings</a>
          <a href="/rules" className="btn btn-primary">Rules</a>
          <a href="/score" className="btn btn-primary">Score</a>
          <a href="/authentication" className="btn btn-primary">Authentication</a>
        </div>
      </div>
    </div>
  )
}
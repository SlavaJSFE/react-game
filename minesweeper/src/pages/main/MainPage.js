import React from 'react';
// import { Howl } from 'howler';
// import sound from '../../assets/sounds/main-menu.mp3';
// import click from '../../assets/sounds/button-click.mp3';

export const MainPage = () => {
  // new Howl({
  //   src: [sound],
  //   autoplay: true,
  //   loop: true
  // });
  
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

import React, { Component } from 'react';
import { Howl } from 'howler';
import sound from '../../assets/sounds/main-menu.mp3';

export class MainPage extends Component {
  constructor() {
    super()

    this.backgroundSound = new Howl({
      src: [sound],
      html5: true,
      loop: true,
      autoUnlock: true
    });
  }

  componentDidMount() {
    this.backgroundSound.play();
  }

  componentWillUnmount() {
    this.backgroundSound.fade(this.backgroundSound.volume(), 0, 1000);
    this.backgroundSound.stop();
  }
  
  render() {
    return (
      <div className="main-page container">
        <h1>Minesweeper</h1>
        <div className="container main-buttons">
          <a href="/game" className="btn btn-primary shadow">New Game</a>
          {/* <a href="/settings" className="btn btn-primary shadow">Settings</a> */}
          <a href="/rules" className="btn btn-primary shadow">Rules</a>
          <a href="/score" className="btn btn-primary shadow">Score</a>
          {/* <a href="/auth" className="btn btn-primary shadow">Authentication</a> */}
        </div>
      </div>
    )
  }
}

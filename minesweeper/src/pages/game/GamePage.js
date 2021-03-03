import React, { Component } from 'react';
import GameBoard from './components/GameBoard';
import {clickSound} from '../../utils/sounds';

export class GamePage extends Component {
  render() {
    return (
      <div className="game-wrapper">
        <div className="mode-buttons">
          <button className="btn btn-primary" type="button" onClick={clickSound}>Beginner</button>
          <button className="btn btn-primary" type="button" onClick={clickSound}>Intermediate</button>
          <button className="btn btn-primary" type="button" onClick={clickSound}>Expert</button>
        </div>
        <div className="game">
          <GameBoard />
        </div>
      </div>
    )
  }
}

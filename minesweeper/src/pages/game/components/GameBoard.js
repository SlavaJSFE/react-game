import React, { Component } from 'react';
import Counter from './Counter';
import Field from './Field';
import Timer from './Timer';

class GameBoard extends Component {
  constructor() {
    super()

    this.state = {
      rows: 9,
      columns: 9,
      mines: 10
    }
  }

  render() {
    return (
      <div className="game-board">
        <div className="board-head">
          <Counter />
          <button type="button" className="reset">Reset</button>
          <Timer />
        </div>
        <Field rows={this.state.rows} columns={this.state.columns} mines={this.state.mines}/>
      </div>
    )
  }
}

export default GameBoard;

import React, { Component } from 'react';
import Counter from './Counter';
import Field from './Field';
import Timer from './Timer';

class GameBoard extends Component {
  constructor() {
    super();

    this.state = {
      gameStatus: 'waiting',
      rows: 9, // rows: 9, rows: 16, rows: 16
      columns: 9, // columns: 9, columns: 16, columns: 30
      mines: 10, // mines: 10, mines: 40, mines: 99
      flags: 10,
      time: 0,
      openCells: 0
    }

    this.baseState = this.state;
  }

  componentDidUpdate() {
    if (this.state.gameStatus === 'running') {
      this.checkIfWon();
    }
  }

  checkIfWon = () => {
    if (this.state.mines + this.state.openCells === this.state.rows * this.state.columns) {
      console.log('WIN!!!')
    }
  }

  reset = () => {
    this.setState(this.baseState);
  }

  // componentWillMount() {
  //   this.intervals = [];
  // }

  // setInterval = (func, time) => {
  //   this.intervals.push((func, time))
  // }

  tick = () => {
    if(this.state.openCells > 0 && this.state.gameStatus === 'running') {
      let time = this.state.time + 1;
      this.setState({ time });
    }
  }

  startGame = () => {
    if (this.state.openCells === 0 && this.state.gameStatus !== 'running') {
      this.setState(
        {gameStatus: 'running'}
      );
      setInterval(() => {
        this.tick();
      }, 1000)
    }
    this.setState({ openCells: this.state.openCells + 1})
  }

  changeFlagCount = (number) => {
    if (this.state.flags === 0 && number === -1) {
      return;
    }

    this.setState({ flags: this.state.flags + number});
  }

  render() {
    return (
      <div className="game-board">
        <div className="board-head">
          <Counter flags={this.state.flags}/>
          <button
            type="button"
            className="reset btn btn-primary"
            onClick={this.reset}
          >
            Reset
          </button>
          <Timer time={this.state.time}/>
        </div>
        <Field
          rows={this.state.rows}
          columns={this.state.columns}
          mines={this.state.mines}
          flags={this.state.flags}
          gameStatus={this.state.gameStatus}
          startGame={this.startGame}
          changeFlagCount={this.changeFlagCount}
        />
      </div>
    )
  }
}

export default GameBoard;

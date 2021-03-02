import React, { Component } from 'react';
import generateLayout from '../../../utils/generateLayout';
import Counter from './Counter';
import Timer from './Timer';
import Row from './Row'

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
      timer: null,
      openCells: 0,
      layout: generateLayout(9, 9, 10)
    }

    this.baseState = this.state;
  }

  componentDidUpdate() {
    if (this.state.gameStatus === 'running') {
      this.checkIfWon();
    }
  }

  openCell = (cellData) => {
    if (this.state.gameStatus === 'ended') {
      return;
    }

    const minesCount = new Promise((resolve) => {
      const minesAround = this.countMinesAround(cellData);
      resolve(minesAround);
    })
    
    minesCount.then((numberOfMines) => {
      const layout = this.state.layout;
      const currentCell = layout[cellData.y][cellData.x];

      if (!currentCell.hasFlag && !currentCell.isOpen) {
        if (currentCell.hasMine) {
          this.endGame('lose');
        }

        this.handleCellClick();

        currentCell.isOpen = true;
        currentCell.minesAround = numberOfMines;

        this.setState({ layout });

        if (numberOfMines === 0) {
          this.openAroundCells(cellData);
        }
      }
    });
  }

  openAroundCells = (cellData) => {
    const layout = this.state.layout;
    const anyRowOfArray = 0;

    for (let row = -1; row <= 1; row++) {
      for (let column = -1; column <= 1; column++) {
        if (cellData.y + row >= 0
            && cellData.x + column >=0
            && cellData.y + row < this.state.layout.length
            && cellData.x + column <this.state.layout[anyRowOfArray].length
            && !this.state.layout[cellData.y + row][cellData.x + column].hasMine
            && !(row === 0 && column === 0)) {
              this.openCell(layout[cellData.y + row][cellData.x + column]);
        }
      }
    }
  }

  countMinesAround = (cellData) => {
    let minesAround = 0;
    const anyRowOfArray = 0;

    for (let row = -1; row <= 1; row++) {
      for (let column = -1; column <= 1; column++) {
        if (cellData.y + row >= 0
            && cellData.x + column >=0
            && cellData.y + row < this.state.layout.length
            && cellData.x + column <this.state.layout[anyRowOfArray].length
            && this.state.layout[cellData.y + row][cellData.x + column].hasMine
            && !(row === 0 && column === 0)) {
              minesAround += 1;
        }
      }
    }

    return minesAround;
  }

  checkIfWon = () => {
    if (this.state.mines + this.state.openCells === this.state.rows * this.state.columns) {
      this.endGame('win');
    }
  }

  endGame = (result) => {
    this.setState(
      {gameStatus: 'ended'}
    );

    if (result === 'win') {
      setTimeout(() => {

      });
    }

    if (result === 'lose') {
      setTimeout(() => {

      });
    }
  }

  reset = () => {
    this.setState(this.baseState);

    const newLayout = generateLayout(9, 9, 10);

    this.setState({ layout: newLayout });
    
    clearInterval(this.state.timer)
  }

  tick = () => {
    if(this.state.openCells > 0 && this.state.gameStatus === 'running') {
      let time = this.state.time + 1;
      this.setState({ time });
    }
  }

  handleCellClick = () => {
    if (this.state.openCells === 0 && this.state.gameStatus !== 'running') {
      const timer = setInterval(() => {
        this.tick();
      }, 1000);

      this.setState({gameStatus: 'running', timer});
    }

    this.setState({ openCells: this.state.openCells + 1})
  }

  setFlag = (cellData) => {
    if (this.props.gameStatus === 'ended'
      || (this.props.flags === 0 && !cellData.hasFlag)) {
      return;
    }

    const layout = this.state.layout;
    const currentCell = layout[cellData.y][cellData.x];

    if (cellData.hasFlag) {
      currentCell.hasFlag = false;
    } else {
      currentCell.hasFlag = true;
    }

    this.setState({ layout });

    this.changeFlagCount(cellData.hasFlag ? 1 : -1);
  }

  changeFlagCount = (number) => {
    if (this.state.flags === 0 && number === -1) {
      return;
    }

    this.setState({ flags: this.state.flags + number});
  }

  renderRows() {
    const layout = this.state.layout;
    return layout.map((row, rowIndex) => {
      return (
        <Row
          key={rowIndex}
          row={row}
          openCell={this.openCell}
          setFlag={this.setFlag}
        />
      )
    })
  }

  render() {
    const rows = this.renderRows();

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
        <div className="field">
          {rows}
        </div>
      </div>
    )
  }
}

export default GameBoard;

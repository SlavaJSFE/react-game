import React, { Component } from 'react';
import { Modal } from 'bootstrap';
import { Howl, Howler } from 'howler';
import pirates from '../../../assets/sounds/pirates.mp3';
import generateLayout from '../../../utils/generateLayout';
import { clickSound, playWinSound, playLoseSound } from '../../../utils/sounds';
import Counter from './Counter';
import Timer from './Timer';
import Row from './Row'
import ModalWindow from './ModalWindow';
import Volume from './Volume';

class GameBoard extends Component {
  constructor() {
    super();

    this.state = {
      gameStatus: 'waiting',
      rows: 9,
      columns: 9,
      mines: 10,
      flags: 10,
      time: 0,
      timer: null,
      openCells: 0,
      message: {
        title: null,
        date: null,
        time: null
      },
      volume: 1
    }

    this.state.layout = generateLayout(this.state.rows, this.state.columns, this.state.mines);

    this.baseState = this.state;

    this.piratesSound = new Howl({
      src: [pirates],
      volume: 0.1,
      loop: true,
      html5: true
    });
    this.piratesSound.play();
  }

  componentDidUpdate() {
    if (this.state.gameStatus === 'running') {
      this.checkIfWon();
    }
    Howler.volume(this.state.volume)
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
    this.piratesSound.pause();
    this.modalWindow = new Modal(document.getElementById('staticBackdrop'));

    const message = {
      time: this.state.time,
      date: new Date()
    }

    if (result === 'win') {
      playWinSound();
      message.title = 'Congratulations! You Won!'
      
      setTimeout(() => {
        this.modalWindow.show();
      }, 1000);
    }

    if (result === 'lose') {
      playLoseSound();
      message.title = 'You Lose...';

      setTimeout(() => {
        this.modalWindow.show();
      }, 2000);
    }

    this.setState(
      {gameStatus: 'ended', message}
    );
  }

  reset = () => {
    if (!this.piratesSound.playing()) {
      this.piratesSound.play();
    }

    clickSound();

    const newLayout = generateLayout(this.state.rows, this.state.columns, this.state.mines);

    this.setState({
      gameStatus: 'waiting',
      layout: newLayout,
      time: 0,
      openCells: 0,
      flags: this.state.mines
    });
    
    clearInterval(this.state.timer);
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

  handleButtonNewGame = () => {
    this.reset();
    this.modalWindow.hide();
  }

  setBeginner = () => {
    clickSound();
    this.reset();

    const state = {
      rows: 9, 
      columns: 9,
      mines: 10,
      flags: 10,
    }
    state.layout = generateLayout(state.rows, state.columns, state.mines);
  
    this.setState(state);
  }

  setIntermediate = () => {
    clickSound();
    this.reset();

    const state = {
      rows: 16, 
      columns: 16,
      mines: 40,
      flags: 40,
    }
    state.layout = generateLayout(state.rows, state.columns, state.mines);
  
    this.setState(state);
  }

  setExpert = () => {
    clickSound();
    this.reset();

    const state = {
      rows: 16, 
      columns: 30,
      mines: 99,
      flags: 99,
    }
    state.layout = generateLayout(state.rows, state.columns, state.mines);
  
    this.setState(state);
  }

  setVolume = (value) => {
    this.setState({ volume: value})
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
      <div className="game-wrapper">
        <div className="mode-buttons">

          <button
            className="btn btn-primary shadow"
            type="button"
            onClick={this.setBeginner}
          >
            Beginner
          </button>

          <button
            className="btn btn-primary shadow"
            type="button"
            onClick={this.setIntermediate}
          >
            Intermediate
          </button>

          <button
            className="btn btn-primary shadow"
            type="button"
            onClick={this.setExpert}
          >
            Expert
          </button>

        </div>
        <div>
          <div className="game-board shadow">
            <ModalWindow
              handleButtonNewGame={this.handleButtonNewGame}
              message={this.state.message}
            />
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
        </div>
        <div>
          <Volume
            volume={this.state.volume}
            setVolume={this.setVolume}
          />
        </div>
      </div>
    )
  }
}

export default GameBoard;

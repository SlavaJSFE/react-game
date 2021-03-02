import React, { Component } from 'react';
import generateLayout from '../../../utils/generateLayout';
import Row from './Row'

class Field extends Component {
  constructor(props) {
    super(props);

    this.state = {
      layout: generateLayout(props.rows, props.columns, props.mines)
    }
  }

  // createLayout(rows, columns) {
  //   const layout = [] ;
  //   for (let i = 0; i < rows; i++) {
  //     layout.push([])
  //   }
  //   layout.map((row, index) => {
  //     for (let i = 0; i < columns; i++) {
  //       row.push({
  //         x: i,
  //         y: index,
  //         hasMine: false,
  //         isOpen: false,
  //         hasFlag: false,
  //         minesAround: 0
  //       })
  //     }
  //     return row;
  //   });

  //   for (let i = 0; i < this.props.mines; i++) {
  //     const randomX = Math.floor(Math.random() * this.props.columns);
  //     const randomY = Math.floor(Math.random() * this.props.rows);

  //     const cellWithMine = layout[randomY][randomX];

  //     cellWithMine.hasMine ? i-- : cellWithMine.hasMine = true;
  //   }

  //   return layout;
  // }

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

    this.props.changeFlagCount(cellData.hasFlag ? 1 : -1);
  }

  openCell = (cellData) => {
    if (this.props.gameStatus === 'ended') {
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
          console.log('end game');
        }

        this.props.handleCellClick();

        currentCell.isOpen = true;
        currentCell.minesAround = numberOfMines;

        this.setState({ layout });

        if (numberOfMines === 0) {
          this.openAroundCells(cellData);
        }
      }
    });
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
      <div className="field">
        {rows}
      </div>
    )
  }
}

export default Field;

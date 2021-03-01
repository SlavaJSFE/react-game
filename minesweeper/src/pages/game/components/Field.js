import React, { Component } from 'react';
import Row from './Row'

class Field extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mines: 10,
      layout: this.createLayout(props.rows, props.columns),
    }
  }

  createLayout(rows, columns) {
    const cells = [] ;
    for (let i = 0; i < rows; i++) {
      cells.push([])
    }
    cells.map((row) => {
      for (let i = 0; i < columns; i++) {
        row.push(i)
      }
      return row
    });

    return cells;
  }

  renderCells() {
    return this.state.layout.map((row, rowIndex) => {
      return (
        <Row key={rowIndex} rowIndex={rowIndex} cells={row}/>
      )
    })
  }

  render() {
    const cells = this.renderCells();
    return (
      <div className="field">
        {cells}
      </div>
    )
  }
}

export default Field;

import React from 'react';
import Cell from './Cell';

const Row = (props) => {
  const cells = props.cells.map((cell, index) => {
    const uniqueKey = `${index}, ${props.rowIndex}`
    return (
      <Cell key={uniqueKey} xCoordinate={index} yCoordinate={props.rowIndex} />
    )
  })
  return (
    <div className="cell-row">
      {cells}
    </div>
  )
}

export default Row;

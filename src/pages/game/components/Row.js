import React from 'react';
import Cell from './Cell';

const Row = (props) => {
  const cells = props.row.map((cell, index) => {
    const uniqueKey = `${props.row[index].x}, ${props.row[index].y}`

    return (
      <Cell
        key={uniqueKey}
        x={props.row[index].x}
        y={props.row[index].y}
        isOpen={props.row[index].isOpen}
        hasMine={props.row[index].hasMine}
        hasFlag={props.row[index].hasFlag}
        minesAround={props.row[index].minesAround}
        openCell={props.openCell}
        setFlag={props.setFlag}
      />
    )
  })
  return (
    <div className="cell-row">
      {cells}
    </div>
  )
}

export default Row;

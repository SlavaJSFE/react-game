import React from 'react';

const Cell = (props) => {
  const cellData = {
    x: props.x,
    y: props.y,
    isOpen: props.isOpen,
    hasMine: props.hasMine,
    hasFlag: props.hasFlag,
    minesAround: props.minesAround
  }

  const cell = () => {
    if (props.isOpen) {
      if (props.hasMine) {
        return (
          <div className="cell-open bg-danger">+</div>
        )
      } else if (props.minesAround === 0) {
        return (
          <div className="cell-open" />
        )
      }

      return (
        <div className="cell-open">
          {props.minesAround}
        </div>
      )
    } else if (props.hasFlag) {
      return (
        <div
          className="cell"
          onContextMenu={(event) => {
            event.preventDefault();
            props.setFlag(cellData);
          }}
        >
          <div className="flag" />
        </div>
      )
    }

    return (
      <div
        className="cell"
        onClick={() => props.openCell(cellData)}
        onContextMenu={(event) => {
          event.preventDefault();
          props.setFlag(cellData);
        }}
      />
    )
  }

  return cell()
}

export default Cell;

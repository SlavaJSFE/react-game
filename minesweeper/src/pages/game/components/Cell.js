import React, { Component } from 'react';

class Cell extends Component {
  constructor(props) {
    super(props)

    this.state = {
      x: props.xCoordinate,
      y: props.yCoordinate,
      isOpen: false,
      hasMine: false,
      minesNearby: 0
    }
  }

  handleCellClick = () => {
    this.setState({ isOpen: true })
  }

  render() {
    return (
      <div
        className={this.state.isOpen? "cell-open" : "cell-close"}
        onClick={this.handleCellClick}
        onContextMenu={(event) => {
          event.preventDefault();
          console.log('right click')
        }}
      />
    )
  }
}

export default Cell;

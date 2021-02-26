import React, { Component } from 'react';
import Field from './components/field';
import Timer from './components/Timer'

class GamePage extends Component {
  constructor() {
    super()
    this.state = {
      rows: 10,
      columns: 10,
      flags: 10,
      mines: 10
    }
  }

  render() {
    return (
      <div>
        <h1>Game Page</h1>
        <div className="minesweeper">
          <div className="head">
            <Timer />
          </div>
          <div className="field">
            <Field rows={this.state.rows} columns={this.state.columns}/>
          </div>
        </div>
      </div>
    )
  }
}

export default GamePage;

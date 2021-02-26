import React, { Component } from 'react';

class Field extends Component {
  constructor(props) {
    super(props)

    this.state = {
      rows: this.createField(props)
    }
    console.log(props)
  }

  createField(props) {
    // let field = [];
    // console.log(props);
    // for (i = 0; i < props.rows; i += 1) {
    //   field.push([]);
    // }
    return props.rows;
  }

  render() {
    // console.log(props);
    return (
      <div className="field-component">
        Field
      </div>
    )
  }
}

export default Field;

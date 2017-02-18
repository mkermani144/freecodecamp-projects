import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {
  render() {
    const style = { backgroundColor: this.props.bgColor };
    return <div className="cell" style={style} />;
  }
}

export default Cell;

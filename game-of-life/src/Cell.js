import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {
  render() {
    return <div className="cell" onClick={this.props.onClick} />;
  }
}

export default Cell;

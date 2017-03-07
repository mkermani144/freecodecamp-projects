import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {
  render() {
    return <div className="cell" style={this.props.style} onClick={() => this.props.onClick(this.props.cellKey)} />;
  }
}

export default Cell;

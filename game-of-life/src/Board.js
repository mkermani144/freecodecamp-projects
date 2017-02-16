import React, { Component } from 'react';
import Cell from './Cell';
import './Board.css';

class Board extends Component {
  render() {
    const cells = [];
    for (let i = 0; i < 100; i++) {
      const bgColor = this.props.states[i] === 1 ? 'red' : 'black';
      cells.push(<Cell onClick={this.props.onClick} style={{backgroundColor: bgColor}} key={i} />);
    }
    return <div className="board">{cells}</div>;
  }
}

export default Board;

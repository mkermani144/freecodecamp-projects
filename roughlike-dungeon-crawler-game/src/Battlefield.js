import React, { Component } from 'react';
import Cell from './Cell';
import './Battlefield.css';

class Battlefield extends Component {
  render() {
    const cells = [];
    this.props.cellColors.forEach((color) => {
      cells.push(<Cell bgColor={color} />);
    });
    return (
      <div className="battlefield">
        {cells}
      </div>
    );
  }
}

export default Battlefield;

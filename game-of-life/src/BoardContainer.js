import React, { Component } from 'react';
import Board from './Board';

class BoardContainer extends Component {
  constructor() {
    super();
    this.state = {
      states: this.randomArray()
    };
  }
  render() {
    return <Board states={this.state.states} onClick={this.handleClick} />;
  }
  handleClick = (key) => {
    this.setState((prev) => {
      prev.states[key] = +!prev.states[key];
    });
  }
  randomArray = () => {
    const array = [];
    for (let i = 0; i < 1600; i++) {
      array[i] = Math.floor(Math.random() + .4);
    }
    return array;
  }
}

export default BoardContainer;

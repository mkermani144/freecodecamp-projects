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
    return <div><Board states={this.state.states} onClick={this.handleClick} /></div>;
  }
  handleClick = (e) => {
    
  }
  randomArray = () => {
    const array = [];
    for (let i = 0; i < 10; i++) {
      array[i] = [];
      for (let j = 0; j < 10; j++) {
        array[i][j] = Math.floor(Math.random() + .5);
      }
    }
    return array;
  }
}

export default BoardContainer;

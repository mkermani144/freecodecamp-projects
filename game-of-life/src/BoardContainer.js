import React, { Component } from 'react';
import Board from './Board';

class BoardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      states: this.randomArray()
    };
  }
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
  render() {
    clearTimeout(this.timeout);
    if (this.props.action.auto) {
      const timeout = setTimeout(this.update, 1000);
      this.timeout = timeout;
    }
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
  update = () => {
    const nextGeneration = [];
    const neighbours = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    for (let i = 0; i < 40; i++) {
      for (let j = 0; j < 40; j++) {
        let total = 0;
        neighbours.forEach((neighbour) => {
          if(i + neighbour[0] > 39 || i + neighbour[0] < 0 || j + neighbour[1] > 39 || j + neighbour[1] < 0) {
            total += 0;
          } else {
            total += this.state.states[(i + neighbour[0]) * 40 + (j + neighbour[1])];
          }
        });
        if (this.state.states[i * 40 + j] === 1) {
          if (total < 2 || total > 3) {
            nextGeneration[i * 40 + j] = 0;
          } else {
            nextGeneration[i * 40 + j] = 1;
          }
        } else {
          if (total === 3) {
            nextGeneration[i * 40 + j] = 1;
          } else {
            nextGeneration[i * 40 + j] = 0;
          }
        }
      }
    }
    this.setState({
      states: nextGeneration
    });
  }
}

export default BoardContainer;

import React, { Component } from 'react';

class BoardContainer extends Component {
  constructor() {

  }
  randomArray = () => {
    array = [];
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

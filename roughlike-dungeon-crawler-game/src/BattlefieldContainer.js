import React, { Component } from 'react';
import Battlefield from './Battlefield';

class BattlefieldContainer extends Component {
  constructor() {
    this.cellsInfo = Battlefield[0];
    this.dirtyBattlefield();
  }
  render() {
    const cellsInfo = null;
    return <Battlefield />;
  }
  dirtyBattlefield = () => {
    const base = (dungeon, type, iterateNum) => {
      while (iterateNum) {
        const row = Math.floor(Math.random()) * 400;
        const column = Math.floor(Math.random()) * 400;
        if (this.cellsInfo[dungeon][row][column] === 1) {
          this.cellsInfo[dungeon][row][column] = type;
          iterateNum--;
        }
      }
    }
    const shuffleEnemies = (dungeon) => base(dungeon, 2, 5);
    const shuffleHealthItems = (dungeon) => base(dungeon, 3, 5);
    const shuffleWeapon = (dungeon) => base(dungeon, 4, 1);
    const shuffleLineOfSightEnhancer = (dungeon) => base(dungeon, 5, 1);
    for (let dungeon = 0; dungeon < 5; dungeon++) {
      shuffleEnemies(dungeon);
      shuffleHealthItems(dungeon);
      shuffleWeapon(dungeon);
      shuffleLineOfSightEnhancer(dungeon);
    }
  }
}

export default BattlefieldContainer;

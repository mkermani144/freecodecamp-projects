import React, { Component } from 'react';
import Battlefield from './Battlefield';
import createMap from './MapCreator';
import flatten from 'lodash/flatten';
import unzip from 'lodash/unzip';

class BattlefieldContainer extends Component {
  constructor() {
    super();
    this.cellsInfo = [createMap()];
    this.dirtyBattlefield();
  }
  render() {
    const typeToColor = {
      '-1': 'black',
      0: 'grey',
      1: 'white',
      2: 'red',
      3: 'green',
      4: 'orange',
      5: 'pink',
      6: 'purple'
    };
    return <Battlefield cellColors={flatten(unzip(this.cellsInfo[0])).map(type => typeToColor[type])}/>;
  }
  dirtyBattlefield = () => {
    const base = (dungeon, type, iterateNum) => {
      while (iterateNum) {
        const row = Math.floor(Math.random() * 200);
        const column = Math.floor(Math.random() * 100);
        if (this.cellsInfo[dungeon][row][column] === 1) {
          this.cellsInfo[dungeon][row][column] = type;
          iterateNum--;
        }
      }
    }
    const shuffleEnemies = (dungeon) => base(dungeon, 2, 7);
    const shuffleHealthItems = (dungeon) => base(dungeon, 3, 7);
    const shuffleWeapon = (dungeon) => base(dungeon, 4, 1);
    const shuffleLineOfSightEnhancer = (dungeon) => base(dungeon, 5, 1);
    const shufflePortal = (dungeon) => base(dungeon, 6, 1);
    for (let dungeon = 0; dungeon < 1; dungeon++) {
      shuffleEnemies(dungeon);
      shuffleHealthItems(dungeon);
      shuffleWeapon(dungeon);
      shuffleLineOfSightEnhancer(dungeon);
      shufflePortal(dungeon);
    }
  }
}

export default BattlefieldContainer;

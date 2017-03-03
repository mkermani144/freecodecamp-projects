import React, { Component } from 'react';
import Battlefield from './Battlefield';
import createMap from './MapCreator';
import flatten from 'lodash/flatten';
import unzip from 'lodash/unzip';

class BattlefieldContainer extends Component {
  constructor() {
    super();
    this.cellsInfo = [createMap()];
    this.playerPos = {
      x: 0,
      y: 0
    };
    this.lineOfSight = 10;
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
      6: 'purple',
      7: 'blue'
    };
    const submap = [];
    for (let i = 0; i <= 100; i++) {
      submap[i] = [];
      for (let j = 0; j <= 50; j++) {
        if ((i - 50) * (i - 50) + (j - 25) * (j - 25) < this.lineOfSight * this.lineOfSight) {
          submap[i][j] = this.cellsInfo[0][i + (this.playerPos.x - 50)][j + (this.playerPos.y - 25)];
        } else {
          submap[i][j] = -1;
        }
      }
    }
    return <Battlefield cellColors={flatten(unzip(submap)).map(type => typeToColor[type])}/>;
  }
  dirtyBattlefield = () => {
    const base = (dungeon, type, iterateNum) => {
      while (iterateNum) {
        const row = Math.floor(Math.random() * 200);
        const column = Math.floor(Math.random() * 100);
        if (this.cellsInfo[dungeon][row][column] === 1) {
          this.cellsInfo[dungeon][row][column] = type;
          iterateNum--;
          if (type === 7) {
            return {
              x: row,
              y: column
            };
          }
        }
      }
    }
    const shuffleEnemies = (dungeon) => base(dungeon, 2, 7);
    const shuffleHealthItems = (dungeon) => base(dungeon, 3, 7);
    const shuffleWeapon = (dungeon) => base(dungeon, 4, 1);
    const shuffleLineOfSightEnhancer = (dungeon) => base(dungeon, 5, 1);
    const shufflePortal = (dungeon) => base(dungeon, 6, 1);
    const shufflePlayer = (dungeon) => base(dungeon, 7, 1);
    this.playerPos = shufflePlayer(0);
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

import React, { Component } from 'react';
import Battlefield from './Battlefield';
import createMap from './MapCreator';
import flatten from 'lodash/flatten';
import unzip from 'lodash/unzip';

class BattlefieldContainer extends Component {
  constructor() {
    super();
    this.state = {
      playerPos: {
        x: 0,
        y: 0
      },
      cellsInfo: [createMap()],
      dungeon: 0,
      items: [{}, {}, {}, {}, {}],
      playerHealth: 100,
      playerXP: 0,
      playerDamage: 10,
      lineOfSight: 10
    };
    this.dirtyBattlefield();
  }
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
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
        if ((i - 50) * (i - 50) + (j - 25) * (j - 25) < this.state.lineOfSight * this.state.lineOfSight) {
          submap[i][j] = this.state.cellsInfo[this.state.dungeon][i + (this.state.playerPos.x - 50)][j + (this.state.playerPos.y - 25)];
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
        if (this.state.cellsInfo[dungeon][row][column] === 1) {
          this.state.cellsInfo[dungeon][row][column] = type;
          switch (type) {
            case 2:
              this.state.items[dungeon][[row, column]] = {
                health: dungeon * 25 + 25,
                damage: dungeon * 10 + 12 - (Math.floor(Math.random() * 5))
              }
              break;
            case 3:
              this.state.items[dungeon][[row, column]] = {
                heal: dungeon * 25 + 25
              }
              break;
            case 4:
              this.state.items[dungeon][[row, column]] = {
                damageIncrease: 25
              }
              break;
            case 5:
              this.state.items[dungeon][[row, column]] = {
                lineOfSightEnhance: 5
              }
              break;
            default:
          }
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
    this.state.playerPos = shufflePlayer(0);
    for (let dungeon = 0; dungeon < 1; dungeon++) {
      shuffleEnemies(dungeon);
      shuffleHealthItems(dungeon);
      shuffleWeapon(dungeon);
      shuffleLineOfSightEnhancer(dungeon);
      shufflePortal(dungeon);
    }
  }
  handleKeydown = (event) => {
    switch (event.keyCode) {
      case 37:
        this.handleMove({
          x: this.state.playerPos.x - 1,
          y: this.state.playerPos.y
        });
        break;
      case 38:
        this.handleMove({
          x: this.state.playerPos.x,
          y: this.state.playerPos.y - 1
        });
        break;
      case 39:
        this.handleMove({
          x: this.state.playerPos.x + 1,
          y: this.state.playerPos.y
        });
        break;
      case 40:
        this.handleMove({
          x: this.state.playerPos.x,
          y: this.state.playerPos.y + 1
        });
        break;
      default:
    }
  }
  handleMove = ({x, y}) => {
    switch (this.state.cellsInfo[0][x][y]) {
      case 1:
        this.setState((prev) => {
          prev.cellsInfo[this.state.dungeon][this.state.playerPos.x][this.state.playerPos.y] = 1;
          prev.cellsInfo[this.state.dungeon][x][y] = 7;
          return {
            cellsInfo: prev.cellsInfo,
            playerPos: {
              x,
              y
            }
          };
        });
        break;
      case 2:
        const enemy = this.state.items[this.state.dungeon][[x, y]];
        if(this.state.playerDamage > enemy.health) {
          this.setState(prev => {
            prev.cellsInfo[this.state.dungeon][this.state.playerPos.x][this.state.playerPos.y] = 1;
            prev.cellsInfo[this.state.dungeon][x][y] = 7;
            prev.playerXP += 20 + 20 * this.state.dungeon;
            prev.playerPos = {x, y};
            return prev;
          });
        } else {
          this.setState(prev => {
            prev.items[this.state.dungeon][[x, y]].health -= this.state.playerDamage;
            prev.playerHealth -= enemy.damage;
          });
        }
        break;
      case 3:
        const healthItem = this.state.items[this.state.dungeon][[x, y]];
        this.setState(prev => {
          prev.cellsInfo[this.state.dungeon][this.state.playerPos.x][this.state.playerPos.y] = 1;
          prev.cellsInfo[this.state.dungeon][x][y] = 7;
          prev.playerHealth += healthItem.heal;
          prev.playerPos = {x, y};
          return prev;
        });
        break;
      case 4:
        const weapon = this.state.items[this.state.dungeon][[x, y]];
        this.setState(prev => {
          prev.cellsInfo[this.state.dungeon][this.state.playerPos.x][this.state.playerPos.y] = 1;
          prev.cellsInfo[this.state.dungeon][x][y] = 7;
          prev.playerDamage += weapon.damageIncrease;
          prev.playerPos = {x, y};
          return prev;
        });
        break;
      case 5:
        const lineOfSightEnhancer = this.state.items[this.state.dungeon][[x, y]];
        this.setState(prev => {
          prev.cellsInfo[this.state.dungeon][this.state.playerPos.x][this.state.playerPos.y] = 1;
          prev.cellsInfo[this.state.dungeon][x][y] = 7;
          prev.lineOfSight += lineOfSightEnhancer.lineOfSightEnhance;
          prev.playerPos = {x, y};
          return prev;
        });
        break;
      default:

    }
  }
}

export default BattlefieldContainer;

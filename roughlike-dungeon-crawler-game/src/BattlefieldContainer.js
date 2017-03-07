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
      cellsInfo: [createMap(), createMap(), createMap(), createMap(), createMap()],
      dungeon: 0,
      enemyInfo: [{}, {}, {}, {}, {}],
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
      7: 'blue',
      10: '#aa0000'
    };
    const submap = [];
    console.log(this.state);
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
        let row = Math.floor(Math.random() * 200);
        let column = Math.floor(Math.random() * 100);
        if (this.state.cellsInfo[dungeon][row][column] === 1) {
          this.state.cellsInfo[dungeon][row][column] = type;
          if (type === 10) {
            this.state.enemyInfo[dungeon][[row, column]] = {
              health: 500
            };
          }
          if (type === 2) {
            this.state.enemyInfo[dungeon][[row, column]] = {
              health: dungeon * 25 + 25
            };
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
    const shuffleBoss = (dungeon) => base(dungeon, 10, 1);
    const shuffleHealthItems = (dungeon) => base(dungeon, 3, 7);
    const shuffleWeapon = (dungeon) => base(dungeon, 4, 1);
    const shuffleLineOfSightEnhancer = (dungeon) => base(dungeon, 5, 1);
    const shufflePortal = (dungeon) => base(dungeon, 6, 1);
    const shufflePlayer = (dungeon) => base(dungeon, 7, 1);
    this.state.playerPos = shufflePlayer(0);
    for (let dungeon = 0; dungeon < 5; dungeon++) {
      shuffleEnemies(dungeon);
      shuffleHealthItems(dungeon);
      shuffleWeapon(dungeon);
      shuffleLineOfSightEnhancer(dungeon);
      if (dungeon !== 4) {
        shufflePortal(dungeon);
      }
      if (dungeon === 4) {
        shuffleBoss(dungeon);
      }
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
    switch (this.state.cellsInfo[this.state.dungeon][x][y]) {
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
        const enemy = this.state.enemyInfo[this.state.dungeon][[x, y]];
        if(this.pureDamage() > enemy.health) {
          this.setState(prev => {
            prev.cellsInfo[this.state.dungeon][this.state.playerPos.x][this.state.playerPos.y] = 1;
            prev.cellsInfo[this.state.dungeon][x][y] = 7;
            prev.playerXP += 20 + 20 * this.state.dungeon;
            this.props.xpUpdate(prev.playerXP);
            this.props.levelUpdate(this.currentLevel(prev.playerXP));
            prev.playerPos = {x, y};
            return prev;
          });
        } else {
          this.setState(prev => {
            prev.enemyInfo[this.state.dungeon][[x, y]].health -= this.pureDamage();
            prev.playerHealth -= this.state.dungeon * 20 + 12 - (Math.floor(Math.random() * 5));
            this.props.healthUpdate(prev.playerHealth);
          });
        }
        break;
      case 10:
        const boss = this.state.enemyInfo[this.state.dungeon][[x, y]];
        if(this.pureDamage() > boss.health) {
          this.props.win();
        } else {
          this.setState(prev => {
            prev.enemyInfo[this.state.dungeon][[x, y]].health -= this.pureDamage();
            prev.playerHealth -= 200 - (Math.floor(Math.random() * 5));
            this.props.healthUpdate(prev.playerHealth);
          });
        }
        break;
      case 3:
        this.setState(prev => {
          prev.cellsInfo[this.state.dungeon][this.state.playerPos.x][this.state.playerPos.y] = 1;
          prev.cellsInfo[this.state.dungeon][x][y] = 7;
          prev.playerHealth += this.state.dungeon * 25 + 25;
          prev.playerPos = {x, y};
          this.props.healthUpdate(prev.playerHealth);
          return prev;
        });
        break;
      case 4:
        this.setState(prev => {
          prev.cellsInfo[this.state.dungeon][this.state.playerPos.x][this.state.playerPos.y] = 1;
          prev.cellsInfo[this.state.dungeon][x][y] = 7;
          prev.playerDamage += this.state.dungeon * 25 + 25;
          prev.playerPos = {x, y};
          this.props.damageUpdate(prev.playerDamage);
          return prev;
        });
        break;
      case 5:
        this.setState(prev => {
          prev.cellsInfo[this.state.dungeon][this.state.playerPos.x][this.state.playerPos.y] = 1;
          prev.cellsInfo[this.state.dungeon][x][y] = 7;
          prev.lineOfSight += 5;
          prev.playerPos = {x, y};
          return prev;
        });
        break;
      case 6:
        this.setState(prev => {
          prev.dungeon+= 1;
          prev.playerPos = {x, y};
          this.props.dungeonUpdate(prev.dungeon);
          return prev;
        }, () => {
          let notPlaced = true;
          while (notPlaced) {
            const row = Math.floor(Math.random() * 200);
            const column = Math.floor(Math.random() * 100);
            if (this.state.cellsInfo[this.state.dungeon][row][column] === 1) {
              this.setState(prev => {
                prev.cellsInfo[this.state.dungeon][row][column] = 7;
                prev.playerPos = {x: row, y: column};
                return prev;
              });
              notPlaced = false;
            }
          }
        });
        break;
      default:

    }
  }
  pureDamage = () => {
    return this.state.playerDamage + this.currentLevel() * 10 + 5 - Math.floor(Math.random() * 11);
  }
  currentLevel = () => {
    let xp = this.state.playerXP;
    if (xp < 100) {
      return 1;
    } else if (xp < 250) {
      return 2;
    } else if (xp < 500) {
      return 3;
    } else if (xp < 1000) {
      return 4;
    } else {
      return 5;
    }
  }
}

export default BattlefieldContainer;

import React, { Component } from 'react';
import App from './App';

class AppContainer extends Component {
  constructor() {
    super();
    this.state = {
      health: 100,
      damage: 10,
      level: 1,
      xp: 0,
      dungeon: 0
    };
  }
  render() {
    return (
      <App
       healthUpdate={this.healthUpdate}
       damageUpdate={this.damageUpdate}
       levelUpdate={this.levelUpdate}
       xpUpdate={this.xpUpdate}
       dungeonUpdate={this.dungeonUpdate}
       health={this.state.health}
       damage={this.state.damage}
       level={this.state.level}
       xp={this.state.xp}
       dungeon={this.state.dungeon}
       />
    );
  }
  healthUpdate = (health) => {
    this.setState({
      health
    });
  }
  damageUpdate = (damage) => {
    this.setState({
      damage
    });
  }
  xpUpdate = (xp) => {
    this.setState({
      xp
    });
  }
  levelUpdate = (level) => {
    this.setState({
      level
    });
  }
  dungeonUpdate = (dungeon) => {
    this.setState({
      dungeon
    });
  }
}

export default AppContainer;

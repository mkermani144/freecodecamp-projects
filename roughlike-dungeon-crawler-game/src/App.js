import React, { Component } from 'react';
import BattlefieldContainer from './BattlefieldContainer';
import HudContainer from './HudContainer';
import Title from './Title';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Title />
        <HudContainer
         health={this.props.health}
         damage={this.props.damage}
         level={this.props.level}
         xp={this.props.xp}
         dungeon={this.props.dungeon}
         />
        <BattlefieldContainer
         healthUpdate={this.props.healthUpdate}
         damageUpdate={this.props.damageUpdate}
         levelUpdate={this.props.levelUpdate}
         xpUpdate={this.props.xpUpdate}
         dungeonUpdate={this.props.dungeonUpdate}
         />
      </div>
    );
  }
}

export default App;

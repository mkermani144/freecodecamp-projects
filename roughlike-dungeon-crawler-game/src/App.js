import React, { Component } from 'react';
import BattlefieldContainer from './BattlefieldContainer';
import HudContainer from './HudContainer';
import Title from './Title';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      gameFinished: false
    };
  }
  render() {
    if (!this.state.gameFinished) {
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
        finishGame={(message) => this.setState({gameFinished: message})}
        />
        </div>
      );
    }
    else {
      let style;
      if (this.state.gameFinished === 'You are victorios!') {
        style = {
          fontFamily: '\'Press Start 2P\', cursive',
          color: 'green'
        };
      } else {
        style = {
          fontFamily: '\'Press Start 2P\', cursive',
          color: 'red'
        };
      }
      return (
        <div className="app">
          <h1 style={style}>{this.state.gameFinished}</h1>
          <small style={style}>Refresh the page to play again</small>
        </div>
      );
    }
  }
}

export default App;

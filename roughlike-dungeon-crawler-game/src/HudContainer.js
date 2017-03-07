import React, { Component } from 'react';
import Hud from './Hud';

class HudContainer extends Component {
  render() {
    return (
      <Hud
       health={this.props.health}
       damage={this.props.damage}
       level={this.props.level}
       xp={this.props.xp}
       dungeon={this.props.dungeon}
       />
    );
  }
}

export default HudContainer;

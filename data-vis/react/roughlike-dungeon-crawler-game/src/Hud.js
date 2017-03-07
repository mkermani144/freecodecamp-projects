import React, { Component } from 'react';
import './Hud.css';

class Hud extends Component {
  render() {
    return (
      <div className="hud">
        <p style={{color: '#00ff00'}}>Health: {this.props.health} {'\u00A0'}{'\u00A0'}</p>
        <p style={{color: 'red'}}>Damage: {this.props.damage} {'\u00A0'}{'\u00A0'}</p>
        <p style={{color: '#2288ff'}}>Level: {this.props.level} {'\u00A0'}{'\u00A0'}</p>
        <p style={{color: 'yellow'}}>XP: {this.props.xp} {'\u00A0'}{'\u00A0'}</p>
        <p style={{color: '#8a2be2'}}>Dungeon: {this.props.dungeon} {'\u00A0'}{'\u00A0'}</p>
      </div>
    );
  }
}

export default Hud;

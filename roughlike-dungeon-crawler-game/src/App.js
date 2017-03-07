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
        <HudContainer />
        <BattlefieldContainer />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import BattlefieldContainer from './BattlefieldContainer';
import HudContainer from './HudContainer';
import Title from './Title';

class App extends Component {
  render() {
    return (
      <div>
        <Title />
        <HudContainer />
        <BattlefieldContainer />
      </div>
    );
  }
}

export default App;

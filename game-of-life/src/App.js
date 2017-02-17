import React, { Component } from 'react';
import BoardContainer from './BoardContainer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Toggle from 'material-ui/Toggle';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      autoplay: true
    };
  }
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <BoardContainer action={{auto: this.state.autoplay}} />
          <Toggle className="toggle" label='Autoplay' defaultToggled={true} onToggle={(e, checked) => this.setState({autoplay: checked})}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

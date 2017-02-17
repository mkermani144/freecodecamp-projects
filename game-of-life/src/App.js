import React, { Component } from 'react';
import BoardContainer from './BoardContainer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import AvPause from 'material-ui/svg-icons/av/pause';
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow';
import ImageNavigateNext from 'material-ui/svg-icons/image/navigate-next';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      mustPlay: 1,
      pauseOrPlay: 'pause'
    };
  }
  render() {
    let pauseOrPlay;
    if (this.state.pauseOrPlay === 'pause') {
      pauseOrPlay = (
        <IconButton tooltip='pause'>
          <AvPause onClick={() => {
            this.setState({
              mustPlay: 0,
              pauseOrPlay: 'play'
            });
          }}/>
        </IconButton>
      );
    } else {
      pauseOrPlay = (
        <IconButton tooltip='play'>
          <AvPlayArrow onClick={() => {
            this.setState({
              mustPlay: 1,
              pauseOrPlay: 'pause'
            });
          }}/>
        </IconButton>
      );
    }
    return (
      <MuiThemeProvider>
        <div className="App">
          <BoardContainer mustPlay={this.state.mustPlay} reportPlay={() => {this.setState({mustPlay: 0})}}/>
          <IconButton disabled={this.state.pauseOrPlay === 'pause'} tooltip='next'>
            <ImageNavigateNext onClick={() => this.setState({mustPlay: 2})} />
          </IconButton>
          {pauseOrPlay}
          <RaisedButton label="Clear" secondary={true} onClick={() => {this.setState({mustPlay: 3})}}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

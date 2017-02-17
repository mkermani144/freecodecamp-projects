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
      pauseOrPlay: 'pause',
      generation: 0
    };
  }
  render() {
    let pauseOrPlay;
    if (this.state.pauseOrPlay === 'pause') {
      pauseOrPlay = (
        <IconButton>
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
        <IconButton>
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
          <p>Game of <strong>Life</strong></p>
          <div className="generationNumber">Generation: {this.state.generation}</div>
          <BoardContainer
            mustPlay={this.state.mustPlay}
            reportPlay={(clear) => {
              this.setState((prev) => {
                return {
                  mustPlay: !clear,
                  generation: prev.generation + 1
                }
              });
            }}
          />
          <div className="controls">
            <IconButton disabled={this.state.pauseOrPlay === 'pause'}>
              <ImageNavigateNext onClick={() => this.setState({mustPlay: 2})} />
            </IconButton>
            {pauseOrPlay}
          </div>
          <RaisedButton label="Clear" secondary={true} onClick={() => {this.setState({mustPlay: 3})}}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import RecipeBoxContainer from './RecipeBoxContainer';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <RecipeBoxContainer />
      </MuiThemeProvider>
    );
  }
}

export default App;

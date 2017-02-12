import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RecipeBoxContainer from './RecipeBoxContainer';
import { green500, pinkA400 } from 'material-ui/styles/colors';
import './App.css';

class App extends Component {
  render() {
    const muiTheme = getMuiTheme({
      palette: {
        primary1Color: green500,
        accent1Color: pinkA400
      }
    });
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <RecipeBoxContainer />
      </MuiThemeProvider>
    );
  }
}

export default App;

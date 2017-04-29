import React from 'react';
import ReactDOM from 'react-dom';
import reactTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blue500, amberA700 } from 'material-ui/styles/colors';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './components/App';
import './index.css';

reactTapEventPlugin();

const customTheme = getMuiTheme({
  palette: {
    primary1Color: blue500,
    accent1Color: amberA700,
  },
});

ReactDOM.render((
    <MuiThemeProvider muiTheme={customTheme}>
      <Router>
        <Route path="/" component={App}></Route>
      </Router>
    </MuiThemeProvider>
  ),
  document.getElementById('root')
);

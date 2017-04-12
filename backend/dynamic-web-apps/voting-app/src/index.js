import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blue500 } from 'material-ui/styles/colors';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './components/App';
import Login from './components/Login';
import './index.css';

const customTheme = getMuiTheme({
  palette: {
    primary1Color: blue500,
  },
});

ReactDOM.render((
    <MuiThemeProvider muiTheme={customTheme}>
      <Router>
        <div>
          <Route exact path="/" component={App} />
          <Route path="/login" component={Login} />
        </div>
      </Router>
    </MuiThemeProvider>
  ),
  document.getElementById('root')
);

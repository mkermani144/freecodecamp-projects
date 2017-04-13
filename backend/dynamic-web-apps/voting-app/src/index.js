import React from 'react';
import ReactDOM from 'react-dom';
import reactTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blue500 } from 'material-ui/styles/colors';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './components/App';
import Login from './components/Login';
import Signup from './components/Signup';
import './index.css';

reactTapEventPlugin();

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
          <Route path="/signup" component={Signup} />
        </div>
      </Router>
    </MuiThemeProvider>
  ),
  document.getElementById('root')
);

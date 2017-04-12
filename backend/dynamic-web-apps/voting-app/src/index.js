import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './components/App';
import Login from './components/Login';
import './index.css';

ReactDOM.render((
    <MuiThemeProvider>
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

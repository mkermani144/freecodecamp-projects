import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { blue500, blue600, grey50, grey600 } from 'material-ui/styles/colors';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Poll from './Poll';
import './App.css';

class App extends Component {
  render() {
    const appbarButtonLabelStyle = {
      color: grey50,
    };
    return (
      <div className="App">
        <AppBar
          style={{backgroundColor: blue500}}
          zDepth={0}
          iconElementLeft={
            <div>
              <FlatButton
                containerElement={<Link to="/" />}
                label="Home"
                labelStyle={appbarButtonLabelStyle}
                rippleColor={grey600}
                hoverColor={blue600}
              />
            </div>
          }
          iconElementRight={
            <div>
              <FlatButton
                containerElement={<Link to="/login" />}
                label="Login"
                labelStyle={appbarButtonLabelStyle}
                rippleColor={grey600}
                hoverColor={blue600}
              />
              <FlatButton
                containerElement={<Link to="/signup" />}
                label="Signup"
                labelStyle={appbarButtonLabelStyle}
                rippleColor={grey600}
                hoverColor={blue600}
              />
            </div>
          }
        />
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/poll/:id" component={Poll} />
      </div>
    );
  }
}

export default App;

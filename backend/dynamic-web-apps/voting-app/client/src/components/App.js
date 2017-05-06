import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { blue500, blue600, grey50, grey600 } from 'material-ui/styles/colors';
import Home from './Home';
import Dashboard from './Dashboard';
import LoginContainer from './LoginContainer';
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
                containerElement={this.props.loggedIn? <Link to="/" /> : <Link to="/login" />}
                label={this.props.loggedIn? "Logout" : "Login"}
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
                style={
                  this.props.loggedIn ?
                  {display: 'none'} :
                  {}
                }
              />
            </div>
          }
        />
        <Route exact path="/" component={this.props.loggedIn ? Dashboard : Home} />
        <Route path="/login" component={this.props.loggedIn ? Dashboard : LoginContainer} />
        <Route path="/signup" component={this.props.loggedIn ? Dashboard : Signup} />
        <Route path="/poll/:id" component={Poll} />
      </div>
    );
  }
}

export default App;

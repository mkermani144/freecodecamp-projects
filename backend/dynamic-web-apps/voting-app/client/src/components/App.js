import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { blue500, blue600, grey50, grey600 } from 'material-ui/styles/colors';
import HomeContainer from './HomeContainer';
import DashboardContainer from './DashboardContainer';
import LoginContainer from './LoginContainer';
import SignupContainer from './SignupContainer';
import PollContainer from './PollContainer';
import './App.css';

class App extends Component {
  handleClick = async () => {
    fetch('http://localhost:8000/logout', {
      method: 'POST',
    });
    this.props.logOut();
    localStorage.removeItem('username');
    const result = await fetch('http://localhost:8000/poll/fetchrecent', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const json = await result.json();
    json.forEach(poll => this.props.addPoll(poll.id, poll.owner, poll.title, poll.description, Object.keys(poll.choices).map(key => [key, poll.choices[key]])));
  }
  componentDidMount() {
    (async () => {
      const username = await localStorage.getItem('username');
      if (username) {
        const response = await fetch('http://localhost:8000/api/sessionisvalid', {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          this.props.logIn(1, username);
          const response2 = await fetch(`http://localhost:8000/api/userpolls/${username}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
          });
          const json = await response2.json();
          json.polls.forEach(poll => this.props.addPoll(poll.id, poll.owner, poll.title, poll.description, Object.keys(poll.choices).map(key => [key, poll.choices.key])));
        }
      }
    })();
  }
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
                label={this.props.loggedIn ? "Dashboard" : "Home"}
                labelStyle={appbarButtonLabelStyle}
                rippleColor={grey600}
                hoverColor={blue600}
              />
            </div>
          }
          iconElementRight={
            <div>
              {this.props.loggedIn ?
                <FlatButton
                  containerElement={<Link to="/" />}
                  label="Logout"
                  labelStyle={appbarButtonLabelStyle}
                  rippleColor={grey600}
                  hoverColor={blue600}
                  onClick={this.handleClick}
                /> :
                <FlatButton
                  containerElement={<Link to="/login" />}
                  label="Login"
                  labelStyle={appbarButtonLabelStyle}
                  rippleColor={grey600}
                  hoverColor={blue600}
                />
              }

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
        <Route exact path="/" component={this.props.loggedIn ? DashboardContainer : HomeContainer} />
        <Route path="/login" component={this.props.loggedIn ? DashboardContainer : LoginContainer} />
        <Route path="/signup" component={this.props.loggedIn ? DashboardContainer : SignupContainer} />
        <Route path="/poll/:user/:id" component={PollContainer} />
      </div>
    );
  }
}

export default App;

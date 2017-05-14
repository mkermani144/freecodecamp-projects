import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import { blue50, blue500 } from 'material-ui/styles/colors';
import './Login-Signup.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      isSubmitted: false,
    };
  }

  handleUsernameChange = (e) => {
    this.setState({
      username: e.target.value,
    });
  }

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      }),
    });
    if (response.ok) {
      localStorage.setItem('username', this.state.username);
      this.props.logIn(1, this.state.username);
      const response = await fetch(`http://localhost:8000/api/userpolls/${this.state.username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const json = await response.json();
      json.polls.forEach(poll => this.props.addPoll(this.state.username, poll.title, poll.description, poll.choices.map(choice => [choice[0], choice[1]])));
    } else if (response.status === 401) {
      this.props.logIn(2);
      this.setState({
        isSubmitted: true,
      });
    } else {
      this.props.logIn(3);
      this.setState({
        isSubmitted: true,
      });
    }
  }

  handleRequestClose = () => {
    this.setState({
      isSubmitted: false,
    });
  }

  render() {
    const paperStyle = {
      padding: '5vmin',
      backgroundColor: blue50,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    };
    const loginStyle = {
      backgroundColor: blue500
    };
    const buttonStyle = {
      marginTop: '5vmin',
      alignSelf: 'flex-end'
    };
    return this.props.loggedIn === true ? <Redirect to="/" /> : (
      <div className="Login" style={loginStyle}>
        <Paper className="paper" style={paperStyle}>
          <form onSubmit={this.handleSubmit}>
            <TextField
              name="username"
              floatingLabelText="Username"
              floatingLabelFixed={true}
              onChange={this.handleUsernameChange}
              autoFocus
            />
            <TextField
              name="password"
              type="password"
              floatingLabelText="Password"
              onChange={this.handlePasswordChange}
              floatingLabelFixed={true}
            />
            <RaisedButton
              type="submit"
              label="login"
              primary={true}
              style={buttonStyle}
            />
          </form>
        </Paper>
        <Snackbar
          open={this.props.loggedIn === false && this.state.isSubmitted === true}
          message={this.props.errorMessage}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

export default Login;

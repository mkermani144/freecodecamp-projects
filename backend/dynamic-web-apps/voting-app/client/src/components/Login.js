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
    };
    this.loginStatus = 0;
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
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      }),
    });
    if (response.ok) {
      this.setState({
        loginStatus: 1,
      });
    } else if (response.status === 401) {
      this.setState({
        loginStatus: 2,
      });
    } else {
      this.setState({
        loginStatus: 3,
      });
    }
  }

  handleSnackbarClose = () => {
    this.setState({
      loginStatus: 0,
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
    return this.state.loginStatus === 1 ? <Redirect to="/" /> : (
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
          open={this.state.loginStatus >= 2}
          message={
            this.state.loginStatus === 2
            ? "Wrong username or password. Try again."
            : "Something bad happended. Try again later."
          }
          autoHideDuration={4000}
          onRequestClose={this.handleSnackbarClose}
        />
      </div>
    );
  }
}

export default Login;

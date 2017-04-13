import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { blue50, blue500 } from 'material-ui/styles/colors';
import './Login-Signup.css';

class Login extends Component {
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
    return (
      <div className="Login" style={loginStyle}>
        <Paper className="paper" style={paperStyle}>
          <form action="/login" method="post">
            <TextField
              name="username"
              floatingLabelText="Username"
              floatingLabelFixed={true}
              autoFocus
            />
            <TextField
              name="password"
              type="password"
              floatingLabelText="Password"
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
      </div>
    );
  }
}

export default Login;

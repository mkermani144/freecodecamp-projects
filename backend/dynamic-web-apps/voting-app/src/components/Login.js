import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { blue50, blue500 } from 'material-ui/styles/colors';
import './Login.css';

class Login extends Component {
  render() {
    const paperStyle = {
      width: '90vmin',
      height: '70vmin',
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
      marginTop: '25%',
    };
    // const underlineStyle = {
    //   borderColor: blue500,
    // };
    // const floatingLabelFocusStyle = {
    //   color: blue500,
    // };
    // const buttonStyle = {
    //   backgroundColor: blue500,
    //   color: 'white',
    // };
    return (
      <div className="Login" style={loginStyle}>
        <Paper className="paper" style={paperStyle}>
          <form action="/login" method="post">
            <TextField
              name="username"
              floatingLabelText="Username"
              floatingLabelFixed={true}
              // underlineFocusStyle={underlineStyle}
              // floatingLabelFocusStyle={floatingLabelFocusStyle}
            />
            <TextField
              name="password"
              type="password"
              floatingLabelText="Password"
              floatingLabelFixed={true}
              // underlineFocusStyle={underlineStyle}
              // floatingLabelFocusStyle={floatingLabelFocusStyle}
            />
            <RaisedButton
              type="submit"
              label="login"
              primary={true}
              style={buttonStyle}
              // buttonStyle={buttonStyle}
            />
          </form>
        </Paper>
      </div>
    );
  }
}

export default Login;

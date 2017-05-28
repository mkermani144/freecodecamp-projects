import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Paper from 'material-ui/Paper';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';
import { blue50, blue500 } from 'material-ui/styles/colors';
import './Login-Signup.css';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      stepIndex: 0,
      progress: {
        visibility: 'hidden'
      },
      textFieldError: 0,
      nextDisabled: true,
      username: '',
      passwrod: '',
      isLoggedIn: false,
      submitFailed: false,
    };
    this.timeout = null;
    this.errors = {
      0: '',
      1: 'Username is already taken',
      3: 'Username is too short',
      4: 'Username is too long',
      5: 'Username is not valid',
      6: 'Password must be at least 6 characters length',
      7: 'Passwords entered do not match',
    }
    this.timeout = 0;
    this.alive = true;
  }

  validateUsername = (username) => {
    if (username.length < 6) {
      return 3;
    } else if (username.length > 20) {
      return 4;
    } else {
      const testResult = (/^[a-zA-Z][a-zA-Z0-9_.]{4,18}[a-zA-Z0-9]$/).test(username);
      if (testResult) {
        return 0;
      } else {
        return 5;
      }
    }
  }

  handleNext = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      nextDisabled: stepIndex !== 2,
    });
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({
        stepIndex: stepIndex - 1,
        textFieldError: '',
      });
    }
  };

  handleUsernameChange = (e) => {
    clearTimeout(this.timeout);
    const username = e.target.value;
    this.timeout = setTimeout(() => {
      const validationResult = this.validateUsername(username);
      if (validationResult === 0) {
        this.setState({
          progress: {
            visibility: 'visible',
          },
        }, async () => {
          const response = await fetch('http://localhost:8000/api/findUser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username
            }),
          });
          const json = await response.json();
          this.setState({
            progress: {
              visibility: 'hidden',
            },
            username,
            textFieldError: +json.userExists,
            nextDisabled: +json.userExists !== 0,
          });
        });
      } else {
        this.setState({
          textFieldError: validationResult,
          nextDisabled: true,
        });
      }
    }, 200);
  }

  handlePasswordChange = (e) => {
    const password = e.target.value;
    if (password.length >= 6) {
      this.setState({
        password,
        nextDisabled: false,
        textFieldError: 0,
      });
    } else {
      this.setState({
        nextDisabled: true,
        textFieldError: 6,
      });
    }
  }

  handlePasswordConfirmChange = (e) => {
    const passwordConfirm = e.target.value;
    if (passwordConfirm === this.state.password) {
      this.setState({
        nextDisabled: false,
        textFieldError: 0,
      });
    } else {
      this.setState({
        nextDisabled: true,
        textFieldError: 7,
      });
    }
  }

  handleSubmit = async () => {
    const response = await fetch('http://localhost:8000/signup', {
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
      this.setState({
        isLoggedIn: true,
      });
      localStorage.setItem('username', this.state.username);
      this.props.logIn(1, this.state.username);
      const response = await fetch(`http://localhost:8000/api/userpolls/${this.state.username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const json = await response.json();
      json.polls.forEach(poll => this.props.addPoll(poll.id, poll.owner, poll.title, poll.description, Object.keys(poll.choices).map(key => [key, poll.choices[key]])));
    } else {
      this.setState({
        submitFailed: true,
      });
    }
  }

  handleSnackbarClose = () => {
    this.setState({
      submitFailed: false,
    });
  }

  renderStepActions(step) {
    const buttonStyle = {
      marginTop: '5vmin',
      marginLeft: '1vmin',
    };
    return (
      <div className="step-actions">
        {step > 0 && (
          <FlatButton
            label="Back"
            disabled={step === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onClick={this.handlePrev}
            style={buttonStyle}
          />
        )}
        <RaisedButton
          label={step === 3 ? 'Sign up' : 'Next'}
          type='button'
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onClick={step === 3 ? this.handleSubmit : this.handleNext}
          style={buttonStyle}
          disabled={this.state.nextDisabled}
        />
      </div>
    );
  }

  render() {
    const signupStyle = {
      backgroundColor: blue500
    };
    const paperStyle = {
      padding: '5vmin',
      width: '60vmin',
      backgroundColor: blue50,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    };
    const { stepIndex } = this.state;
    return this.state.isLoggedIn ? <Redirect to="/" /> : (
      <div className="Signup" style={signupStyle}>
        <Paper className="paper" style={paperStyle}>
          <form>
            <Stepper activeStep={stepIndex} orientation="vertical">
              <Step>
                <StepLabel>Choose a username</StepLabel>
                <StepContent>
                  <div className="wrapper">
                    <TextField
                      name="username"
                      type="text"
                      floatingLabelText="Username"
                      floatingLabelFixed={true}
                      fullWidth={true}
                      autoFocus
                      onChange={this.handleUsernameChange}
                      errorText={this.errors[this.state.textFieldError]}
                    />
                    <CircularProgress size={20} thickness={2} style={this.state.progress} />
                  </div>
                  {this.renderStepActions(0)}
                </StepContent>
              </Step>
              <Step>
                <StepLabel>Set a password</StepLabel>
                <StepContent>
                  <div className="wrapper">
                    <TextField
                      name="password"
                      type="password"
                      floatingLabelText="Password"
                      floatingLabelFixed={true}
                      fullWidth={true}
                      autoFocus
                      onChange={this.handlePasswordChange}
                      errorText={this.errors[this.state.textFieldError]}
                    />
                    <CircularProgress size={20} thickness={2} style={{visibility: 'hidden'}} />
                  </div>
                  {this.renderStepActions(1)}
                </StepContent>
              </Step>
              <Step>
                <StepLabel>Confirm password</StepLabel>
                <StepContent>
                  <div className="wrapper">
                    <TextField
                      name="password"
                      type="password"
                      floatingLabelText="Password (Again)"
                      floatingLabelFixed={true}
                      fullWidth={true}
                      autoFocus
                      onChange={this.handlePasswordConfirmChange}
                      errorText={this.errors[this.state.textFieldError]}
                    />
                    <CircularProgress size={20} thickness={2} style={{visibility: 'hidden'}} />
                  </div>
                  {this.renderStepActions(2)}
                </StepContent>
              </Step>
              <Step>
                <StepLabel>Finish signup</StepLabel>
                <StepContent>
                  {this.renderStepActions(3)}
                </StepContent>
              </Step>
            </Stepper>
          </form>
        </Paper>
        <Snackbar
          open={this.state.submitFailed}
          message="Something bad happended. Try again later."
          autoHideDuration={4000}
          onRequestClose={this.handleSnackbarClose}
        />
      </div>
    );
  }
}

export default Signup;

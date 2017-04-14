import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { blue50, blue500 } from 'material-ui/styles/colors';
import './Login-Signup.css';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      stepIndex: 0,
    };
  }

  handleNext = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
    });
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({
        stepIndex: stepIndex - 1
      });
    }
  };

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
          type={step === 3 ? 'submit' : 'button'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onClick={this.handleNext}
          style={buttonStyle}
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
    return (
      <div className="Signup" style={signupStyle}>
        <Paper className="paper" style={paperStyle}>
          <form action="/signup" method="post">
            <Stepper activeStep={stepIndex} orientation="vertical">
              <Step>
                <StepLabel>Choose a username</StepLabel>
                <StepContent>
                  <TextField
                    name="username"
                    type="text"
                    floatingLabelText="Username"
                    floatingLabelFixed={true}
                    autoFocus
                  />
                  {this.renderStepActions(0)}
                </StepContent>
              </Step>
              <Step>
                <StepLabel>Set a password</StepLabel>
                <StepContent>
                  <TextField
                    name="password"
                    type="password"
                    floatingLabelText="Password"
                    floatingLabelFixed={true}
                    autoFocus
                  />
                  {this.renderStepActions(1)}
                </StepContent>
              </Step>
              <Step>
                <StepLabel>Confirm password</StepLabel>
                <StepContent>
                  <TextField
                    name="password"
                    type="password"
                    floatingLabelText="Password (Again)"
                    floatingLabelFixed={true}
                    autoFocus
                  />
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
      </div>
    );
  }
}

export default Signup;
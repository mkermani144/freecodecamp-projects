import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import { grey50, grey600, blue500, blue600 } from 'material-ui/styles/colors';
import { Chart } from 'react-google-charts';
import './Poll.css';

class Poll extends React.Component {
  render() {
    const appbarButtonLabelStyle = {
      color: grey50,
    };
    const data = [
      ['React vs Angular', 'Popularity'],
      ['React', 7],
      ['Angular', 5],
    ];
    const paperStyle = {
      minWidth: '450px',
      minHeight: '450px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'center',
    };
    return (
      <div className="Poll">
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
        <div className="main">
          <div className="poll-info">
            <h3 className="poll-title">Angular vs React</h3>
            <p className="poll-description">Which one do you prefer? Angular or React?</p>
            <SelectField
              floatingLabelText="Your choice"
            >
              <MenuItem value={1} primaryText="Angular" />
              <MenuItem value={2} primaryText="React" />
            </SelectField>
            <RaisedButton
              className="submit-vote"
              label="Submit"
              secondary={true}
            />
          </div>
          <Paper className="chart" zDepth={0} style={paperStyle}>
            <Chart
              chartType="PieChart"
              width="100%"
              height="100%"
              data={data}
              options={
                {
                  legend: 'none',
                  pieHole: 0,
                  is3D: false,
                  pieSliceText: 'label',
                  backgroundColor: 'rgb(33, 150, 243)'
                }
              }
            />
        </Paper>
        </div>
      </div>
    );
  }
}

export default Poll;

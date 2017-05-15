import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import { grey50, grey300 } from 'material-ui/styles/colors';
import { Chart } from 'react-google-charts';
import './Poll.css';

class Poll extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
    };
  }
  handleChange = (event, index, value) => {
    this.setState({
      value,
    });
  }
  render() {
    const selectFloatingLabelStyle = {
      color: grey300,
    };
    const selectLabelStyle = {
      color: grey50,
    };
    const paperStyle = {
      minWidth: '450px',
      minHeight: '450px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'center',
    };
    const currentPoll = this.props.polls[this.props.match.params.id];
    return (
      <div className="Poll">
        <div className="main">
          <div className="poll-info">
            <h3 className="poll-title">{currentPoll.title}</h3>
            <p className="poll-description">{currentPoll.description}</p>
            <SelectField
              floatingLabelText="Your choice"
              floatingLabelStyle={selectFloatingLabelStyle}
              labelStyle={selectLabelStyle}
              value={this.state.value}
              onChange={this.handleChange}
            >
              {currentPoll.choices.map((el, index) => (
                <MenuItem value={index} primaryText={el[0]} key={index} />
              ))}
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
              data={[
                [currentPoll.title, 'popularity'],
                ...currentPoll.choices.map(choice => [choice[0], choice[1]])
              ]}
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

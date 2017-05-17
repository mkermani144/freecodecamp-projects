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
  handleSubmit = async () => {
    try {
      const currentPoll = this.props.polls[this.props.match.params.id];
      const response = await fetch('http://localhost:8000/poll/vote', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pollId: currentPoll.id,
          choice: currentPoll.choices[this.state.value][0],
        }),
      });
      const json = await response.json();
      if (json.successful) {
        this.props.vote(currentPoll.id, currentPoll.choices[this.state.value][0]);
      } else {
      }
    } catch (e) {
      console.log(e);
    }
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
              onClick={this.handleSubmit}
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

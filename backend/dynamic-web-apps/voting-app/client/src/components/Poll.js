import React from 'react';
import { Redirect } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import { grey50, grey300, redA200 } from 'material-ui/styles/colors';
import { Chart } from 'react-google-charts';
import './Poll.css';

class Poll extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      redirect: false,
    };
  }
  handleChange = (event, index, value) => {
    this.setState({
      value,
    });
  }
  handleDelete = async () => {
    const currentPoll = this.props.polls[this.props.match.params.id];
    try {
      const response = await fetch('http://localhost:8000/poll/delete', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: this.props.user,
          pollId: currentPoll.id,
        }),
      });
      const json = await response.json();
      if (json.successful) {
        this.props.removePoll(this.props.user, this.props.polls.indexOf(currentPoll));
        this.setState({
          redirect: true,
        });
      } else {

      }
    } catch (e) {
      console.log(e);
    }
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
    const iconStyle = {
      color: redA200,
    }
    const currentPoll = this.props.polls[this.props.match.params.id];
    if (currentPoll === undefined) {
      return <Redirect to='/' />;
    }
    return this.state.redirect === true ? <Redirect to='/' /> : (
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
            <IconButton tooltip='delete' iconStyle={iconStyle} onClick={this.handleDelete}>
              <ActionDelete />
            </IconButton>
          </div>
          <Paper className="chart" zDepth={0} style={paperStyle}>
            <Chart
              chartType="PieChart"
              width="100%"
              height="100%"
              data={[
                [currentPoll.title, 'popularity'],
                ...currentPoll.choices
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

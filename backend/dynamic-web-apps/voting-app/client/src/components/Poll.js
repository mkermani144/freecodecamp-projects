import React from 'react';
import { Redirect } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAddBox from 'material-ui/svg-icons/content/add-box';
import SocialShare from 'material-ui/svg-icons/social/share';
import { grey50, grey300, redA200, amber500 } from 'material-ui/styles/colors';
import { Chart } from 'react-google-charts';
import './Poll.css';

class Poll extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      redirect: false,
      isOpen: false,
      choices: '',
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
  handleAddChoice = async () => {
    const currentPoll = this.props.polls[this.props.match.params.id];
    try {
      const response = await fetch('http://localhost:8000/poll/addchoice', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: this.props.user,
          pollId: currentPoll.id,
          choices: this.state.choices
        }),
      });
      const json = await response.json();
      if (json.successful) {
        this.state.choices.split(/[\s,]+/).forEach(choice => {
          this.props.addChoice(this.props.polls.indexOf(currentPoll), choice);
        });
        this.setState({
          isOpen: false,
          choices: '',
        });
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
  handleOpen = () => {
    this.setState({
      isOpen: true,
    });
  }
  handleClose = () => {
    this.setState({
      isOpen: false,
    });
  }
  renderDialog = () => {
    const actions = [
      <FlatButton
        label="Add"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleAddChoice}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];
    return (
      <Dialog
        title="Add choices"
        actions={actions}
        open={this.state.isOpen}
        onRequestClose={this.handleClose}
        contentStyle={{
          width: '40%',
        }}
        bodyStyle={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
      >
        <TextField
          floatingLabelText="New poll choices (separated by commas)"
          fullWidth={true}
          onChange={(e) => this.setState({choices: e.target.value})}
        />
      </Dialog>
    );
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
    const deleteIconStyle = {
      color: redA200,
    };
    const addIconStyle = {
      color: amber500,
    };
    const currentPoll = this.props.polls[this.props.match.params.id];
    const tweetText = `Vote on "${currentPoll.title}". Link: http://localhost:8000/${this.props.match.url}`;
    if (currentPoll === undefined) {
      return <Redirect to='/' />;
    }
    return this.state.redirect === true ? <Redirect to='/' /> : (
      <div className="Poll">
        {this.renderDialog()}
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
            {this.props.user &&
              <div>
                <IconButton tooltip='delete poll' iconStyle={deleteIconStyle} onClick={this.handleDelete}>
                  <ActionDelete />
                </IconButton>
                <IconButton tooltip='add choice' iconStyle={addIconStyle} onClick={this.handleOpen}>
                  <ContentAddBox />
                </IconButton>
                <IconButton tooltip='share on twitter' iconStyle={addIconStyle} onClick={() => window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank')}>
                  <SocialShare />
                </IconButton>
              </div>
            }
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

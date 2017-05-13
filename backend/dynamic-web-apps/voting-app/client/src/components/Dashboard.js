import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Chart } from 'react-google-charts';
import { blue500 } from 'material-ui/styles/colors';
import './Dashboard.css';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      title: '',
      description: '',
      choices: '',
      value: -1,
      error: '',
    };
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
  handleRequestClose = () => {
    this.setState({
      error: '',
    });
  }
  handleAdd = async () => {
    try {
      const { title, description } = this.state;
      const choices = this.state.choices.split(/[\s,]+/);
      const response = await fetch('http://localhost:8000/poll/add', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          poll: {
            title,
            description,
            choices: choices.map(el => el === choices[this.state.value] ? {[`${el}`]: 1} : {[`${el}`]: 0}),
          }
        }),
      });
      const json = await response.json();
      if (json.successful) {
        this.handleClose();
        this.props.addPoll('user', title, description, choices.map(el => el === choices[this.state.value] ? {[`${el}`]: 1} : {[`${el}`]: 0}));
      } else {
        this.setState({
          error: 'Something bad happened. Try again later.',
        });
        this.handleClose();
      }
    } catch (e) {
      this.setState({
        error: 'Something bad happened. Try again later.',
      });
      this.handleClose();
    }
  }
  renderDialog = () => {
    const actions = [
      <FlatButton
        label="Add"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleAdd}
        disabled={this.state.value === -1}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];
    return (
      <Dialog
        title="Add new poll"
        actions={actions}
        open={this.state.isOpen}
        onRequestClose={this.handleClose}
        contentStyle={{
          width: '30%',
        }}
        bodyStyle={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
      >
        <TextField
          floatingLabelText="Poll title"
          fullWidth={true}
          onChange={(e) => this.setState({title: e.target.value})}
        />
        <TextField
          floatingLabelText="Poll description"
          fullWidth={true}
          onChange={(e) => this.setState({description: e.target.value})}
        />
        <TextField
          floatingLabelText="Poll choices (separated by commas)"
          fullWidth={true}
          onChange={(e) => this.setState({choices: e.target.value})}
        />
        <SelectField
          floatingLabelText="Your choice"
          value={this.state.value}
          fullWidth={true}
          disabled={this.state.choices === ''}
          onChange={(event, index, value) => this.setState({value})}
        >
          {this.state.choices.split(',').map((el, i) => <MenuItem key={i} value={i} primaryText={el} />)}
        </SelectField>
      </Dialog>
    );
  }
  renderDashboard = () => {
    const dashboardStyle = {
      backgroundColor: blue500,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
    };
    const paperStyle = {
      minWidth: '350px',
      minHeight: '350px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'center',
    };
    const data = [
      [
        ['React vs Angular', 'Popularity'],
        ['React', 7],
        ['Angular', 5],
      ],
      [
        ['Barcelona vs Real Madrid', 'Popularity'],
        ['Barcelona', 4],
        ['Real Madrid', 4],
      ],
      [
        ['Movie', 'Popularity'],
        ['Guardians of the galaxy', 4],
        ['Starwars: The last Jedi', 6],
        ['Logan', 4],
        ['The fate of the furious', 5],
        ['Beauty and the beast', 2],
        ['Spiderman: homecoming', 3],
        ['Transformers: the last knight', 4],
      ],
      [
        ['Language', 'Popularity'],
        ['Javascript', 14],
        ['C', 6],
        ['C++', 6],
        ['Java', 7],
        ['C#', 7],
        ['Python', 9],
      ],
      [
        ['Operating system', 'Popularity'],
        ['Windows', 4],
        ['Linux', 7],
        ['MacOS', 7],
      ],
    ];
    const fabStyle = {
      position: 'fixed',
      right: '30px',
      bottom: '30px'
    };
    return (
      <div className="Dashboard" style={dashboardStyle}>
        {this.renderDialog()}
        <FloatingActionButton className="fab" secondary={true} style={fabStyle} onClick={this.handleOpen}>
          <ContentAdd />
        </FloatingActionButton>
        <h1>Dashboard</h1>
        <div className="your-polls">
          <h3>Your polls</h3>
          <div className="polls">
            <Paper className="poll" zDepth={5} style={paperStyle}>
              <div>
                <Chart
                  chartType="PieChart"
                  width="100%"
                  height="100%"
                  data={data[0]}
                  options={
                    {
                      legend: 'none',
                      pieHole: 0,
                      is3D: false,
                      pieSliceText: 'label',
                    }
                  }
                />
              </div>
              <h4>Angular vs React</h4>
            </Paper>
            <Paper className="poll" zDepth={5} style={paperStyle}>
              <div>
                <Chart
                  chartType="PieChart"
                  width="100%"
                  height="100%"
                  data={data[1]}
                  options={
                    {
                      legend: 'none',
                      pieHole: 0,
                      is3D: false,
                      pieSliceText: 'label',
                    }
                  }
                />
              </div>
              <h4>Barcelona vs Real Madrid</h4>
            </Paper>
            <Paper className="poll" zDepth={5} style={paperStyle}>
              <div>
                <Chart
                  chartType="PieChart"
                  width="100%"
                  height="100%"
                  data={data[2]}
                  options={
                    {
                      legend: 'none',
                      pieHole: 0,
                      is3D: false,
                      pieSliceText: 'label',
                    }
                  }
                />
              </div>
              <h4>Best movie of 2017</h4>
            </Paper>
            <Paper className="poll" zDepth={5} style={paperStyle}>
              <div>
                <Chart
                  chartType="PieChart"
                  width="100%"
                  height="100%"
                  data={data[3]}
                  options={
                    {
                      legend: 'none',
                      pieHole: 0,
                      is3D: false,
                      pieSliceText: 'label',
                    }
                  }
                />
              </div>
              <h4>Most popular programming language</h4>
            </Paper>
            <Paper className="poll" zDepth={5} style={paperStyle}>
              <div>
                <Chart
                  chartType="PieChart"
                  width="100%"
                  height="100%"
                  data={data[4]}
                  options={
                    {
                      legend: 'none',
                      pieHole: 0,
                      is3D: false,
                      pieSliceText: 'label',
                    }
                  }
                />
              </div>
              <h4>Most popular operating system</h4>
            </Paper>
          </div>
        </div>
        <Snackbar
          open={this.state.error !== ''}
          message={this.state.error}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
  render() {
    return this.renderDashboard();
  }
}

export default Dashboard;

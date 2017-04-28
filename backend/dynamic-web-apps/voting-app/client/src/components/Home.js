import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { grey50, grey600, blue500, blue600 } from 'material-ui/styles/colors';
import { Chart } from 'react-google-charts';
import './Home.css';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      recent: [],
      isLoggedIn: false,
    };
  }

  renderPublicHome = () => {
    const homeStyle = {
      backgroundColor: blue500,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
    };
    const viewAllButtonRippleStyle = {
      color: 'black',
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
    ]
    return (
      <div className="Home" style={homeStyle}>
        <h1 className="vote">
          Vote
        </h1>
        <h3 className="fccp">
          Freecodecamp project
        </h3>
        <RaisedButton
          className="view-all-polls"
          containerElement={<Link to="/polls" />}
          label="View all polls"
          secondary={true}
          rippleStyle={viewAllButtonRippleStyle}
        />
        <div className="recent">
          <h3>Recent polls</h3>
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
      </div>
    );
  }

  render() {
    return this.renderPublicHome();
  }
}

export default Home;

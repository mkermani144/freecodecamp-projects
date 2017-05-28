import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { blue500 } from 'material-ui/styles/colors';
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
  componentDidMount = async () => {
    this.props.logOut();
    const result = await fetch('http://localhost:8000/poll/fetchrecent', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const json = await result.json();
    json.forEach(poll => this.props.addPoll(poll.id, poll.owner, poll.title, poll.description, Object.keys(poll.choices).map(key => [key, poll.choices[key]])));
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
            {this.props.polls.map((el, index) => (
              <Paper className="poll" zDepth={5} style={paperStyle} key={index}>
                <div>
                  <Link to={`/poll/${el.user}/${el.id}`}>
                    <Chart
                      chartType="PieChart"
                      width="100%"
                      height="100%"
                      data={[
                          [el.title, 'popularity'],
                        ...el.choices.map(choice => [choice[0], choice[1]])
                      ]}
                      options={
                        {
                            legend: 'none',
                            pieHole: 0,
                            is3D: false,
                            pieSliceText: 'label',
                        }
                        }
                        />
                    </Link>
                  </div>
                  <h4>{el.title}</h4>
                </Paper>
            ))}
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

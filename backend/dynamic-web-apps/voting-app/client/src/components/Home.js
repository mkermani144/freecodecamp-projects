import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { grey50, grey600, blue500, blue600 } from 'material-ui/styles/colors';
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
    const appbarButtonLabelStyle = {
      color: grey50,
    };
    const viewAllButtonRippleStyle = {
      color: 'black',
    };
    return (
      <div className="Home" style={homeStyle}>
        <AppBar
          style={{backgroundColor: blue500}}
          zDepth={0}
          iconElementLeft={<div />}
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
          hoverColor={blue600}
        />
      </div>
    );
  }

  render() {
    return this.renderPublicHome();
  }
}

export default Home;

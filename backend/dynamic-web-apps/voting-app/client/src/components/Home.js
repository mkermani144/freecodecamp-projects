import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import { grey50, grey600, blue600, blue500 } from 'material-ui/styles/colors';
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
    const actionsStyle = {
      alignSelf: 'flex-end',
      padding: '10px',
    };
    const actionButtonLabelStyle = {
      color: grey50,
    };
    return (
      <div className="Home" style={homeStyle}>
        <div className="actions" style={actionsStyle}>
          <FlatButton
            containerElement={<Link to="/login" />}
            label="Login"
            labelStyle={actionButtonLabelStyle}
            rippleColor={grey600}
            hoverColor={blue600}
          />
          <FlatButton
            containerElement={<Link to="/signup" />}
            label="Signup"
            labelStyle={actionButtonLabelStyle}
            rippleColor={grey600}
            hoverColor={blue600}
          />
        </div>
      </div>
    );
  }

  render() {
    return this.renderPublicHome();
  }
}

export default Home;

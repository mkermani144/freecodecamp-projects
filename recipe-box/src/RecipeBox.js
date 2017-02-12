import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { green900, blue500 } from 'material-ui/styles/colors';
import './RecipeBox.css';

class RecipeBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false
    };
  }
  render() {
    const blueStyle = {
      color: blue500,
      borderColor: blue500
    };
    const dialogActions = [
      <FlatButton
        label="Cancel"
        style={blueStyle}
      />,
      <FlatButton
        label="Add"
        style={blueStyle}
        keyboardFocused={true}
      />,
    ];
    return (
      <div className="recipebox" style={{backgroundColor: green900}}>
        <Paper className="box">

        </Paper>
        <FloatingActionButton className="fab" backgroundColor={blue500}
          onClick={() => this.setState({ dialogOpen: true })}>
          <ContentAdd />
        </FloatingActionButton>
        <Dialog open={this.state.dialogOpen}
          actions={dialogActions}
          title='Add new recipe'
          onRequestClose={buttonClicked => this.setState({ dialogOpen: false })}
        >
          <TextField
            floatingLabelText="Recipe name"
            hintText="Spaghetti"
            fullWidth={true}
            underlineFocusStyle={blueStyle}
            floatingLabelFocusStyle={blueStyle}
          />
          <TextField
            floatingLabelText="Ingredients"
            hintText="Noodles,Tomato Sauce,(Optional) Meatballs"
            fullWidth={true}
            underlineFocusStyle={blueStyle}
            floatingLabelFocusStyle={blueStyle}
          />
        </Dialog>
      </div>
    );
  }
}

export default RecipeBox;

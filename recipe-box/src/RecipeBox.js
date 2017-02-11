import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { green900, blue500 } from 'material-ui/styles/colors';
import './RecipeBox.css';

class RecipeBox extends Component {
  render() {
    return (
      <div className="recipebox" style={{backgroundColor: green900}}>
        <Paper className="box">

        </Paper>
        <FloatingActionButton className="fab" backgroundColor={blue500}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

export default RecipeBox;

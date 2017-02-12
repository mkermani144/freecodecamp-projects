import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import { green900, blue500 } from 'material-ui/styles/colors';
import './RecipeBox.css';

class RecipeBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      dialogRecipeName: '',
      dialogRecipeIngredients: ''
    };
  }
  render() {
    const dialogActions = [
      <FlatButton label="Cancel" onClick={() => this.setState({dialogOpen: false})}/>,
      <FlatButton label="Add" keyboardFocused={true}
        onClick={() => {
          this.props.newRecipeHandler(this.state.dialogRecipeName, this.state.dialogRecipeIngredients);
          this.setState({
              dialogOpen: false,
              dialogRecipeName: '',
              dialogRecipeIngredients: ''
          });
        }
        }/>,
    ];
    const recipes = [];
    let k = 0;
    for (let i in this.props.recipes) {
      if (i) {
        const ingredients = [];
        this.props.recipes[i].forEach((el, index) => {
          ingredients.push(<ListItem primaryText={el} key={index} />);
        });
        recipes.push(<ListItem primaryText={i} nestedItems={ingredients} key={k++} />);
      }
    }
    return (
      <div className="recipebox" style={{backgroundColor: green900}}>
        <Paper className="box">
          <List>
            {recipes}
          </List>
        </Paper>
        <FloatingActionButton className="fab" secondary={true} backgroundColor={blue500}
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
            value={this.state.dialogRecipeName}
            onChange={this.handleRecipeNameChange}
          />
          <TextField
            floatingLabelText="Ingredients"
            hintText="Noodles,Tomato Sauce,(Optional) Meatballs"
            fullWidth={true}
            value={this.state.dialogRecipeIngredients}
            onChange={this.handleRecipeIngredientsChange}
          />
        </Dialog>
      </div>
    );
  }
  handleRecipeNameChange = (e) => {
    this.setState({
      dialogRecipeName: e.target.value
    });
  }
  handleRecipeIngredientsChange = (e) => {
    this.setState({
      dialogRecipeIngredients: e.target.value
    });
  }
}

export default RecipeBox;

import React, { Component } from 'react';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import { green50, green500, green900, blue500, grey600 } from 'material-ui/styles/colors';
import './RecipeBox.css';

class RecipeBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      dialogRecipeName: '',
      dialogRecipeIngredients: '',
      actionsVisible: false,
      toolbarStyle: {
        backgroundColor: green500
      }
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
          ingredients.push(<ListItem primaryText={el} disabled={true} key={index} />);
        });
        recipes.push(
          <ListItem primaryText={i}
           nestedItems={ingredients}
           key={k++}
           onClick={
             () => {
               this.setState({
                 actionsVisible: true,
                 toolbarStyle: {
                   backgroundColor: green50
                 }
               });
             }
           } />
        );
      }
    }
    const actionStyle = {
      color: grey600
    };
    let actions = null;
    let back = null;
    let title = null;
    if (this.state.actionsVisible === false) {
      title = (
        <ToolbarGroup>
          <ToolbarTitle text="Recipes" style={{color: green50}} />
        </ToolbarGroup>
      );
    }
    if (this.state.actionsVisible) {
      actions = (
        <ToolbarGroup lastChild={true}>
          <IconButton iconStyle={actionStyle}>
            <ActionDelete />
          </IconButton>
          <IconButton iconStyle={actionStyle}>
            <ImageEdit />
          </IconButton>
        </ToolbarGroup>
      );
      back = (
        <ToolbarGroup firstChild={true}>
          <IconButton iconStyle={actionStyle} onClick={() => this.setState({
            actionsVisible: false,
            toolbarStyle: {
              backgroundColor: green500
            }
          })}>
            <NavigationArrowBack />
          </IconButton>
        </ToolbarGroup>
      );
    }
    return (
      <div className="recipebox" style={{backgroundColor: green900}}>
        <Paper className="box">
          <Toolbar className="Toolbar" style={this.state.toolbarStyle}>
            {back}
            {title}
            {actions}
          </Toolbar>
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

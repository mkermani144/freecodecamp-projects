import React, { Component } from 'react';
import RecipeBox from './RecipeBox';

class RecipeBoxContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: {}
    };
  }
  render() {
    return <RecipeBox newRecipeHandler={this.newRecipeHandler} recipes={this.state.recipes}/>;
  }
  newRecipeHandler = (name, ingredients) => {
    this.setState((prev) => {prev.recipes[name] = ingredients.split(',')});
  }
}

export default RecipeBoxContainer;

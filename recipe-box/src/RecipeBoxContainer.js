import React, { Component } from 'react';
import RecipeBox from './RecipeBox';

class RecipeBoxContainer extends Component {
  constructor(props) {
    super(props);
    this.state = JSON.parse(localStorage.getItem('state')) || {recipes: {}};
  }
  componentDidMount() {
    localStorage.state = JSON.stringify(this.state);
  }
  componentDidUpdate() {
    localStorage.state = JSON.stringify(this.state);
  }
  render() {
    return <RecipeBox recipeChangeHandler={this.recipeChangeHandler} recipes={this.state.recipes}/>;
  }
  recipeChangeHandler = (mode, name, ingredients) => {
    if (mode === 'n' || mode === 'e') {
      this.setState((prev) => {prev.recipes[name] = ingredients.split(',');});
    } else if (mode === 'd') {
      this.setState((prev) => {delete prev.recipes[name];});
    }
  }
}

export default RecipeBoxContainer;

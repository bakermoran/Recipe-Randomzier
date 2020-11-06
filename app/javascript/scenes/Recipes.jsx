import React from "react";
import PropTypes from 'prop-types';
import Recipe from "../components/Recipe"
import { Link } from "react-router-dom";

class Recipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
  }

  componentDidMount() {
    const url = this.props.url + 'recipes/';
    fetch(url, { credentials: 'same-origin' })
    .then((response) => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .then((data) => {
      this.setState({
        recipes: data,
      });
    })
    .catch(error => console.log(error));// eslint-disable-line no-console
  }

  render() {
    return(
      <div>
        {this.state.recipes.map(recipe => (
          <div key={recipe.id}>
            <Recipe
              recipe_details={recipe}
            />
            <Link to={'/recipes/' + recipe.id}>Show me more</Link>
          </div>
        ))}
      </div>
    );
  }
}

Recipes.propTypes = {
    url: PropTypes.string.isRequired
};

export default Recipes;

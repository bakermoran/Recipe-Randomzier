import React from "react";
import PropTypes from 'prop-types';
import Recipe from "./Recipe"
import { Link } from "react-router-dom";
import { Jumbotron, Pagination } from "react-bootstrap";

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
        recipes: data.recipes,
        current_page: data.page,
        total_pages: data.pages
      });
    })
    .catch(error => console.log(error));// eslint-disable-line no-console
  }

  render() {
    let active = this.state.current_page;
    let items = [];
    for (let number = 1; number <= this.state.total_pages; number++) {
      items.push(
        <Pagination.Item key={number} active={number === active}>
          {number}
        </Pagination.Item>,
      );
    }
    return(
      <div>
        <Pagination>{items}</Pagination>
        {this.state.recipes.map(recipe => (
          <Jumbotron key={recipe.id}
          >
            <Recipe
              recipe_details={recipe}
            />
            <Link to={'/recipes/' + recipe.id}>Show me more</Link>
          </Jumbotron>
        ))}
      </div>
    );
  }
}

Recipes.propTypes = {
    url: PropTypes.string.isRequired
};

export default Recipes;

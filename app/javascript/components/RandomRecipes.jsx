import React from 'react';
import Moment from 'react-moment';
import { XCircle } from 'react-bootstrap-icons';
import { Link } from "react-router-dom";
import { Jumbotron, Button } from "react-bootstrap";

class RandomRecipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  deleteRecipe(id) {
    this.props.deleteRecipe(id)
  }

  render() {
    return (
      <div>
        {this.props.recipes.map(recipe => (
          <Jumbotron key={recipe.id}>
            <Button variant="outline-danger"
                    onClick={this.deleteRecipe.bind(this, recipe.id)}>
              <XCircle />
            </Button>
            <h2>{recipe.name}</h2>
            <p><small>Added <Moment fromNow date={recipe.created_at} /></small></p>
            <p>{recipe.description}</p>
            <Link to={'/recipes/' + recipe.id}>Show me more</Link>
          </Jumbotron>
        ))}
      </div>
    );
  } // render()
} // RandomRecipes

export default RandomRecipes;

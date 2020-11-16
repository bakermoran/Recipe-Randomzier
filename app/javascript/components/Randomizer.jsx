import React from "react";
import PropTypes from 'prop-types';
import RandomRecipes from "./RandomRecipes"
import { Jumbotron, Form, Button } from "react-bootstrap";
import { PlusCircle } from 'react-bootstrap-icons';

class Randomizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num_recipes: 5,
      recipes: [],
      recipe_ids: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.addNewRecipe = this.addNewRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  } // handleChange()

  handleClick() {
    const url = this.props.url + `randomizer/?num_recipes=${this.state.num_recipes}`;
    fetch(url, { credentials: 'same-origin' })
    .then((response) => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .then((data) => {
      let recipe_ids = []
      for (let i = 0; i < this.state.recipes.length; i++) {
        recipe_ids.push(this.state.recipes[i].id);
      }
      this.setState({
        recipes: data.recipes,
        recipe_ids: recipe_ids
      });
    })
    .catch(error => console.log(error));// eslint-disable-line no-console
  } // handleClick()

  addNewRecipe() {
    const url = this.props.url + `randomizer/?num_recipes=1`;
    fetch(url, { credentials: 'same-origin' })
    .then((response) => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .then((data) => {
      if (this.state.recipe_ids.includes(data.recipes[0].id)) {
        addNewRecipe() // to do: this doesnt really work
      }
      this.setState({
        recipes: [...this.state.recipes, data.recipes[0]],
        recipe_ids: [...this.state.recipe_ids, data.recipes[0].id],
        num_recipes: this.state.recipes.length + 1
      });
    })
    .catch(error => console.log(error));// eslint-disable-line no-console
  } // addNewRecipe()

  deleteRecipe(id) {
    let new_recipes = [];
    let new_ids = [];
    for (let i = 0; i < this.state.recipes.length; i++) {
      if (id != this.state.recipes[i].id) {
        new_recipes.push(this.state.recipes[i]);
        new_ids.push(this.state.recipes[i].id);
      }
    }
    this.setState({
      recipes: new_recipes,
      recipe_ids: new_ids,
      num_recipes: this.state.num_recipes - 1
    })
  }

  render() {
    return(
      <div>
        <Jumbotron>
          <Form>
            <Form.Group>
              <Form.Label>How many meals do you need this week?</Form.Label>
              <Form.Control type="text" name="num_recipes" value={this.state.num_recipes} onChange={this.handleChange} placeholder="5" />
            </Form.Group>
            <Button variant="outline-primary"
                    onClick={this.handleClick}>
              Refresh Recipes
            </Button>
          </Form>
        </Jumbotron>
        {this.state.recipes ? <RandomRecipes deleteRecipe={this.deleteRecipe}
                                             recipes={this.state.recipes}/>
                                             : ''}
        <Button variant="outline-success"
                onClick={this.addNewRecipe}>
          <PlusCircle />
        </Button>
      </div>
    );
  } // render ()
}

Randomizer.propTypes = {
    url: PropTypes.string.isRequired
};

export default Randomizer;

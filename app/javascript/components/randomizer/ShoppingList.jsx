import { Link } from "react-router-dom";
import React from 'react';

class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // recipe_ids: [1,2,3,4,5],
      recipe_ids: [],
      ingredients: {}
    };
  }

  componentDidMount() {
    const recipe_ids = this.props.location.state.recipe_ids;
    this.setState({recipe_ids: this.props.location.state.recipe_ids});
    for (let i = 0; i < recipe_ids.length; i++) {
      const url = this.props.url + `recipes/${recipe_ids[i]}/`;
      fetch(url, { credentials: 'same-origin' })
      .then((response) => {
          if (!response.ok) throw Error(response.statusText);
          return response.json();
      })
      .then((data) => {
          let ingredients_temp = this.state.ingredients;
          for (let i = 0; i < data.ingredients.length; i++) {
            if (data.ingredients[i].name in ingredients_temp) {
              ingredients_temp[data.ingredients[i].name] += data.ingredients[i].amount;
            }
            else {
              ingredients_temp[data.ingredients[i].name] = data.ingredients[i].amount;
            }
          }
          this.setState({
            ingredients: ingredients_temp
          });
          console.log(this.state.ingredients)
      })
      .catch(error => console.log(error));// eslint-disable-line no-console)
    }
  } // componentDidMount()

  render() {
    let t_body = this.state.recipe_ids.length == 0 ? <Link to={'/randomizer/'}>Try adding some recipes first!</Link> : ""

    if(this.state.ingredients) {
      const ingredients = Object.keys(this.state.ingredients).map((key) => {
          return (
              <li key={key}>
                  {key}: {this.state.ingredients[key]}
              </li>);
      });

      return (
        <div>
          {t_body}
          <h2>Your shopping list this week</h2>
          <ul>
              {ingredients}
          </ul>
        </div>
      );
    }
  } // render
} // ShoppingList

export default ShoppingList;

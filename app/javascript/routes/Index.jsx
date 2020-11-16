import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ShowRecipe from "../components/show_recipes/ShowRecipe";
import ShowAllRecipes from "../components/show_recipes/ShowAllRecipes";
import Home from "../components/app/Home";
import Randomizer from "../components/randomizer/Randomizer";
import ShoppingList from "../components/randomizer/ShoppingList";
import AddRecipe from "../components/add_a_recipe/AddRecipe";

const base_url = "/api/v1/"

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route
        exact
        path="/recipes/"
        component={() => <ShowAllRecipes url={base_url} />}
      />
      <Route
        exact
        path="/randomizer/"
        component={() => <Randomizer url={base_url} />}
      />
      <Route
        exact
        path="/shopping_list/"
        component={(props) => <ShoppingList {...props} url={base_url} />}
      />
      <Route
        exact
        path="/add_recipe/"
        component={() => <AddRecipe url={base_url} />}
      />
      <Route
        exact
        path="/recipes/:id"
        component={(props) => <ShowRecipe {...props} url={base_url} />}
      />
    </Switch>
  </Router>
);

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import ShowRecipe from "../components/ShowRecipe";
import Randomizer from "../components/Randomizer";
import ShowAllRecipes from "../components/ShowAllRecipes";
import ShoppingList from "../components/ShoppingList";
import AddRecipe from "../components/AddRecipe";

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
        component={() => <ShoppingList url={base_url} />}
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

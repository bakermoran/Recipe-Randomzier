import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import ShowRecipe from "../components/ShowRecipe";
import Randomizer from "../components/Randomizer";
import ShowAllRecipes from "../components/ShowAllRecipes";

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
        path="/recipes/:id"
        component={(props) => <ShowRecipe {...props} url={base_url} />}
      />
    </Switch>
  </Router>
);

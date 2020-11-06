import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Recipes from "../scenes/Recipes";
import ShowRecipe from "../scenes/ShowRecipe";

const base_url = "/api/v1/"

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route
        exact
        path="/recipes/"
        component={() => <Recipes url={base_url} />}
      />
      <Route
        exact
        path="/recipes/:id"
        component={(props) => <ShowRecipe {...props} url={base_url} />}
      />
    </Switch>
  </Router>
);

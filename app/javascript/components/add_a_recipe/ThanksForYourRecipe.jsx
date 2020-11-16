import React from "react";
import { Link } from "react-router-dom";
import { Jumbotron } from "react-bootstrap";


function ThanksForYourRecipe(props) {
  return(
    <div>
      <h1>Thanks for submitting a new recipe!</h1>
      <Jumbotron>
          <div>
              You can start using this recipe in your weekly rotation. In the mean time, our expert chefs will review it and let you know if it will get published for other chefs to use!
          </div>
        <Link to='/add_recipe'>Add another recipe</Link> <br></br>
        <Link to='/'>Home</Link>
      </Jumbotron>
    </div>
  );
}

export default ThanksForYourRecipe;

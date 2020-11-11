import React from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';


function Home(props) {
  return(
    <div>
      <h1>Welcome to the recipe randomizer!</h1>
      <div>
        Here we promise to do a couple of things:
        <ol>
          <li>Help you cook great food</li>
          <li>Make it easy to shop for food and discover new recipes</li>
          <li>Not offer a useless life story before you actually get to the recipe</li>
        </ol>
      </div>
      <Link to='recipes'>Show me each recipe</Link> <br></br>
      <Link to='randomizer'>Take me to the randomizer</Link>
    </div>
  );
}

export default Home;

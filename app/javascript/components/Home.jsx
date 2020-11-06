import React from "react";
import { Link } from "react-router-dom";


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
      <Link to='recipes'>Lets get started</Link>
    </div>
  );
}

export default Home;

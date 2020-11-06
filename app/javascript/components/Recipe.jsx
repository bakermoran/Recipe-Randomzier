import React from 'react';

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <p>{this.props.recipe_details.name}</p>
      </div>
    );
  } // render
} // Recipe

export default Recipe;

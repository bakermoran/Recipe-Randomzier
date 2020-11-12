import React from 'react';
import Moment from 'react-moment';

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h2>{this.props.recipe_details.name}</h2>
        <p><small>Added <Moment fromNow date={this.props.recipe_details.created_at} /></small></p>
        <p>{this.props.recipe_details.description}</p>
      </div>
    );
  } // render
} // Recipe

export default Recipe;

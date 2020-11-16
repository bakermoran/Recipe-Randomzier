import React from "react";
import PropTypes from 'prop-types';

class ShowRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const url = this.props.url + `recipes/${this.props.match.params.id}/`;
        fetch(url, { credentials: 'same-origin' })
        .then((response) => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then((data) => {
            this.setState({
                id: data.id,
                recipe_details: data
            });
        })
        .catch(error => console.log(error));// eslint-disable-line no-console)
    }

    render() {
        if(this.state.recipe_details) {
            const ingredients = Object.keys(this.state.recipe_details.ingredients).map((key) => {
                return (
                    <li key={key}>
                        {key}: {this.state.recipe_details.ingredients[key]}
                    </li>)
                ;
            });

            return(
                <div>
                    <h1>{this.state.recipe_details.name}</h1>
                    <img src={this.state.recipe_details.img_url} />
                    <h2>Ingredients Needed</h2>
                    <ul>
                        {this.state.recipe_details.ingredients.map(ingredient => (
                            <li key={ingredient.name}>
                                {ingredient.amount} {ingredient.measure} {ingredient.name}
                            </li>
                        ))}
                    </ul>
                    <h2>Instructions</h2>
                    <ol>
                        {this.state.recipe_details.instructions.map(instruction => (
                            <li key={instruction}>
                                {instruction}
                            </li>
                        ))}
                    </ol>
                </div>
            );
        }
        else {
            return(<div></div>);
        }
    }
}

ShowRecipe.propTypes = {
    url: PropTypes.string.isRequired
};

export default ShowRecipe;

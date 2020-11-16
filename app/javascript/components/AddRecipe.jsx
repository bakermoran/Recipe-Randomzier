import React from "react";
import PropTypes from 'prop-types';
import { Jumbotron, Form, Button, Row, Col } from "react-bootstrap";
import { PlusCircle, XCircle } from 'react-bootstrap-icons';
import ThanksForYourRecipe from "../components/ThanksForYourRecipe";

class AddRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            servings: "",
            image_url: "",
            ingredients: [],
            next_ingredient_name: "",
            next_ingredient_amount: "",
            next_ingredient_measure: "",
            instructions: [],
            next_instruction: "",
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleAddIngredient = this.handleAddIngredient.bind(this);
        this.handleRemoveIngredient = this.handleRemoveIngredient.bind(this);
        this.handleAddInstruction = this.handleAddInstruction.bind(this);
        this.handleRemoveInstruction = this.handleRemoveInstruction.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    } // onChange(event)

    handleAddIngredient() {
        const next_id = this.state.ingredients.length + 1;
        const ingredient_object = {
            id: next_id,
            name: this.state.next_ingredient_name,
            amount: this.state.next_ingredient_amount,
            measure: this.state.next_ingredient_measure
        };
        this.setState({
            ingredients: [...this.state.ingredients, ingredient_object],
            next_ingredient_name: "",
            next_ingredient_amount: "",
            next_ingredient_measure: "",
        });
    } // handleAddIngredient()

    handleRemoveIngredient(id) {
        const new_ingredients_array = this.state.ingredients.filter((ingredient) => ingredient.id !== id);
        this.setState({ingredients: new_ingredients_array});
    } // handleRemoveIngredient()

    handleAddInstruction() {
        const next_id = this.state.instructions.length + 1;
        const instruction_object = {
            id: next_id,
            text: this.state.next_instruction
        };
        this.setState({
            instructions: [...this.state.instructions, instruction_object],
            next_instruction: ""
        });
    } // handleAddInstruction()

    handleRemoveInstruction(id) {
        const new_instructions_array = this.state.instructions.filter((instruction) => instruction.id !== id);
        this.setState({instructions: new_instructions_array});
    } // handleRemoveInstruction()

    handleSubmit(event) {
        if (this.state.name.length == 0 || this.state.description == 0 || this.state.name.servings == 0) return;
        const url = this.props.url + 'recipes/';
        let instructions_array = [];
        for (let i = 0; i < this.state.instructions.length; i++) {
            instructions_array.push(this.state.instructions[i]["text"]);
        }

        const body = {
            recipe: {
                name: this.state.name,
                description: this.state.description,
                servings: this.state.servings,
                ingredients: this.state.ingredients,
                instructions: instructions_array
            }
        };

        fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                // "X-CSRF-Token": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        .then((response) => {
            this.setState({submitted: true})
            return response.json();
        })
        .catch(error => console.log(error));// eslint-disable-line no-console
    } // onSubmit(event)

    render() {
        const ingredients = this.state.ingredients.map((ingredient) => (
            <li key={ingredient.id}>
                <p>
                    {ingredient.amount} {ingredient.measure} {ingredient.name}
                </p>
                <Button variant="outline-danger"
                    onClick={() => this.handleRemoveIngredient(ingredient.id)}
                    >
                    <XCircle />
                </Button>
            </li>
        ));

        const instructions = this.state.instructions.map((instruction) => (
            <li key={instruction.id}>
                {instruction.text}
                <Button variant="outline-danger"
                    onClick={() => this.handleRemoveInstruction(instruction.id)}
                    >
                    <XCircle />
                </Button>
            </li>
        ));

        if(!this.state.submitted) {
            return(
                <div>
                    <h1>
                        Help us by adding your amazing recipe!
                    </h1>
                    <Jumbotron>
                        <Row>
                            <Col>
                                <h2>Tell people about your recipe</h2>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="New Recipe" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text" name="description" value={this.state.description} onChange={this.handleChange} placeholder="This recipe is..." />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>How many people does this serve?</Form.Label>
                                        <Form.Control type="text" name="servings" value={this.state.servings} onChange={this.handleChange} placeholder="2" />
                                    </Form.Group>
                                </Form>
                                <h2>Whats in it?</h2>
                                <ul>
                                        {ingredients}
                                    </ul>
                                <Form>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>Amount</Form.Label>
                                            <Form.Control type="text" name="next_ingredient_amount" value={this.state.next_ingredient_amount} onChange={this.handleChange} placeholder="2" />
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <Form.Label>Measure</Form.Label>
                                            <Form.Control type="text" name="next_ingredient_measure" value={this.state.next_ingredient_measure} onChange={this.handleChange} placeholder="lbs" />
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <Form.Label>Name of ingredient</Form.Label>
                                            <Form.Control type="text" name="next_ingredient_name" value={this.state.next_ingredient_name} onChange={this.handleChange} placeholder="chicken" />
                                        </Form.Group>
                                    </Form.Row>
                                </Form>
                                <Button variant="outline-primary"
                                        onClick={this.handleAddIngredient}>
                                        <PlusCircle />
                                </Button>
                                <h2>How do you make it?</h2>
                                    <ol>
                                        {instructions}
                                    </ol>
                                <Form>
                                    <Form.Group>
                                        <Form.Control type="text" name="next_instruction" value={this.state.next_instruction} onChange={this.handleChange} placeholder="Next do..." />
                                    </Form.Group>
                                </Form>
                                <Button variant="outline-primary"
                                        onClick={this.handleAddInstruction}>
                                        <PlusCircle />
                                </Button>
                                <br></br>
                                <Button variant="outline-success"
                                        onClick={this.handleSubmit}>
                                        Submit Recipe
                                </Button>
                            </Col>
                        </Row>
                    </Jumbotron>
                </div>
            );
        }
        else {
            return (<ThanksForYourRecipe />);
        }
    }
}

AddRecipe.propTypes = {
    url: PropTypes.string.isRequired
};

export default AddRecipe;

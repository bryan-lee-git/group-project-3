import React, { Component } from "react";
import { Row, Button, Container } from "react-materialize";
import { terms } from "../../utilities/ItemTerms";
import NewItemModal from "./NewItemModal";
export default class AddPantryItem extends Component {
  state = {};

  handleClick = e => {
    e.preventDefault();
    console.log(`this.state.itemName is ${this.state.name}`);
    const data = {
      name: this.state.name,
      shelfLife: this.state.shelfLife,
      frequency: this.state.frequency,
      stock: this.state.stock,
      description: this.state.description,
      category: this.state.category
    };
    this.props.addItem(data);
    this.setState({
      name: "",
      shelfLife: "",
      frequency: "",
      stock: "",
      description: "",
      category: "",
      match: false
    });
    this.props.doneAdding(e);
  };

  handleAutocomplete = value => {
    this.setState({ name: value, match: true });
  };

  handleChange = e => {
    const termKeys = Object.keys(terms);
    const { name, value } = e.target;

    if (name === "name") {
      const termMatch = termKeys.filter(item => {
        const test2 = item.toLowerCase();
        return test2.startsWith(value) ? item : null;
      });

      if (termMatch.length === 1) {
        console.log(`here's the termMatch: `, termMatch);
        this.setState({
          [name]: termMatch[0],
          match: true
        });
      } else {
        this.setState({ [name]: value, match: false });
      }
    } else {
      this.setState({ [name]: value, match: false });
    }
  };

  handleModal = e => {
    e.preventDefault();
    this.setState({
      open: false
    });
  };

  render() {
    return (
        <Row>
          <Col s={12} className="animate-up">
          {this.props.open ? (
            <NewItemModal
              doneAdding={this.props.doneAdding}
              terms={terms}
              handleAutocomplete={this.handleAutocomplete}
              state={this.state}
              handleChange={this.handleChange}
              handleClick={this.handleClick}
              open={this.props.open}
            />
          ) : (
            <Button
              className="back-btn btn-large"
              onClick={this.props.doneAdding}
            >
              ADD PANTRY ITEM
            </Button>
          )}
          </Col>
        </Row>
    );
  }
}

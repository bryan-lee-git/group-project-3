import React, { Component } from "react";
import { Row, Col, Button, Modal, Input, Container } from "react-materialize";
import Autocomplete from "react-materialize/lib/Autocomplete";
import { terms } from "../../utilities/ItemTerms";
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
    const capName = value.replace(
      value.charAt(0),
      value.charAt(0).toUpperCase()
    );
    this.setState({ name: capName });
  };

  handleChange = e => {
    const termKeys = Object.keys(terms);
    const { name, value } = e.target;
    console.log(`name = ${name} and value = ${value}`);
    if (value) {
      const capName = value.replace(
        value.charAt(0),
        value.charAt(0).toUpperCase()
      );
      if (name === "name") {
        if (termKeys.includes(value)) {
          this.setState({
            [name]: capName,
            match: true
          });
        }
      }
      this.setState({ [name]: capName });
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
      <Container>
        <Row>
          {this.props.open ? (
            <Modal
              id="add-pantry-modal"
              header={`ADD PANTRY ITEM`}
              open={this.props.open}
              title="ADD ITEM"
              actions={
                <Col s={12}>
                  <Button
                    className="back-btn"
                    open={this.props.open}
                    onClick={this.props.doneAdding}
                  >
                    Close
                  </Button>
                </Col>
              }
            >
              <Autocomplete
                name="name"
                data={terms}
                label="Existing Items"
                placeholder="SELECT AN EXISTING ITEM"
                onAutocomplete={this.handleAutocomplete}
              />

              <Input
                name="name"
                value={this.state.name}
                label="Pantry Item Name"
                placeholder="OR ENTER ONE OF YOUR OWN"
                onChange={this.handleChange}
                style={this.state.match ? { color: "green" } : { color: "red" }}
              />

              <Input
                name="description"
                label="Description"
                type="text"
                value={this.state.description}
                placeholder={this.state.description}
                onChange={this.handleChange}
              />
              <Row>
                <Input
                  s={12}
                  l={6}
                  name="category"
                  type="select"
                  value={this.state.category}
                  placeholder={this.state.category}
                  onChange={this.handleChange}
                >
                  <option value="">Choose a Category</option>
                  <option value="nonVegan">Non Vegan</option>
                  <option value="bread">Bread</option>
                  <option value="cheese">Dairy</option>
                  <option value="stable">Shelf Stable Grocery</option>
                  <option value="condiments">Condiments</option>
                  <option value="produce">Fresh Produce</option>
                  <option value="canned">Canned Goods</option>
                  <option value="spices">Spices</option>
                  <option value="frozen">Frozen Foods</option>
                  <option value="household">Household</option>
                </Input>

                <Input
                  s={12}
                  l={6}
                  name="stock"
                  type="select"
                  value={this.state.stock}
                  placeholder={this.state.category}
                  onChange={this.handleChange}
                >
                  <option value="">Choose a Stock Condition</option>
                  <option value="1">OUT</option>
                  <option value="2">LOW</option>
                  <option value="3">ENOUGH</option>
                </Input>
              </Row>

              <Row>
                <Input
                  s={12}
                  l={6}
                  name="frequency"
                  label="Purchase Frequency (in days)"
                  type="number"
                  value={this.state.frequency}
                  placeholder={this.state.frequency}
                  onChange={this.handleChange}
                />

                <Input
                  s={12}
                  l={6}
                  name="shelfLife"
                  label="Shelf Life (in days)"
                  type="number"
                  value={this.state.shelfLife}
                  placeholder={this.state.shelfLife}
                  onChange={this.handleChange}
                />
              </Row>
              <Button onClick={this.handleClick}>Submit</Button>
            </Modal>
          ) : (
            <Button
              className="back-btn btn-large"
              onClick={this.props.doneAdding}
            >
              ADD PANTRY ITEM
            </Button>
          )}
        </Row>
      </Container>
    );
  }
}

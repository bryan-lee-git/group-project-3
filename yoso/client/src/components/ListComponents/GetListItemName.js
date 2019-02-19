import React from "react";
import { Autocomplete, Input, Col, Button, Row } from "react-materialize";

export default props => {
  return (
    <React.Fragment>
      <Autocomplete
        s={12}
        l={5}
        data={props.terms}
        label="Existing Items"
        placeholder="SELECT AN EXISTING ITEM"
        onAutocomplete={props.handleAutocomplete}
        name="name"
      />
      <Input
        s={12}
        l={5}
        label="List Item Name"
        placeholder="OR ENTER ONE OF YOUR OWN"
        name="name"
        value={props.name}
        style={props.match ? { color: "green" } : { color: "red" }}
        onChange={props.handleChange}
      />
      <Col s={12} l={2}>
        <Button
          className="btn btn-large add-item-btn"
          onClick={props.handleNewName}
        >
          Add
        </Button>
      </Col>
    </React.Fragment>
  );
};

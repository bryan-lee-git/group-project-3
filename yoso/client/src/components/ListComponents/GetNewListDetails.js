import React from "react";
import { Input, Button, Col } from "react-materialize";

export default props => {
  return (
    <React.Fragment>
      <Input value={props.state.name} disabled style={{ color: "green" }} />
      <Input
        s={6}
        l={2}
        placeholder="Unit Size"
        name="unitSize"
        label="Unit Size"
        value={props.state.unitSize}
        onChange={props.handleChange}
      />
      <Input
        s={6}
        l={2}
        type="select"
        label="Package Type"
        placeholder="Package Type"
        name="measurement"
        value={props.state.measurement}
        onChange={props.handleChange}
      >
        {props.measurements.map((measurement, index) => (
          <option key={index} value={measurement}>
            {measurement}
          </option>
        ))}
      </Input>
      <Input
        s={6}
        l={1}
        placeholder="Quantity"
        label="# of Packages"
        name="quantity"
        value={props.state.quantity}
        onChange={props.handleChange}
      />
      <Input
        s={6}
        l={2}
        placeholder="Notes"
        label="Notes"
        name="notes"
        value={props.state.notes}
        onChange={props.handleChange}
      />
      <Col s={12} l={2}>
        <Button
          className="btn btn-large add-item-btn"
          onClick={props.handleNewItem}
        >
          Add
        </Button>
      </Col>
    </React.Fragment>
  );
};

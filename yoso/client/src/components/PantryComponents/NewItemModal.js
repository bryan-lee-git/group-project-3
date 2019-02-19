import React from "react";
import { Autocomplete, Modal, Input, Button, Row } from "react-materialize";
export default props => {
  return (
    <React.Fragment>
      <Modal
        id="add-pantry-modal"
        header={`ADD PANTRY ITEM`}
        open={props.open}
        title="ADD ITEM"
        actions={
          <Button
            className="back-btn add-pantry-btn"
            open={props.state.open}
            onClick={props.doneAdding}
          >
            Close
          </Button>
        }
      >
        <Autocomplete
          name="name"
          data={props.terms}
          label="Existing Items"
          placeholder="SELECT AN EXISTING ITEM"
          onAutocomplete={props.handleAutocomplete}
        />

        <Input
          name="name"
          value={props.state.name}
          label="Pantry Item Name"
          placeholder="OR ENTER ONE OF YOUR OWN"
          onChange={props.handleChange}
          style={props.state.match ? { color: "green" } : { color: "red" }}
        />

        <Input
          name="description"
          label="Description"
          type="text"
          value={props.state.description}
          placeholder={props.state.description}
          onChange={props.handleChange}
        />
        <Row>
          <Input
            s={12}
            l={6}
            name="category"
            type="select"
            value={props.state.category}
            placeholder={props.state.category}
            onChange={props.handleChange}
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
            value={props.state.stock}
            placeholder={props.state.category}
            onChange={props.handleChange}
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
            value={props.state.frequency}
            placeholder={props.state.frequency}
            onChange={props.handleChange}
          />

          <Input
            s={12}
            l={6}
            name="shelfLife"
            label="Shelf Life (in days)"
            type="number"
            value={props.state.shelfLife}
            placeholder={props.state.shelfLife}
            onChange={props.handleChange}
          />
        </Row>
        <Button className="pantry-submit" onClick={props.handleClick}>
          Submit
        </Button>
      </Modal>
    </React.Fragment>
  );
};

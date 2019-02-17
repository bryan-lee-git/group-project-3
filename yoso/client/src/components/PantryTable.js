import React, { Component } from "react";
import { Table, Icon, Modal, Input, Button } from "react-materialize";
import ImbedPurchases from "./ImbedPurchases";
import PantryAPI from "../utilities/PantryAPI";
import EditInput from "./ListComponents/EditInput";
export default class PantryTable extends Component {
  state = {
    helper: "",
    selected: "",
    PantryId: ""
  };

  handleHover = e => {
    e.preventDefault(e);
    if (e.target.dataset.id) {
      this.setState({
        helper: `${e.target.dataset.field} is a ${
          e.nativeEvent.target.nodeName
        }, has value of ${
          e.target.dataset.value
        }, the PantryId is ${e.target.dataset.id.slice(
          e.target.dataset.id.search("-") + 1
        )}, the cell id is ${e.target.dataset.id}, and is located at ${
          e.clientX
        } X and ${e.clientY} Y`,
        selected: e.target.dataset.id,
        PantryId: e.target.dataset.id.slice(
          e.target.dataset.id.search("-") + 1
        ),
        field: e.target.dataset.field
      });
    }
  };

  getStyle = id => {
    return this.state.selected === id ? { backgroundColor: "yellow" } : {};
  };

  handleEdit = (e, cell) => {
    e.preventDefault();
    const cellKey = cell.slice(0, cell.search("-"));
    let data = {};
    for (const key in this.state) {
      if (this.state.hasOwnProperty(key)) {
        const element = this.state[key];
        if (key === cellKey) {
          data = { [cellKey]: element };
        }
      }
    }
    PantryAPI.updatePantryItem(this.state.PantryId, data).then(res => {
      console.log(res);
      this.props.getPantry();
    });
  };

  handleDelete = e => {
    e.preventDefault();
    console.log(`The PantryId of this cell is: ${this.state.PantryId}}`);
    PantryAPI.deletePantryItem(this.state.PantryId).then(res => {
      console.log(res);
      this.props.getPantry();
    });
  };

  handleSort = e => {
    e.preventDefault();
    console.log(`The column to sort is: ${e.target.dataset.field}`);
    this.props.getPantry(e.target.dataset.field);
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    if (value) {
      const capName = value.replace(
        value.charAt(0),
        value.charAt(0).toUpperCase()
      );

      this.setState({ [name]: capName });
    }
  };

  render() {
    const pantry = this.props.pantry.map((item, index) => (
      <tr key={index}>
        <td
          data-field="purchases"
          data-id={`purchases-${item.id}`}
          onMouseEnter={this.handleHover}
          style={this.getStyle(`purchases-${item.id}`)}
        >
          <ImbedPurchases
            CellId={`purchases-${item.id}`}
            itemName={item.name}
          />
        </td>

        <td
          data-field="name"
          data-id={`name-${item.id}`}
          data-value={item.name}
          onMouseEnter={this.handleHover}
          onClick={this.handleEdit}
          style={this.getStyle(`name-${item.id}`)}
        >
          <strong>{item.name}</strong>
        </td>

        <td
          data-field="description"
          data-id={`description-${item.id}`}
          data-value={item.description}
          onMouseEnter={this.handleHover}
          style={this.getStyle(`description-${item.id}`)}
        >
          <EditInput
            activeCell={this.state.selected}
            thisCell={`description-${item.id}`}
            name="description"
            label="Description"
            placeholder={item.description}
            type="text"
            value={this.state.value}
            handleChange={this.handleChange}
            handleEdit={this.handleEdit}
          />
        </td>

        <td
          data-field="stock"
          data-id={`stock-${item.id}`}
          data-value={item.stock}
          onMouseEnter={this.handleHover}
          style={this.getStyle(`stock-${item.id}`)}
        >
          <EditInput
            activeCell={this.state.selected}
            thisCell={`stock-${item.id}`}
            name="stock"
            label="Stock"
            placeholder={item.stock}
            type="select"
            value={this.state.value}
            handleChange={this.handleChange}
            handleEdit={this.handleEdit}
          >
            <option>OUT</option>
            <option>LOW</option>
            <option>ENOUGH</option>
          </EditInput>
        </td>

        <td
          data-field="frequency"
          data-id={`frequency-${item.id}`}
          data-value={item.frequency}
          onMouseEnter={this.handleHover}
          style={this.getStyle(`frequency-${item.id}`)}
        >
          <EditInput
            activeCell={this.state.selected}
            thisCell={`frequency-${item.id}`}
            label="Frequency"
            name="frequency"
            type="number"
            placeholder={item.frequency}
            value={this.state.value}
            handleChange={this.handleChange}
            handleEdit={this.handleEdit}
          />
        </td>

        <td
          data-field="shelfLife"
          data-id={`shelfLife-${item.id}`}
          data-value={item.shelfLife}
          onMouseEnter={this.handleHover}
          style={this.getStyle(`shelfLife-${item.id}`)}
        >
          <EditInput
            activeCell={this.state.selected}
            thisCell={`shelfLife-${item.id}`}
            label="Shelf Life"
            name="shelfLife"
            type="number"
            placeholder={item.shelfLife}
            value={this.state.value}
            handleChange={this.handleChange}
            handleEdit={this.handleEdit}
          />
        </td>

        <td
          data-field="category"
          data-id={`category-${item.id}`}
          data-value={item.category}
          onMouseEnter={this.handleHover}
          style={this.getStyle(`category-${item.id}`)}
        >
          <EditInput
            activeCell={this.state.selected}
            thisCell={`category-${item.id}`}
            name="category"
            label="Category"
            placeholder={item.category}
            type="select"
            value={this.state.value}
            handleChange={this.handleChange}
            handleEdit={this.handleEdit}
          >
            <option>Choose a Category</option>
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
          </EditInput>
        </td>

        <td
          data-field="delete"
          data-id={`delete-${item.id}`}
          onMouseEnter={this.handleHover}
          onClick={this.handleDelete}
          style={this.getStyle(`delete-${item.id}`)}
        >
          {" "}
          <Icon>delete_forever</Icon>
        </td>
      </tr>
    ));

    return (
      <React.Fragment>
        <Table
          centered={true}
          responsive={true}
          bordered={true}
          style={{ backgroundColor: "white" }}
        >
          <thead>
            <tr id="header">
              <th
                data-field="purchases"
                data-id={`header-purchases`}
                onMouseEnter={this.handleHover}
                style={this.getStyle(`header-purchases`)}
              >
                <Icon>shopping_cart</Icon>
              </th>
              <th
                data-field="name"
                data-id={`header-name`}
                onMouseEnter={this.handleHover}
                onClick={this.handleSort}
                style={this.getStyle(`header-name`)}
              >
                Name
              </th>
              <th
                data-field="description"
                data-id={`header-description`}
                onMouseEnter={this.handleHover}
                onClick={this.handleSort}
                style={this.getStyle(`header-description`)}
              >
                Description
              </th>
              <th
                data-field="stock"
                onMouseEnter={this.handleHover}
                data-id={`header-stock`}
                onClick={this.handleSort}
                style={this.getStyle(`header-stock`)}
              >
                Stock
              </th>
              <th
                data-field="frequency"
                data-id={`header-frequency`}
                onMouseEnter={this.handleHover}
                onClick={this.handleSort}
                style={this.getStyle(`header-frequency`)}
              >
                Frequency
              </th>
              <th
                data-field="shelfLife"
                data-id={`header-shelfLife`}
                onMouseEnter={this.handleHover}
                onClick={this.handleSort}
                style={this.getStyle(`header-shelfLife`)}
              >
                Shelf Life
              </th>
              <th
                data-field="category"
                data-id={`header-category`}
                onMouseEnter={this.handleHover}
                onClick={this.handleSort}
                style={this.getStyle(`header-category`)}
              >
                Category
              </th>
              <th
                data-field="delete"
                data-id={`header-delete`}
                onMouseEnter={this.handleHover}
                style={this.getStyle(`header-delete`)}
              />
            </tr>
          </thead>
          <tbody>{pantry}</tbody>
        </Table>
      </React.Fragment>
    );
  }
}

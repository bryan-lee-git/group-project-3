import React, { Component } from "react";
import { Table, Icon, Modal, Input, Button } from "react-materialize";
import ImbedPurchases from "./ImbedPurchases";
export default class PantryTable extends Component {
  state = {
    helper: "",
    selected: ""
  };

  componentDidMount() {
    const ids = this.props.pantry.map(item => item.name);
    console.log(`the pantry ids are: `, ids);
  }

  handleHover = e => {
    e.preventDefault(e);
    if (e.target.dataset.id) {
      this.setState({
        helper: `${e.target.dataset.field} element is a ${
          e.nativeEvent.target.nodeName
        }, has value of ${
          e.target.dataset.value
        }, the PantryId is ${e.target.dataset.id.slice(
          e.target.dataset.id.search("-") + 1
        )}, the cell id is ${e.target.dataset.id}, and is located at ${
          e.clientX
        } X and ${e.clientY} Y`,
        selected: e.target.dataset.id
      });
    }
  };

  getStyle = id => {
    return this.state.selected === id ? { backgroundColor: "yellow" } : {};
  };

  handleEdit = e => {
    e.preventDefault();
    //const id = e.target.dataset.id.slice(e.target.dataset.id.search("-") + 1);
    console.log(e.target);
  };

  handleDelete = e => {
    e.preventDefault();
    console.log(`The PantryId of this cell is: ${e.target.dataset.value}`);
  };

  handleSort = e => {
    e.preventDefault();
    console.log(`The column to sort is: ${e.target.dataset.field}`);
    this.props.getPantry(e.target.dataset.field);
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
          onClick={this.handleEdit}
          style={this.getStyle(`description-${item.id}`)}
        >
          {item.description}
        </td>
        <td
          data-field="stock"
          data-id={`stock-${item.id}`}
          data-value={item.stock}
          onMouseEnter={this.handleHover}
          onClick={this.handleEdit}
          style={this.getStyle(`stock-${item.id}`)}
        >
          {item.stock}
        </td>
        <td
          data-field="frequency"
          data-id={`frequency-${item.id}`}
          data-value={item.frequency}
          onMouseEnter={this.handleHover}
          onClick={this.handleEdit}
          style={this.getStyle(`frequency-${item.id}`)}
        >
          {item.frequency}
        </td>
        <td
          data-field="shelfLife"
          data-id={`shelfLife-${item.id}`}
          data-value={item.shelfLife}
          onMouseEnter={this.handleHover}
          onClick={this.handleEdit}
          style={this.getStyle(`shelfLife-${item.id}`)}
        >
          {item.shelfLife}
        </td>
        <td
          data-field="category"
          data-id={`category-${item.id}`}
          data-value={item.category}
          onMouseEnter={this.handleHover}
          onClick={this.handleEdit}
          style={this.getStyle(`category-${item.id}`)}
        >
          {item.category}
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
        <div>
          <p>The current element is: {this.state.helper}</p>
        </div>

        <Table centered={true} responsive={true} bordered={true}>
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

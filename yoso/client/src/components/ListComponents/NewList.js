import React, { Component } from "react";
import {
  Card,
  Row,
  Col,
  Autocomplete,
  Input,
  Button,
  Icon,
  Table
} from "react-materialize";
import ListAPI from "../../utilities/ListAPI";
import ItemAPI from "../../utilities/ItemAPI";
import { terms } from "../../utilities/ItemTerms";
import BackBtn from "../BackBtn";
import PageHeader from "../PageHeader";
import NewItemInput from "./NewItemInput";
import DisplayAddList from "./DisplayAddList";

const measurements = [
  "Package Type",
  "Pack",
  "Ounce(s)",
  "Pound(s)",
  "Feet",
  "Liter(s)",
  "Can(s)",
  "Bottle(s)",
  "Package(s)",
  "Carton(s)",
  "Loaf(s)",
  "Box(es)",
  "Bunch(es)",
  "Gallon(s)",
  "Quart(s)",
  "Pint(s)",
  "Case(s)",
  "Dozen",
  "Bag(s)",
  "Single(s)",
  "Jar(s)",
  "Piece(s)",
  "Container(s)",
  "Unit(s)"
];

export default class NewList extends Component {
  state = {
    items: [],
    terms: terms,
    redirect: false,
    listNameDone: false
  };

  handleChange = e => {
    const { name, value } = e.target;
    if (value) {
      const capName = value.replace(
        value.charAt(0),
        value.charAt(0).toUpperCase()
      );
      this.setState({ [name]: capName });
    }
  };

  handleAutocomplete = value => {
    const capName = value.replace(
      value.charAt(0),
      value.charAt(0).toUpperCase()
    );
    this.setState({ name: capName });
  };

  handleNewItem = newItem => {
    const newItems = [...this.state.items, newItem];
    this.setState({
      items: newItems
    });
  };

  handleRemoveItem = e => {
    const index = e.target.dataset.index;
    const newItems = this.state.items;
    newItems.splice(index, 1);
    this.setState({ items: newItems });
  };

  createList = (e, id) => {
    e.preventDefault();
    ListAPI.createList(id, {
      name: this.state.listName
    }).then(response => {
      this.state.items.forEach(item => {
        ItemAPI.createItem({
          name: item.name,
          unitSize: item.unitSize,
          measurement: item.measurement,
          quantity: item.quantity,
          notes: item.notes,
          listId: response.data.id
        }).then(() => {
          this.props.handleSwitch(e, 2);
        });
      });
    });
  };

  getListName = e => {
    e.preventDefault();
    this.setState({
      listNameDone: !this.state.listNameDone
    });
  };

  render() {
    return (
      <div className="center-align">
        <Row>
          <Col s={12}>
            <PageHeader>
              {!this.state.listName ? "New List" : this.state.listName}
            </PageHeader>
          </Col>
        </Row>
        <BackBtn
          goto="/lists"
          handleSwitch={this.props.handleSwitch}
          page={0}
        />
        <Row>
          <NewItemInput
            handleAutocomplete={this.handleAutocomplete}
            handleChange={this.handleChange}
            handleNewItem={this.handleNewItem}
            handleClearInputs={this.handleClearInputs}
            state={this.state}
            measurements={measurements}
            terms={this.state.terms}
          />
          {this.state.listNameDone ? (
            <DisplayAddList
              state={this.state}
              userId={this.props.context.id}
              createList={this.createList}
            />
          ) : (
            <Col s={12}>
              <Button className="back-btn" onClick={this.getListName}>
                SAVE LIST NAME
              </Button>
            </Col>
          )}
        </Row>
      </div>
    );
  }
}

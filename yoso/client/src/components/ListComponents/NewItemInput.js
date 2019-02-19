import React, { Component } from "react";
import { Row, Col, Card, Autocomplete, Input, Button } from "react-materialize";
import ItemAPI from "../../utilities/ItemAPI";
import GetListItemName from "./GetListItemName";
import GetNewListDetails from "./GetNewListDetails";

export default class NewItemInput extends Component {
  state = {
    gotName: false,
    match: false,
    name: "",
    unitSize: "",
    measurement: "",
    quantity: "",
    notes: ""
  };

  componentDidMount() {
    console.log(
      `inside newiteminpout component did mount, state:`,
      this.state.name
    );
  }

  handleChange = e => {
    const termKeys = Object.keys(this.props.terms);
    const { name, value } = e.target;

    if (name === "name") {
      const termMatch = termKeys.filter(item => {
        const test2 = item.toLowerCase();
        return item.toLowerCase().startsWith(value.toLowerCase()) ? item : null;
      });

      if (termMatch.length === 1) {
        console.log(`termMatch = `, termMatch);
        this.setState({
          name: termMatch[0],
          match: true
        });
      } else {
        this.setState({ [name]: value, match: false });
      }
    } else {
      this.setState({ [name]: value, match: false });
    }
  };

  handleAutocomplete = value => {
    this.setState({ name: value, match: true });
  };

  handleNewItem = e => {
    e.preventDefault();
    const newItem = {
      name: this.state.name,
      unitSize: this.state.unitSize,
      measurement: this.state.measurement,
      quantity: this.state.quantity,
      notes: this.state.notes
    };

    this.setState({
      name: "",
      unitSize: "",
      measurement: "",
      quantity: "",
      notes: ""
    });
    this.handleNewName(e);
    this.props.handleNewItem(newItem);
  };

  handleNewName = e => {
    e.preventDefault();
    this.setState({
      gotName: !this.state.gotName
    });
  };

  render() {
    return (
      <React.Fragment>
        {!this.props.state.listNameDone ? (
          <Col s={12}>
            <Card className="z-depth-5 animate-up list-card rounded">
              <Row>
                <Input
                  s={12}
                  placeholder="List Name"
                  name="listName"
                  value={this.props.state.listName}
                  onChange={this.props.handleChange}
                />
              </Row>
            </Card>
          </Col>
        ) : (
          <Col s={12}>
            <Card
              id="new-item-input"
              className="z-depth-5 animate-up-2 list-card rounded"
            >
              <Row>
                {!this.state.gotName ? (
                  <GetListItemName
                    handleAutocomplete={this.handleAutocomplete}
                    handleChange={this.handleChange}
                    handleNewName={this.handleNewName}
                    terms={this.props.terms}
                    name={this.state.name}
                    match={this.state.match}
                  />
                ) : (
                  <GetNewListDetails
                    state={this.state}
                    handleChange={this.handleChange}
                    handleNewItem={this.handleNewItem}
                    measurements={this.props.measurements}
                  />
                )}
              </Row>
            </Card>
          </Col>
        )}
      </React.Fragment>
    );
  }
}

import React, { Component } from "react";
import { Col, Card, Row, Button, Modal, Input } from "react-materialize";
import PantryAPI from "../../utilities/PantryAPI";
import WasteTable from "./WasteTable";
import Collapsible from "react-materialize/lib/Collapsible";
import CollapsibleItem from "react-materialize/lib/CollapsibleItem";
import PantryTable from "../PantryTable";

class WasteItem extends Component {
  state = {
    UserId: this.props.context.user.id,
    build: false,
    sort: "frequency",
    pantry: [],
    purchases: [],
    isSimming: false
  };

  componentDidMount() {
    this.setState({ UserId: this.props.context.user.id });
    this.getPantry();
  }

  launchBuildPantry = e => {
    e.preventDefault();
    this.setState({
      build: true
    });
  };

  handleSort = e => {
    e.preventDefault();

    const { name, value } = e.target;
    console.log(
      `inside handle sort, here's name: ${name} and value: ${value} `
    );
    this.setState({
      [name]: value
    });
  };

  handleChange = e => {
    this.setState({
      updateValue: e.target.value
    });
  };

  handleSubmit = (e, id) => {
    e.preventDefault();
    let value = this.state.updateValue;
    if (this.state.label === "frequency" || this.state.label === "shelfLife") {
      value = parseInt(value);
    }
    const data = {
      [this.state.label]: value
    };

    console.log(
      `inside handle submit, here's what we're sending to the db: req.params.id: ${id} and req.body: `,
      data
    );

    PantryAPI.updatePantryItem(id, data).then(response =>
      console.log(response)
    );

    this.handleModal(e);
  };

  handleModal = e => {
    e.preventDefault();
    this.setState({
      update: !this.state.update
    });
  };

  getPantry = column => {
    const { id } = this.props.context.user;
    let sort = "";
    if (!column) {
      sort = this.state.sort;
    } else {
      sort = column;
    }

    console.log(
      `in get pantry inside wasteitem, here's sort: ${sort} and here's the UserId: ${id}`
    );

    PantryAPI.getPantry(id, sort).then(response =>
      this.setState({
        pantry: response.data
      })
    );
  };

  handleDelete = (e, id, cb) => {
    e.preventDefault();
    console.log(
      `inside handle delete method of waste item. here's the id to delete: `,
      id
    );

    PantryAPI.deletePantryItem(id).then(response => cb());
  };

  handlePantryUpdate = (e, columnName, pantryInfo) => {
    e.preventDefault();
    console.log(`inside the handlePantryUpdate method`);
    const { id, name } = pantryInfo;
    let value = this.props.pantry
      .filter(item => item.id === id)
      .map(result => result[columnName]);
    console.log(`here's the value to update: ${value}`);
    this.setState({
      update: true,
      label: columnName,
      pantryIdToUpdate: id,
      pantryNameToUpdate: name,
      valueToUpdate: value
    });
  };

  render() {
    const { user } = this.props.context;

    return (
      <React.Fragment>
        <Row>
          <h3 className="white-text fade-in">
            {user.first.toUpperCase()}'S PANTRY
          </h3>
          <Col s={12}>
            <Collapsible>
              <CollapsibleItem header="New Table Style">
                <PantryTable
                  pantry={this.state.pantry}
                  getPantry={this.getPantry}
                />
              </CollapsibleItem>
              <CollapsibleItem header="Old Table Style">
                <WasteTable
                  pantry={this.state.pantry}
                  purchases={this.state.purchases}
                  handleDelete={this.handleDelete}
                  handlePantryUpdate={this.handlePantryUpdate}
                  buildPantry={this.buildPantry}
                  getPantry={this.getPantry}
                />
              </CollapsibleItem>
            </Collapsible>
          </Col>
        </Row>

        <Modal
          id="pop-up-input"
          header={`Update ${this.state.label} for ${
            this.state.pantryNameToUpdate
          }`}
          open={this.state.update}
          actions={
            <Button className="btn" onClick={this.props.handleModal}>
              Nevermind
            </Button>
          }
        >
          {this.state.label === "stock" ? (
            <Input
              s={12}
              value={this.state.updateValue}
              label={this.state.label}
              type="select"
              onChange={this.handleChange}
            >
              <option value="ENOUGH">ENOUGH</option>
              <option value="LOW">LOW</option>
              <option value="OUT">OUT</option>
            </Input>
          ) : (
            <Input
              s={12}
              value={this.state.updateValue}
              placeholder={this.state.valueToUpdate}
              label={this.state.label}
              name="listName"
              onChange={this.handleChange}
            />
          )}

          <Button
            className="btn"
            onClick={e => this.handleSubmit(e, this.state.pantryIdToUpdate)}
          >
            Save
          </Button>
        </Modal>
      </React.Fragment>
    );
  }
}

export default WasteItem;

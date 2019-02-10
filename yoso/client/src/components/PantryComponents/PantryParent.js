import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Input,
  Modal,
  Button,
  Card
} from "react-materialize";
import BackBtn from "../BackBtn";

import LogoRow from "../LogoRow";
import PantryAPI from "../../utilities/PantryAPI";
import PurchasesAPI from "../../utilities/PurchasesAPI";

import Moment from "react-moment";
import moment from "moment";
import PantryTable from "./PantryTable";

export default class PantryParent extends Component {
  state = {
    pantry: [],
    purchases: [],
    sort: "frequency",
    update: false,
    label: "",
    updateValue: ""
  };
  async componentDidMount() {
    await this.getPantry();
    await this.getPurchases();
  }
  getPantry = () => {
    const { id } = this.props.user.user;

    PantryAPI.getPantry(id, this.state.sort).then(response =>
      this.setState({
        pantry: response.data
      })
    );
  };

  getPurchases = async () => {
    let everything = [];
    const allPurchases = this.state.pantry.map(async item => {
      const purchases = await PurchasesAPI.getPurchases(item.id);
      everything.push(purchases);
    });
    this.setState({
      purchases: everything
    });
  };

  handleDelete = (e, id, cb) => {
    e.preventDefault();

    console.log(`here's the id to delete: `, id);
    console.log(`inside handle delete method of pantry parent`);
    PantryAPI.deletePantryItem(id).then(response => cb());
  };
  handlePantryUpdate = (e, columnName, pantryInfo) => {
    e.preventDefault();
    console.log(`inside the handlePantryUpdate method`);
    const { id, name } = pantryInfo;
    let value = this.state.pantry
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

  render() {
    // console.log(`inside pantry parent render, here's props: `, this.props);
    return (
      <Container className="center-align">
        <LogoRow />
        <Row>
          <Col s={12}>
            <h1 className="white-text fade-in">IN THE PANTRY</h1>
          </Col>
        </Row>
        <BackBtn goto="home" />
        <Row>
          <Card className="rounded z-depth-5">
            <h3>Pantry Items</h3>
          </Card>
        </Row>
        <PantryTable
          pantry={this.state.pantry}
          handleDelete={this.handleDelete}
          handlePantryUpdate={this.handlePantryUpdate}
          getPantry={this.getPantry}
          purchases={this.state.purchases}
        />
        <Modal
          id="pop-up-input"
          header={`Update ${this.state.label} for ${
            this.state.pantryNameToUpdate
          }`}
          open={this.state.update}
          actions={
            <Button className="btn" onClick={this.handleModal}>
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
      </Container>
    );
  }
}

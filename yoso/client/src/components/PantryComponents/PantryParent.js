import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Input,
  Modal,
  Button,
  Card,
  Collapsible
} from "react-materialize";
import BackBtn from "../BackBtn";
import BottomSpacer from "../BottomSpacer";
import PageHeader from "../PageHeader";
import PantryAPI from "../../utilities/PantryAPI";
import PurchasesAPI from "../../utilities/PurchasesAPI";
import Moment from "react-moment";
import moment from "moment";
import PantryTable from "./PantryTable";
import AddPantryItem from "./AddPantryItem";
import CollapsibleItem from "react-materialize/lib/CollapsibleItem";

export default class PantryParent extends Component {
  state = {
    pantry: [],
    purchases: [],
    sort: "frequency",
    update: false,
    label: "",
    updateValue: "",
    open: false
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
    console.log(
      `inside the handlePantryUpdate method, here's the pantryinfo`,
      pantryInfo
    );
    const { id, name } = pantryInfo;
    let value = this.state.pantry.filter(item => item.id === id);
    console.log(`here's the value to update: `, value);

    let value2 = value.map(result => result[columnName]);

    console.log(`here's the value to update: `, value2[0]);

    this.setState({
      update: true,
      label: columnName,
      pantryIdToUpdate: id,
      pantryNameToUpdate: name,
      valueToUpdate: value2[0]
    });
  };

  handlePantryAddition = data => {
    console.log(`Made it to the handlePantryAddition method!`);
    data.UserId = this.props.user.user.id;
    PantryAPI.findOrCreatePantryItem(data).then(res => this.getPantry());
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
    console.log(`value is ${e.target.value}`);
    this.setState({
      updateValue: e.target.value
    });
  };

  handleSubmit = (e, id) => {
    e.preventDefault();
    let value = this.state.updateValue;
    if (
      this.state.label === "frequency" ||
      this.state.label === "shelfLife" ||
      this.state.label === "stock"
    ) {
      value = parseInt(value);
    }
    const data = {
      [this.state.label]: value
    };

    this.setState({
      updateValue: ""
    });

    console.log(
      `inside handle submit, here's what we're sending to the db: req.params.id: ${id} and req.body: `,
      data
    );

    PantryAPI.updatePantryItem(id, data).then(response => {
      console.log(response);
      this.handleModal(e);
      this.getPantry();
    });
  };

  handleModal = e => {
    e.preventDefault();
    this.setState({
      update: !this.state.update
    });
  };

  doneAdding = e => {
    e.preventDefault();
    this.setState({
      open: !this.state.open
    });

    console.log(`done adding. this.state.open is ${this.state.open}`);
  };

  render() {
    // console.log(`inside pantry parent render, here's props: `, this.props);
    return (
      <Container className="center-align">
        <PageHeader>IN THE PANTRY</PageHeader>
        <BackBtn goto="home" />
        <AddPantryItem
          addItem={this.handlePantryAddition}
          doneAdding={this.doneAdding}
          open={this.state.open}
        />
        {this.state.pantry.length > 0 ? (
          <Collapsible className="animate-up-2">
            <CollapsibleItem header={`${this.props.user.user.first}'S PANTRY`}>
              <PantryTable
                pantry={this.state.pantry}
                handleDelete={this.handleDelete}
                handlePantryUpdate={this.handlePantryUpdate}
                getPantry={this.getPantry}
                purchases={this.state.purchases}
              />
            </CollapsibleItem>
          </Collapsible>
        ) : (
          <Card className="rounded animate-up" title="YOUR PANTRY IS EMPTY">
            Add some items now or go shopping.
          </Card>
        )}

        <Modal
          id="pop-up-input"
          header={`Update ${this.state.label} for ${
            this.state.pantryNameToUpdate
          }`}
          open={this.state.update}
          actions={
            <Button className="back-btn" onClick={this.handleModal}>
              Nevermind
            </Button>
          }
        >
          {this.state.label === "stock" ? (
            <Input
              s={12}
              value={this.state.updateValue}
              placeholder={this.state.updateValue}
              label={this.state.label}
              name="stock"
              type="select"
              onChange={this.handleChange}
            >
              <option value="">Choose a Stock Condition</option>
              <option value="3">ENOUGH</option>
              <option value="2">LOW</option>
              <option value="1">OUT</option>
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
        <BottomSpacer />
      </Container>
    );
  }
}

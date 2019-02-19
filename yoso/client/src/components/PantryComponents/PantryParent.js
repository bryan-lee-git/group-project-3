import React, { Component } from "react";
import { Container, Card, Collapsible } from "react-materialize";
import BackBtn from "../BackBtn";
import BottomSpacer from "../BottomSpacer";
import PageHeader from "../PageHeader";
import PantryAPI from "../../utilities/PantryAPI";
import PantryTable from "../PantryTable";
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
  }

  getPantry = sort => {
    const { id } = this.props.user.user;
    if (sort) {
      PantryAPI.getPantry(id, sort).then(response =>
        this.setState({
          pantry: response.data
        })
      );
    } else {
      PantryAPI.getPantry(id, this.state.sort).then(response =>
        this.setState({
          pantry: response.data
        })
      );
    }
  };

  handlePantryAddition = data => {
    console.log(`Made it to the handlePantryAddition method!`);
    data.UserId = this.props.user.user.id;
    PantryAPI.findOrCreatePantryItem(data).then(res => this.getPantry());
  };

  handleSort = e => {
    e.preventDefault();

    console.log(`The column to sort is: ${e.target.dataset.field}`);

    this.getPantry(e.target.dataset.field);
  };

  doneAdding = e => {
    e.preventDefault();
    this.setState({
      open: !this.state.open
    });
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
          <Collapsible>
            <CollapsibleItem header={`${this.props.user.user.first}'S PANTRY`}>
              <PantryTable
                pantry={this.state.pantry}
                getPantry={this.getPantry}
                handleSort={this.handleSort}
              />
            </CollapsibleItem>
          </Collapsible>
        ) : (
          <Card className="rounded animate-up" title="YOUR PANTRY IS EMPTY">
            Add some items now or go shopping.
          </Card>
        )}

        <BottomSpacer />
      </Container>
    );
  }
}

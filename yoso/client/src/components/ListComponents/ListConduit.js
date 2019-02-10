import React, { Component } from "react";
import { Container, Row } from "react-materialize";
import ListSwitch from "./ListSwitch";
import NewList from "./NewList";
import UserLists from "./UserLists";
import ShoppingList from "./ShoppingList";
import ListAPI from "../../utilities/ListAPI";
import BottomSpacer from "../BottomSpacer";
import PantryAPI from "../../utilities/PantryAPI";
import ItemAPI from "../../utilities/ItemAPI";

export default class ListConduit extends Component {

  state = {
    lists: [],
    view: 0
  };

  componentDidMount() {
    this.getLists(this.props.user.id);
  }

  componentWillMount = () => {
    this.deleteYosoList();
  }

  getPantry = () => {
    PantryAPI.getPantry(this.props.user.id, "frequency").then(response => {
      const YOSO = response.data.filter(item => item.stock !== "ENOUGH");
      if (YOSO.length > 0) this.createList(this.props.user.id, YOSO);
    })
  }

  deleteYosoList = () => {
    ListAPI.getYoso(this.props.user.id).then(res => {
      if (res.data[0]) {
        ListAPI.deleteList(this.props.user.id, res.data[0].id).then(() => {
          this.getPantry();
        })
      } else this.getPantry();

    })
  }

  createList = (id, list) => {
    ListAPI.createList(id, {
      name: "YOSO List"
    }).then(response => {
      list.forEach(item => {
        ItemAPI.createItem({
          name: item.name,
          unitSize: 1,
          measurement: "n/a",
          quantity: 1,
          notes: "n/a",
          listId: response.data.id
        });
      });
    });
    this.getLists(this.props.user.id);
  };

  getLists = id => {
    ListAPI.getLists(id).then(res => {
      this.setState({
        lists: res.data,
        id: this.props.user.id,
        first: this.props.user.first
      });
    });
  };

  setShoppingList = (id, view) => {
    this.setState({
      shoppingList: id,
      view: view
    })
  }

  handleSwitch = (e, view) => {
    e.preventDefault();
    this.setState({
      view: view
    });
  };

  render() {
    const { view } = this.state;
    return (
      <Container>
        <Row>
          {view === 0 ? (
            <ListSwitch
              context={this.state}
              handleSwitch={this.handleSwitch}
            />
          ) : view === 1 ? (
            <NewList
              context={this.state}
              handleSwitch={this.handleSwitch}
            />
          ) : view === 2 ? (
            <UserLists
              user={this.props.user}
              context={this.state}
              setShoppingList={this.setShoppingList}
              handleSwitch={this.handleSwitch}
              getLists={this.getLists}
            />
          ) : (
            <ShoppingList 
              user={this.props.user}
              context={this.state}
              handleSwitch={this.handleSwitch}
              list={this.state.shoppingList}
            />
          )}
        </Row>
        <BottomSpacer/>
      </Container>
    );
  }
}

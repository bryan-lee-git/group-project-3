import React, { Component } from "react";
import ShowItems from "../../components/ListComponents/ShowItems";
import PageHeader from "../PageHeader"
import {
  Collapsible,
  Col,
  Row,
  CollapsibleItem,
  Button,
} from "react-materialize";
import ListAPI from "../../utilities/ListAPI";
import ItemAPI from "../../utilities/ItemAPI";
import BackBtn from "../BackBtn";

export default class UserLists extends Component {

  state = {};

  handleDeleteList = (e, userId, listId, cb) => {
    e.preventDefault();
    ListAPI.deleteList(userId, listId).then(() => cb(userId));
  };

  handleDeleteItem = (e, listId, itemId, cb) => {
    e.preventDefault();
    ItemAPI.deleteItem(listId, itemId).then(() => cb());
  };

  componentWillMount = () => {
    this.props.getLists(this.props.user.id);
  }

  render() {
    const lists = this.props.context.lists.map((list, index) => (
      <Collapsible key={index} accordion defaultActiveKey={1} className="rounded z-depth-5 animate-up-2">
        <CollapsibleItem header={list.name} className="rounded">
          <ShowItems
            key={list.id}
            listId={list.id}
            user={this.props.user}
            name={list.name}
            currentList={list.lists}
            handleEditItem={this.handleEditItem}
            handleDeleteItem={this.handleDeleteItem}
          />
          <Row>
            <Col s={12} l={4}>
              <Button
                onClick={() => this.props.setShoppingList(list.id, 3)}
                className="list-btn"
              >SHOP</Button>
            </Col>
            <Col s={12} l={4}>
              <Button
                className="list-btn"
              >SHARE</Button>
            </Col>
            <Col s={12} l={4}>
              <Button
                className="list-btn"
                onClick={e =>
                  this.handleDeleteList(
                    e,
                    this.props.user.id,
                    list.id,
                    this.props.getLists
                  )
                }
              >DELETE</Button>
            </Col>
          </Row>
        </CollapsibleItem>
      </Collapsible>
    ));
    return (
      <div className="center-align">
        <PageHeader>
          {this.props.context.first.toUpperCase()}'S LISTS
        </PageHeader>
        <BackBtn
          goto="/lists"
          handleSwitch={this.props.handleSwitch}
          page={0}
        />
        {lists}
      </div>
    );
  }
}

import React, {Component} from 'react';
import ItemAPI from "../../utilities/ItemAPI";
import BackBtn from "../BackBtn";
import moment from "moment";
import ListAPI from "../../utilities/ListAPI";
import PurchasesAPI from "../../utilities/PurchasesAPI";
import PantryAPI from "../../utilities/PantryAPI";
import {
  Col,
  Card,
  Row,
  Table,
  Button,
  Input,
  Icon,
  Modal
} from "react-materialize";

export default class ShoppingList extends Component {

  state = {
    cart: []
  }

  handleChange = (e, itemName) => {
    const { name, value } = e.target;
    this.setState({[name]: value})
    const listItems = this.state.items;
    listItems.forEach(item => {
      if (item.name === itemName) {
        item.expiration = moment(this.state.expiration).format("MM/DD/YYYY");
        item.price = this.state.price;
      }
    })
    this.setState({items: listItems});
  };

  getItems = id => {
      ItemAPI.getItems(id).then(res => {
        this.setState({
          items: res.data
        });
      });
  }

  toggleCartItems = index => {
    let { items, cart } = this.state;
    if (items[index].purchased) {
      items[index].purchased = false;
      cart.forEach((item, i) => {
        if (item.name === items[index].name) {
          cart.splice(i, 1);
        };
      });
    } else {
      items[index].purchased = true;
      cart.push(items[index]);
    };
    this.setState({items: items, cart: cart});
  };

  endShopping = (e, userId) => {
    this.state.cart.forEach((item, index) => {
      const pantryItem = {
        name: item.name,
        stock: "ENOUGH",
        UserId: userId
      }
      PantryAPI.findOrCreatePantryItem(pantryItem).then(res => {
        const purchasedItem = {
          unitSize: item.unitSize,
          measurement: item.measurement,
          quantity: item.quantity,
          expiration: item.expiration,
          unitPrice: item.price,
          location: this.state.location,
          ordinal: (index + 1),
          PantryId: res.data[0].id
        }
        PurchasesAPI.createPurchase(purchasedItem).then(() => {
          this.props.handleSwitch(e, 2);
        });
      })
    })
  }

  endAndDelete = (e, userId, listId) => {
    ListAPI.deleteList(userId, listId);
    this.endShopping(e, userId);
  }

  componentDidMount = () => {
    this.getItems(this.props.list);
  }

  render() {
    return(
      <div className="center-align">
      <br />
      <br />
        <BackBtn goto="/lists" page={2} handleSwitch={this.props.handleSwitch} />
        <Card className="z-depth-5 rounded animate-up">
          <h4>Click the <Icon>check_circle</Icon> to Add or Remove from Cart</h4>
          <Input
            className="center-align"
            s={12}
            type="text"
            placeholder="What store are you shopping at?"
            name="location"
            onChange={e => this.handleChange(e)}
          />
          <Row>
            {this.state.items ? (
              <Table className="striped highlight centered responsive-table">
                <thead>
                  <tr>
                    <th>Purchase</th>
                    <th>Name</th>
                    <th>Unit Size</th>
                    <th>Measurement</th>
                    <th>Quantity</th>
                    <th>Notes</th>
                    <th>Expiration</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.items.map((item, index) => (
                    <tr key={index} className={item.purchased ? "strikethrough" : ""}>
                      <td onClick={() => this.toggleCartItems(index)}><Icon>check_circle</Icon></td>
                      <td>{item.name}</td>
                      <td>{item.unitSize}</td>
                      <td>{item.measurement}</td>
                      <td>{item.quantity}</td>
                      <td>{item.notes}</td>
                      <td>
                        <Input
                          s={12}
                          className="center-align"
                          type="date"
                          placeholder="Expiration"
                          name="expiration"
                          onChange={e => this.handleChange(e, item.name)}
                        />
                      </td>
                      <td>
                        <Input
                          s={12}
                          className="center-align"
                          type="number"
                          placeholder="Price"
                          name="price"
                          onChange={e => this.handleChange(e, item.name)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <h2>No Items In This List</h2>
            )}
          </Row>
        </Card>
        <Row>
          <Col s={12}>
          <Modal trigger={
            <Button className="btn-large animate-up-3 end-shop-btn">DONE SHOPPING</Button>
          }>
          <Row>
            <Col s={12}>
              <h4 className="center-align">NICE JOB! NOW CHOOSE AN OPTION BELOW.</h4>
            </Col>
          </Row>
          <Row>
            <Col s={6}>
              <Button onClick={e => this.endShopping(e, this.props.user.id)} className="btn-large end-shop-btn">END + SAVE</Button>
            </Col>
            <Col s={6}>
              <Button onClick={e => this.endAndDelete(e, this.props.user.id, this.props.list)} className="btn-large end-shop-btn">END + DELETE</Button>
            </Col>
          </Row>
          </Modal>
          </Col>
        </Row>
      </div>
    )
  }
}
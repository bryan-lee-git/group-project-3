import React, { Component } from "react";
import { Icon, Table, Button, Collapsible, Row } from "react-materialize";
import PurchasesAPI from "../utilities/PurchasesAPI";
import moment from "moment";

export default class ImbedPurchases extends Component {
  state = { open: false, purchases: [] };
  getStyle = () => {
    return this.state.open
      ? {
          position: "absolute",
          bottom: "100%",
          left: "100%",
          display: "block",
          backgroundColor: "white"
        }
      : { display: "none", position: "absolute" };
  };
  getPurchases = () => {
    const id = this.props.CellId.slice(this.props.CellId.search("-") + 1);
    console.log(`id going to db is ${id} `);
    PurchasesAPI.getPurchases(id).then(res =>
      this.setState({
        purchases: res.data
      })
    );
  };
  handleClick = e => {
    e.preventDefault();
    this.setState({
      open: !this.state.open
    });
    this.getPurchases();
  };
  render() {
    return (
      <React.Fragment>
        <div onClick={this.handleClick}>
          <Icon>list_alt</Icon>
        </div>

        <Row>
          <div style={{ position: "relative" }}>
            <div style={this.getStyle()}>
              <Table
                s={12}
                centered={true}
                responsive={true}
                bordered={true}
                striped
              >
                <thead>
                  <caption>{this.props.itemName}</caption>
                  <tr>
                    <th>Date</th>
                    <th>Expiration Date</th>
                    <th>Measurement</th>
                    <th>Quantity</th>
                    <th>Unit Size</th>

                    <th>Price</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.purchases.map((item, index) => (
                    <tr key={index}>
                      <td>{moment(item.createdAt).format("MM-DD-YYYY")}</td>
                      <td>{item.expiration}</td>
                      <td>{item.measurement}</td>
                      <td>{item.quantity}</td>
                      <td>{item.unitSize}</td>
                      <td>{item.price}</td>
                      <td>{item.location}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </Row>
      </React.Fragment>
    );
  }
}

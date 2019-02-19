import React, { Component } from "react";
import { Icon, Table, Row } from "react-materialize";
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
          backgroundColor: "white",
          padding: 20,
          zIndex: "10",
          borderRadius: "10px",
          borderSpacing: 5,
          border: "2px solid #00bf0d"
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
        {!this.state.open ? (
          <div onClick={this.handleClick}>
            <Icon>list_alt</Icon>
          </div>
        ) : (
          <div onClick={this.handleClick}>
            <Icon>clear</Icon>
          </div>
        )}

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
                <caption>{this.props.itemName}</caption>
                <thead>
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
                  {this.state.purchases.map(item => (
                    <tr>
                      <td>{moment(item.createdAt).format("MM/DD/YYYY")}</td>
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

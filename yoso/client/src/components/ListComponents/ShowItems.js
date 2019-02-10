import React, { Component } from "react";
import { Card, Row, Col, Table, Icon, Input, Modal } from "react-materialize";
import ItemAPI from "../../utilities/ItemAPI";
const measurements = ["Pack", "Ounce(s)", "Pound(s)", "Feet", "Liter(s)", "Can(s)", "Bottle(s)", "Package(s)", "Carton(s)", "Loaf(s)", "Box(es)", "Bunch(es)", "Gallon(s)", "Quart(s)", "Pint(s)", "Case(s)", "Dozen", "Bag(s)", "Single(s)", "Jar(s)", "Piece(s)", "Container(s)", "Unit(s)"];


class ShowItems extends Component {

  state = {};

  getItems = () => {
    ItemAPI.getItems(this.props.listId).then(res => {
      this.setState({ items: res.data });
    });
  }

  handleUpdateItem = (e, itemId) => {
    e.preventDefault();
    const itemsList = this.state.items;
    itemsList.forEach(item => {
      if (item.id === itemId) {
        ItemAPI.updateItem(this.props.listId, item.id, item);
        item.saved = true;
        this.setState({items: itemsList})
      }
    });
  };

  handleNameChange = (e, itemId) => {
    const value = e.target.value;
    const capName = value.replace(
      value.charAt(0),
      value.charAt(0).toUpperCase()
    );
    const itemsList = this.state.items;
    itemsList.forEach(item => {
      if (item.id === itemId) {
        item.name = capName;
        item.changed = true;
        item.saved = false
        this.setState({items: itemsList});
      }
    })
  };

  handleUnitSizeChange = (e, itemId) => {
    const value = e.target.value;
    const itemsList = this.state.items;
    itemsList.forEach(item => {
      if (item.id === itemId) {
        item.unitSize = value;
        item.changed = true;
        item.saved = false
        this.setState({items: itemsList});
      }
    })
  };

  handleMeasurementChange = (e, itemId) => {
    const { value } = e.target;
    const itemsList = this.state.items;
    itemsList.forEach(item => {
      if (item.id === itemId) {
        item.measurement = value;
        item.changed = true;
        item.saved = false;
        this.setState({items: itemsList});
      }
    })
  };

  handleQuantityChange = (e, itemId) => {
    const { value } = e.target;
    const itemsList = this.state.items;
    itemsList.forEach(item => {
      if (item.id === itemId) {
        item.quantity = value;
        item.changed = true;
        item.saved = false;
        this.setState({items: itemsList});
      }
    })
  };

  handleNotesChange = (e, itemId) => {
    const { value } = e.target;
    const itemsList = this.state.items;
    itemsList.forEach(item => {
      if (item.id === itemId) {
        item.notes = value;
        item.changed = true;
        item.saved = false;
        this.setState({items: itemsList});
      }
    })
  };

  componentDidMount = () => {
    this.getItems();
  }

  render() {
    return (
      <div>
        <Row>
          <Col s={12}>
            <Card className="rounded">
              <Row>
                <h2>{this.props.name}</h2>
                {this.state.items ? (
                  <Table className="striped highlight centered responsive-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Unit Size</th>
                        <th>Measurement</th>
                        <th>Quantity</th>
                        <th>Notes</th>
                        <th>Save</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.items.map((item, index) => (
                        <tr key={item.id}>
                          <td>
                            <Input
                              defaultValue={item.name}
                              onChange={e => {this.handleNameChange(e, item.id)}}
                            />
                          </td>
                          <td>
                            <Input
                              defaultValue={item.unitSize}
                              onChange={e => {this.handleUnitSizeChange(e, item.id)}}
                            />
                          </td>
                          <td>
                            <Input
                              type="select"
                              defaultValue={item.measurement}
                              name="measurement"
                              onChange={e => {this.handleMeasurementChange(e, item.id)}}
                            >
                              { measurements.map((measurement, index) => (<option key={index} value={measurement}>{measurement}</option>)) }               
                            </Input>
                          </td>
                          <td>
                            <Input
                              defaultValue={item.quantity}
                              onChange={e => {this.handleQuantityChange(e, item.id)}}
                            />
                          </td>
                          <td>
                            <Modal
                              className="center-align"
                              header={item.name + " Notes"}
                              trigger={<span><Icon>assignment</Icon></span>}>
                              <p>
                                <Input
                                  defaultValue = {item.notes}
                                  onChange={e => {this.handleNotesChange(e, item.id)}}
                                />
                              </p>
                            </Modal>
                          </td>
                          <td onClick={e => {this.handleUpdateItem(e, item.id)}}>
                            <Icon className={this.state.items[index].changed === true && !this.state.items[index].saved ? "red-text" : "green-text"} >save</Icon>
                          </td>
                          <td onClick={e => {this.props.handleDeleteItem(e, this.props.listId, item.id, this.getItems)}}>
                            <Icon data-index={index}>delete_forever</Icon>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <div>No Items Added to Your List Yet</div>
                )}
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ShowItems;

import React from "react";
import { Col, Card, Row, Button, Table, Icon } from "react-materialize";

export default props => {
  return (
    <React.Fragment>
      <Col s={12}>
        <Card className="animate-up-3 z-depth-5 rounded">
          <Row>
            {props.state.items.length > 0 ? (
              <Table className="striped highlight centered responsive-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Unit Size</th>
                    <th>Measurement</th>
                    <th>Quantity</th>
                    <th>Notes</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {props.state.items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.unitSize}</td>
                      <td>{item.measurement}</td>
                      <td>{item.quantity}</td>
                      <td>{item.notes}</td>
                      <td onClick={event => this.handleRemoveItem(event)}>
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
      <Col s={12}>
        <Button
          id="save-list"
          className="btn btn-large animate-up-4"
          onClick={e => props.createList(e, props.userId)}
        >
          Save List
        </Button>
      </Col>
    </React.Fragment>
  );
};

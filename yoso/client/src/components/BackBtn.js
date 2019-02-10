import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, Icon } from "react-materialize";

export default props => {
  const { goto, page, handleSwitch } = props;
  return (
    <Row className="animate-down">
      <Col s={12}>
        {handleSwitch ? (
          <Link to={goto} onClick={e => handleSwitch(e, page)}>
            <Button className="back-btn btn-large">
              <Icon>arrow_back</Icon>
            </Button>
          </Link>
        ) : (
          <Link to={goto}>
            <Button className="back-btn btn-large">
              <Icon>arrow_back</Icon>
            </Button>
          </Link>
        )}
      </Col>
    </Row>
  );
};

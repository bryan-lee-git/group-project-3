import React from "react";
import { Container, Row, Col, Card, } from "react-materialize";
import LogoRow from "../../components/LogoRow";
import BottomSpacer from "../../components/BottomSpacer";

const About = () => {
  return (
    <Container className="center-align">
      <LogoRow />
      <Row>
        <Col className="animate-up" s={12} m={12} l={4}>
          <Card className="z-depth-4 about-card" id="what-card">
            <h3 className="card-header-text">What?</h3>
            <p>
              Its a smart grocery shopping assistant that...
              <br />
              <br />
              Helps you quickly create, store, and share your grocery lists and
              sort by store.
              <br />
              <br />
              Learns and proactively adds items to your list based upon when you
              last shopped and how long items last.
              <br />
              <br />
              Keeps track of expiration dates to help you use the food you
              already have and reduce waste.
            </p>
            <br />
          </Card>
        </Col>
        <Col className="animate-up-2" s={12} m={12} l={4}>
          <Card className="z-depth-4 about-card" id="why-card">
            <h3 className="card-header-text">Why?</h3>
            <p>
              Ever had a craving, gone to your fridge to fix yourself a nice
              meal, and then realized that the ingredients you needed had
              expired?
              <br />
              <br />
              Ever forgot to check if you needed toilet paper and then had to go
              back to the store?
              <br />
              <br />
              Ever felt like an absolute dummy for having to throw away food you
              forgot to use to before it expired?
              <br />
              <br />
              We have. <strong>That's why.</strong>
            </p>
          </Card>
        </Col>
        <Col className="animate-up-3" s={12} m={12} l={4}>
          <Card className="z-depth-4 about-card" id="dev-card">
            <h3 className="card-header-text">Who?</h3>
            <Row>
              <Col s={12}>
                <h5>Panda Warriors DG...</h5>
              </Col>
            </Row>
            <br />
            <Row>
              <Col s={3}>
                <strong>
                  <p>
                    Bryan
                    <br />
                    Lee
                  </p>
                </strong>
              </Col>
              <Col s={3}>
                <img alt="github logo" width="49px" src="./img/github.png" />
              </Col>
              <Col s={3}>
                <strong>
                  <p>
                    Eric
                    <br />
                    Bishop
                  </p>
                </strong>
              </Col>
              <Col s={3}>
                <img alt="github logo" width="49px" src="./img/github.png" />
              </Col>
            </Row>
            <Row>
              <Col s={3}>
                <strong>
                  <p>
                    Jim
                    <br />
                    Schlader
                  </p>
                </strong>
              </Col>
              <Col s={3}>
                <img alt="github logo" width="49px" src="./img/github.png" />
              </Col>
              <Col s={3}>
                <strong>
                  <p>
                    Bronson
                    <br />
                    Bird
                  </p>
                </strong>
              </Col>
              <Col s={3}>
                <img alt="github logo" width="49px" src="./img/github.png" />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <BottomSpacer/>
    </Container>
  );
};

export default About;

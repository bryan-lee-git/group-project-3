import React, { Component } from "react";
import { Container, Col, Row, Button } from "react-materialize";
import { Link } from "react-router-dom";
import BottomSpacer from "../components/BottomSpacer";
import LogoRow from "../components/LogoRow";
import DailyUpdateLive from "../utilities/DailyUpdateLive";
import PantryAPI from "../utilities/PantryAPI";

class Home extends Component {
  componentDidMount() {
    console.log(
      `From componentdidmount of Home page, UserContext id = ${
        this.props.context.user.id
      } and this.props.context.user.update = ${this.props.context.user.updated}`
    );
    if (!this.props.context.user.updated) {
      PantryAPI.getPantry(this.props.context.user.id, "frequency").then(res => {
        console.log(`here's what's coming back from the db: `, res.data);
        DailyUpdateLive(res.data).then(after => {
          console.log(`after dailyupdate, we have...`, after);
          console.log(`updated is ${this.props.context.user.updated}`);
          this.props.context.dailyUpdateStatus();
        });
      });
    }
  }
  render() {
    const { context } = this.props;
    return (
      <Container>
        <LogoRow />
        <Row>
          <Col s={12} className="center-align white-text name-header">
            <h4>GET YOUR SHOP TOGETHER, {context.user.first.toUpperCase()}!</h4>
          </Col>
        </Row>
        <br />
        <Row>
          <Col s={6} m={4} l={2}>
            <Link to="/lists">
              <Button
                id="home-list"
                className="animate-up home-btn z-depth-5 btn-large"
              >
                LISTS
              </Button>
            </Link>
          </Col>
          <Col s={6} m={4} l={2}>
            <Link to="/pantry">
              <Button
                id="home-pantry"
                className="animate-up-2 home-btn z-depth-5 btn-large"
              >
                PANTRY
              </Button>
            </Link>
          </Col>
          <Col s={6} m={4} l={2}>
            <Link to="/waste">
              <Button
                id="home-waste"
                className="animate-up-3 home-btn z-depth-5 btn-large"
              >
                WASTE
              </Button>
            </Link>
          </Col>
          <Col s={6} m={4} l={2}>
            <Link to="/recipes">
              <Button
                id="home-recipes"
                className="animate-up-4 home-btn z-depth-5 btn-large"
              >
                RECIPES
              </Button>
            </Link>
          </Col>
          <Col s={6} m={4} l={2}>
            <Link to="/account">
              <Button
                id="home-account"
                className="animate-up-5 home-btn z-depth-5 btn-large"
              >
                ACCOUNT
              </Button>
            </Link>
          </Col>
          <Col s={6} m={4} l={2}>
            <Button
              id="home-logout"
              onClick={() => {
                context.logOut();
              }}
              className="animate-up-6 home-btn z-depth-5 btn-large"
            >
              LOGOUT
            </Button>
          </Col>
        </Row>
        <BottomSpacer />
      </Container>
    );
  }
}

export default Home;

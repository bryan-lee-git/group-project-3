import React, { Component } from "react";
import WasteItem from "../../components/WasteComponents/WasteItem";
import PageHeader from "../../components/PageHeader";
import { Container, Row, Col } from "react-materialize";
import BackBtn from "../../components/BackBtn";
import { UserContext } from "../../App";
import BottomSpacer from "../../components/BottomSpacer";

class Waste extends Component {
  render() {
    return (
      <UserContext.Consumer>
        {userContext => {
          console.log(`inside waste, here's the context: `, userContext);
          return (
            <Container className="center-align">
              <PageHeader>WASTE LESS!</PageHeader>
              <BackBtn goto="/home" />
              <WasteItem context={userContext} />
              <BottomSpacer/>
            </Container>
          );
        }}
      </UserContext.Consumer>
    );
  }
}

export default Waste;

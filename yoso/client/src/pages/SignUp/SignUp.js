import React, { Component } from 'react';
import { Redirect } from "react-router-dom"
import { Container, Row, Col, Input, Icon, Card } from 'react-materialize';
import PageHeader from "../../components/PageHeader";
import BottomSpacer from "../../components/BottomSpacer";

class SignUp extends Component {

  state = {
    redirect: false
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({[name]: value});
  };

  handleRedirect = () => {
    this.setState({redirect: true});
  }

  handleSignUp = e => {
    e.preventDefault();
    this.props.signUp(this.state, this.handleRedirect)
  }

  render() {

    if (this.state.redirect) {
      return (
        <Redirect to={`/home`} />
      )
    }

    return (
      <Container className="center-align">
        <PageHeader>NEW ACCOUNT</PageHeader>
        <form>
          <Card id="signup-form" className="rounded animate-up z-depth-4">
            <Row>
              <Col s={12}>
                <Input s={12} l={6} onChange={this.handleInputChange} type="text" label="First Name" name="first" validate></Input>
                <Input s={12} l={6} onChange={this.handleInputChange} type="text" label="Last Name" name="last" validate></Input>
              </Col>
            </Row>
            <Row>
              <Col s={12}>
                <Input s={12} l={6} onChange={this.handleInputChange} offset="s3" type="text" label="Street Address" name="street" validate></Input>
                <Input s={12} l={6} onChange={this.handleInputChange} offset="s3" type="text" label="City" name="city" validate></Input>
              </Col>
            </Row>
            <Row>
              <Col s={12}>
                <Input s={12} l={6} onChange={this.handleInputChange} offset="s3" type="text" label="State" name="state" validate></Input>
                <Input s={12} l={6} onChange={this.handleInputChange} offset="s3" type="number" label="Zip Code" name="zip" validate></Input>
              </Col>
            </Row>
            <Row>
              <Col s={12} l={6}><Input s={12} onChange={this.handleInputChange} label="Email" type="email" name="email" validate><Icon>email</Icon></Input></Col>
              <Col s={12} l={6}><Input s={12} onChange={this.handleInputChange} label="Password" type="password" name="password" validate><Icon>lock</Icon></Input></Col>
            </Row>
            <Row>
            {this.state.first && this.state.last && this.state.street && this.state.city && this.state.state && this.state.zip && this.state.email && this.state.password
              ? <Col s={12}><Input s={12} onClick={this.handleSignUp} className="signup-btn btn btn-large" type="submit"></Input></Col> 
              : <Col s={12}><Input s={12} onClick={this.handleSignUp} className="signup-btn btn btn-large" type="submit" disabled></Input></Col>
            }
            </Row>
          </Card>  
        </form>
        <BottomSpacer/>
      </Container>
    );
  }
}

export default SignUp;
import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Input,
  Icon,
  Card,
  Button
} from "react-materialize";
import PageHeader from "../../components/PageHeader";

class SignIn extends Component {
  state = {
    redirect: false
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  handleSignIn = e => {
    e.preventDefault();
    this.props.signIn(this.state, this.handleRedirect);
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={`/home`} />;
    }
    return (
      <Container className="center-align">
        <Container>
          <PageHeader>SIGN IN</PageHeader>
          <form>
            <Container>
              <Card id="signin-form" className="rounded animate-up z-depth-4">
                <h5 className="fade-in">ENTER A VALID EMAIL AND PASSWORD</h5>
                <br />
                <Row>
                  <Col s={12}>
                    <Input
                      s={12}
                      onChange={this.handleInputChange}
                      label="Email"
                      type="email"
                      name="email"
                      validate>
                      <Icon>email</Icon>
                    </Input>
                  </Col>
                  <Col s={12}>
                    <Input
                      s={12}
                      onChange={this.handleInputChange}
                      label="Password"
                      type="password"
                      name="password"
                      validate>
                      <Icon>lock</Icon>
                    </Input>
                  </Col>
                </Row>
                <Row>
                  {this.state.email && this.state.password ? (
                    <div>
                      <Col s={6}>
                        <Button
                          s={12}
                          onClick={this.handleSignIn}
                          className="signin-btn btn btn-large"
                        >SIGN IN</Button>
                      </Col>
                      <Col s={6}>
                        <Link to={this.props.signUpPath}>
                          <Button className="signin-btn btn btn-large">
                            SIGN UP
                          </Button>
                        </Link>
                      </Col>
                    </div>
                  ) : (
                    <div>
                      <Col s={6}>
                        <Button
                          s={12}
                          onClick={this.handleSignIn}
                          className="signin-btn btn btn-large"
                          disabled
                        >SIGN IN</Button>
                      </Col>
                      <Col s={6}>
                        <Link to={this.props.signUpPath}>
                          <Button className="signin-btn btn btn-large">
                            SIGN UP
                          </Button>
                        </Link>
                      </Col>
                    </div>
                  )}
                </Row>
              </Card>
            </Container>
          </form>
        </Container>
      </Container>
    );
  }
}

export default SignIn;

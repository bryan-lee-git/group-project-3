import React from 'react';
import { Container, Row, Col, Button } from 'react-materialize';
import { Link } from "react-router-dom";
import LogoRow from "../../components/LogoRow"
import BottomSpacer from "../../components/BottomSpacer";

const Landing = () => {
    return (
        <Container className="center-align">
            <LogoRow/>
            <Row>
                <Col className="animate-up" s={6} l={4}>
                    <Link to="/about"><Button id="home-learn" className="home-btn z-depth-5 btn-large">YOSO?</Button></Link>
                </Col>
                <Col className="animate-up-2" s={6} l={4}>
                    <Link to="/signin"><Button id="home-login" className="home-btn z-depth-5 btn-large">SIGN IN</Button></Link>
                </Col>
                <Col className="animate-up-3" s={12} l={4}>
                    <Link to="/signup"><Button id="home-signup" className="home-btn z-depth-5 btn-large">SIGN UP</Button></Link>
                </Col>
            </Row>
            <BottomSpacer />
        </Container>
    );
}

export default Landing;
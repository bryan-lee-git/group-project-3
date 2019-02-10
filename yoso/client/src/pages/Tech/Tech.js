import React from 'react';
import PageHeader from "../../components/PageHeader";
import BottomSpacer from "../../components/BottomSpacer";
import { Container, Row, Col, Card } from "react-materialize";

const Tech = () => {
    return (
        <Container className="center-align">
            <PageHeader>TECH USED</PageHeader>
            <Row className="animate-up">
                <Col s={2} offset="s1">
                    <a rel="noopener noreferrer" target="_blank" href="https://nodejs.org/en/">
                        <Card className="rounded">
                            <img width="100%" src="./img/tech-icons/node.png" alt="Node JS"></img>
                            <p>Node JS</p>
                        </Card>
                    </a>
                </Col>
                <Col s={2}>
                    <a rel="noopener noreferrer" target="_blank" href="https://reactjs.org/">
                        <Card className="rounded">
                            <img width="100%" src="./img/tech-icons/react.png" alt="React"></img>
                            <p>React</p>
                        </Card>
                    </a>
                </Col>
                <Col s={2}>
                    <a rel="noopener noreferrer" target="_blank" href="https://react-materialize.github.io/#/">
                        <Card className="rounded">
                            <img width="100%" src="./img/tech-icons/react-materialize.svg" alt="React Materialize"></img>
                            <p>Materialize</p>
                        </Card>
                    </a>
                </Col>
                <Col s={2}>
                    <a rel="noopener noreferrer" target="_blank" href="https://react-table.js.org/#/story/readme">
                        <Card className="rounded">
                            <img width="100%" src="./img/tech-icons/react-table.png" alt="React Table"></img>
                            <p>React Table</p>
                        </Card>
                    </a>
                </Col>
                <Col s={2}>
                    <a rel="noopener noreferrer" target="_blank" href="https://expressjs.com/">
                        <Card className="rounded">
                            <img width="100%" src="./img/tech-icons/express.png" alt="Express"></img>
                            <p>Express</p>
                        </Card>
                    </a>
                </Col>
            </Row>
            <Row className="animate-up-2">
                <Col s={2} offset="s1">
                    <a rel="noopener noreferrer" target="_blank" href="https://material.io/tools/icons/?style=baseline">
                        <Card className="rounded">
                            <img width="100%" src="./img/tech-icons/material-design.png" alt="Material Icons"></img>
                            <p>Material Icons</p>
                        </Card>
                    </a>
                </Col>
                <Col s={2}>
                    <a rel="noopener noreferrer" target="_blank" href="http://docs.sequelizejs.com/">
                        <Card className="rounded">
                            <img width="100%" src="./img/tech-icons/sequelize.png" alt="Sequelize"></img>
                            <p>Sequelize</p>
                        </Card>
                    </a>
                </Col>
                <Col s={2}>
                    <a rel="noopener noreferrer" target="_blank" href="https://www.mysql.com/">
                        <Card className="rounded">
                            <img width="100%" src="./img/tech-icons/mysql.png" alt="MySQL"></img>
                            <p>MySQL</p>
                        </Card>
                    </a>
                </Col>
                <Col s={2}>
                    <a rel="noopener noreferrer" target="_blank" href="https://momentjs.com/">
                        <Card className="rounded">
                            <img width="100%" src="./img/tech-icons/moment.png" alt="Moment JS"></img>
                            <p>Moment JS</p>
                        </Card>
                    </a>
                </Col>
                <Col s={2}>
                    <a rel="noopener noreferrer" target="_blank" href="https://developer.yummly.com/">
                        <Card className="rounded">
                            <img width="100%" src="./img/tech-icons/yummly.jpg" alt="Yummly"></img>
                            <p>Yummly API</p>
                        </Card>
                    </a>
                </Col>
            </Row>
            <Row className="animate-up-3">
                <h4 className="white-text">Other Tech:<br/>Axios, React Context, React Router, Bcrypt</h4>
            </Row>
            <BottomSpacer/>
        </Container>
    );
}

// Node, React, React Materialize, React Table, Sequelize, Express, Yummly API, MySQL, Material Design, Moment
// Other: Axios, React Context, React Router, Bcrypt

export default Tech;

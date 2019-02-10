import React from "react";
import { Card, Row, Col, CardTitle, Button, Modal, Input } from "react-materialize";


const Recipe = props => {
    
    return (
        <div>
            <Col l={6} m={6} s={12}>
                <Card
                    className="recipe-card rounded z-depth-5"
                    horizontal
                    header={<CardTitle image={props.img} />}
                >
                    <h5>{props.title}</h5>
                    <br /><br />
                    <Row>
                        <Col s={6}>
                            <a href={props.link} target="blank"><Button className="recipe-btn">Recipe</Button></a>
                        </Col>
                        <Col s={6}>
                            <Modal
                                header='Add Ingredients to a List'
                                trigger={<Button className="recipe-btn">Add</Button>}>
                                <ul>
                                    {props.ingredients.map((ingredient) => (
                                        <li>{ingredient}</li>
                                    ))}
                                </ul>
                                <h4>Add to...</h4>
                                <Row>
                                    <Input s={12} type='select' label="Materialize Select" defaultValue='2' onChange={(event)=>{
                                        event.preventDefault()
                                        props.setIngredientsToState(parseInt(event.target.value), props.recipeIndex)
                                    }}>
                                        {props.lists.map((list) => (
                                            <option value={list.id} name={list.name}>{list.name}</option>
                                        ))}
                                    </Input>
                                </Row>
                                <Button id="confirm-btn" className="btn modal-action modal-close" onClick={props.addIngredientsToList}>Confirm</Button>
                            </Modal>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </div>
    );
};

export default Recipe;

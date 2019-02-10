import React from "react";
import { Row, Input, Button, Col } from "react-materialize";


const RecipeSearch = (props) => {

    return (
        <form>
            <Row>
                <Input s={12} l={9} onChange={props.handleInputChange} label="Search Recipes" type="text" name="query" />
                <Col s={12} l={3}>
                    <Button onClick={props.handleFormSubmit} className="btn-large btn btn-primary search-btn">
                        Search
                    </Button>
                </Col>
            </Row>
        </form>
    )
};

export default RecipeSearch;
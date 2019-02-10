import React, { Component } from "react";
import Recipe from "./Recipe";
import { Container, Row, Card } from "react-materialize";
import Yummly from "../../utilities/RecipeAPI";
import RecipeSearch from "./RecipeSearch";
import BackBtn from "../BackBtn";
import BottomSpacer from "../BottomSpacer";
import PageHeader from "../PageHeader";
import ListAPI from "../../utilities/ListAPI";
import ItemAPI from "../../utilities/ItemAPI";

class RecipeContain extends Component {

  state = {
    query: "",
    response: "",
    errMsg: "Search for a recipe!",
    lists: [],
    selectedListId: "",
    selectedRecipeIngredients: []
  };

  componentDidMount() {
    this.getLists(this.props.user.id);
  }

  getLists = id => {
    ListAPI.getLists(id).then(res => {
      this.setState({ lists: res.data });
    });
  };



  setIngredientsToState = (listId, recipeIndex) => {

    var recipeObj = this.state.response.filter((recipe, index) => {
      return index === recipeIndex;
    })[0]
    this.setState({
      selectedListId: listId,
      selectedRecipeIngredients: recipeObj.ingredients
    })
  }

  addIngredientsToList = () => {
    const listId = this.state.selectedListId;
    this.state.selectedRecipeIngredients.forEach((ingredient) => {
      ItemAPI.createItem({
        name: ingredient,
        unitSize: 1,
        measurement: "N/A",
        quantity: 1,
        notes: "",
        listId: listId 
      })
    })
  }

  findRecipes = () => {
    Yummly.getRecipes(this.state.query)
      .then(res => {
        this.setState({ response: res.data.matches });
      })
      .catch(err => {
        if (err) {
          this.setState({ errMsg: "No results. Please try again!" });
        }
      });
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    this.findRecipes(this.state.query);
  };

  render() {
    return (
      <Container className="center-align">
        <PageHeader>FIND RECIPES</PageHeader>
        <BackBtn goto="/home"/>
        <Card className="rounded z-depth-5 animate-up">
          <RecipeSearch
            handleInputChange={this.handleInputChange}
            handleFormSubmit={this.handleFormSubmit}
          />
        </Card>
        {this.state.response ? (
          <Row className="animate-up-2">
            {this.state.response.map((recipe, index) => (
              <Recipe
                key={index}
                recipeIndex={index}
                title={recipe.recipeName}
                ingredients={recipe.ingredients}
                img={recipe.smallImageUrls[0]}
                link={`https://www.yummly.com/recipe/${recipe.id}`}
                lists={this.state.lists}
                setIngredientsToState={this.setIngredientsToState}
                addIngredientsToList={this.addIngredientsToList}
              />
            ))}
          </Row>
        ) : (
          <div></div>
        )}
        <BottomSpacer/>
      </Container>
    );
  }
}

export default RecipeContain;

import React from "react";

import { UserContext } from "../../App";
import RecipeContain from "../../components/RecipeComponents/RecipeContain";

const RecipePage = () => (
  <UserContext.Consumer>
    {context => {
      return <RecipeContain user={context.user} />;
    }}
  </UserContext.Consumer>
);

export default RecipePage;
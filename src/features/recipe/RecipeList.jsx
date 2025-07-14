import styled, { css } from "styled-components";
import RecipeListItem from "./RecipeListItem";
import { respond } from "../../styles/mixins";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useRecipes } from "../../contexts/RecipesProvider";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;

  ${respond.tabPort(css`
    grid-template-columns: repeat(2, 1fr);
  `)}
  ${respond.phone(css`
    grid-template-columns: 1fr;
  `)}
`;

function RecipeList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { recipesToView, provideRecipes } = useRecipes();
  const searchQuery = searchParams.get("searchQuery");
  const searchBy = searchParams.get("searchBy");
  const page = searchParams.get("page");

  useEffect(
    function () {
      // recipesToView will update after this
      provideRecipes({ searchQuery, searchBy, pageFromUrl: page });
    },
    [searchQuery, searchBy, page]
  );

  return recipesToView.length === 0 ? (
    <p>No recipes :\</p>
  ) : (
    <Grid>
      {recipesToView.map((recipe) => (
        <RecipeListItem key={recipe.id} recipe={recipe} />
      ))}
    </Grid>
  );
}

export default RecipeList;

import styled, { css } from "styled-components";
import RecipeListItem from "./RecipeListItem";
import { respond } from "../../styles/mixins";

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
  return (
    <Grid>
      <RecipeListItem />
      <RecipeListItem />
      <RecipeListItem />
      <RecipeListItem />
      <RecipeListItem />
      <RecipeListItem />
    </Grid>
  );
}

export default RecipeList;

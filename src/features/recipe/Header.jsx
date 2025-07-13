import styled, { css } from "styled-components";
import { Button } from "../../ui/Button";
import { Link } from "react-router-dom";
import SearchRecipeForm from "./SearchRecipeForm";
import { respond } from "../../styles/mixins";

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-light-3);
  padding: var(--space-7);

  ${respond.tabPort(css`
    align-items: flex-start;
  `)}

  @media (max-width: 400px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

function Header() {
  return (
    <StyledHeader>
      <Button
        as={Link}
        to="/addRecipe"
        variation="success"
        className="addRecipeBtn"
      >
        Add Recipe
      </Button>
      <SearchRecipeForm />
    </StyledHeader>
  );
}

export default Header;

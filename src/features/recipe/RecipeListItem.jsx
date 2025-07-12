import styled, { css } from "styled-components";
import { Button } from "../../ui/Button";
import BackgroundImg from "../../assets/recipe.webp";
import { respond } from "../../styles/mixins";

const Container = styled.div`
  aspect-ratio: 3 / 4;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)),
    url(${BackgroundImg});
  color: var(--color-light-3);
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1rem;
  cursor: pointer;
  overflow: hidden;

  ${respond.phone(css`
    aspect-ratio: 1/1;
  `)}

  h3 {
    font-size: 3rem;
    text-transform: uppercase;
    transform: translateY(calc(1rem * 2 + 1.6rem + 1rem));
    transition: 0.2s all;
  }
  button {
    transform: translateY(calc(100% + 1rem));
    transition: 0.2s all;
  }

  &:hover {
    button,
    h3 {
      transform: translateY(0);
    }
  }
`;

function RecipeListItem() {
  return (
    <Container>
      {/* Name */}
      <h3>Mexican Pizza</h3>
      <Button variation="primary">View Details</Button>
    </Container>
  );
}

export default RecipeListItem;

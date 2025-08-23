import styled, { css } from "styled-components";
import { Button } from "../../ui/Button";
import { respond } from "../../styles/mixins";
import { Link } from "react-router-dom";

const Container = styled.div`
  aspect-ratio: 3 / 4;
  ${(props) => css`
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)),
      url(${props.$imgUrl});
  `}
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

    /* No hover effect on touch devices */
    @media (hover: none) and (pointer: coarse) {
      transform: translateY(0);
    }
  }
  .cta {
    transform: translateY(calc(100% + 1rem));
    transition: 0.2s all;

    /* No hover effect on touch devices */
    @media (hover: none) and (pointer: coarse) {
      transform: translateY(0);
    }
  }

  &:hover {
    .cta,
    h3 {
      transform: translateY(0);
    }
  }
`;

function RecipeListItem({ recipe }) {
  const { id, name, imgUrl } = recipe;
  return (
    <Container $imgUrl={imgUrl}>
      {/* Name */}
      <h3>{name}</h3>
      <Button
        as={Link}
        to={`/recipe/${id}`}
        variation="primary"
        className="cta"
      >
        View Details
      </Button>
    </Container>
  );
}

export default RecipeListItem;

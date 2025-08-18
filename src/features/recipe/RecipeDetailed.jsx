import styled, { css } from "styled-components";
import Image from "../../assets/recipe.webp";
import { respond } from "../../styles/mixins";
import { useParams } from "react-router-dom";
import { useRecipes } from "../../contexts/RecipesProvider";

const Container = styled.div`
  display: flex;

  /* This makes sure the image aspect ratio remains same */
  /* This will set the height of container based on width */
  aspect-ratio: 16/9;

  ${respond.tabPort(css`
    flex-direction: column;
    width: 400px;
    margin: 0 auto;
    aspect-ratio: auto;
  `)}

  ${respond.phone(css`
    width: 350px;
  `)}

  @media (max-width: 400px) {
    width: 100%;
  }

  hr {
    height: 2px;
    outline: none;
    border: none;
    margin-top: 1rem;
    background-color: var(--color-primary-2);
  }

  .image-wrapper {
    flex-basis: 40%;
    position: relative;

    ${respond.tabPort(css`
      aspect-ratio: 1/1;
    `)}

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  /* On tab landscape and above, have to scroll if content outgrows the container height  */
  .details {
    flex: 1;
    background-color: var(--color-light-2);
    padding: 5rem;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: auto;

    ${respond.tabPort(css`
      padding: 2rem;
    `)}
  }

  ol,
  ul {
    list-style-position: inside;

    li {
      text-indent: 2rem;

      &:not(:last-child) {
        margin-bottom: 5px;
      }
    }
  }
  ul {
    padding-left: 0;
  }
  .name {
    font-size: var(--font-h1);
  }
  .section-heading {
    margin: 2rem 0;
  }
`;

function RecipeDetailed() {
  const { id } = useParams();
  const {getRecipe} = useRecipes();
  const recipe = getRecipe(id);
  const {imgUrl, name, ingredients, steps} = recipe ?? {};
  return (
    <>
      {!recipe && <p>No recipe found :(</p>}
      {recipe && 
    <Container>
      {/* image */}
      <div className="image-wrapper">
        <img src={imgUrl} alt="Mexican Pizza" />
      </div>
      {/* Details */}
      <div className="details">
        <h2 className="name">{name}</h2>
        <hr />
        <h3 className="section-heading">Ingredients</h3>
        <ul>
          {ingredients.map(({name, quantity, unit},i) => <li key={`ing-${i}`}>{name} {quantity} {unit}</li>)}
        </ul>
        <hr />
        <h3 className="section-heading">Steps</h3>
        <ol>
          {steps.map((step,i) => <li key={`step-${i}`}>{step}</li>)}
        </ol>
      </div>
    </Container>
}
</>
  );
}

export default RecipeDetailed;

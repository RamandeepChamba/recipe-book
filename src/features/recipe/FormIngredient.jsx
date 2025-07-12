import styled from "styled-components";
import { Button } from "../../ui/Button";

const Ingredient = styled.div`
  display: flex;
  align-items: center;

  .actions {
    margin-left: auto;
  }
`;

function FormIngredient({ ingredient, index, onUpdate, onDelete }) {
  const { name, quantity, unit } = ingredient;
  return (
    <Ingredient>
      <div className="ingredient-info">
        <span>
          <strong>{name}</strong> {quantity} {unit}
        </span>
      </div>
      <div className="actions">
        <Button
          variation="success"
          type="button"
          onClick={() => onUpdate(index)}
        >
          Update
        </Button>
        <Button
          variation="danger"
          type="button"
          onClick={() => onDelete(index)}
        >
          Delete
        </Button>
      </div>
    </Ingredient>
  );
}

export default FormIngredient;

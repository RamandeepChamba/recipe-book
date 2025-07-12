import styled from "styled-components";
import { Button } from "../../ui/Button";

const Step = styled.div`
  display: flex;
  align-items: center;

  .actions {
    margin-left: auto;
  }
`;

function FormStep({ step, index, onUpdate, onDelete }) {
  return (
    <Step>
      <strong>Step {index + 1}: &nbsp;</strong>
      <span>{step}</span>
      <span className="actions">
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
      </span>
    </Step>
  );
}

export default FormStep;

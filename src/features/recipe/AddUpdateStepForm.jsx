import { useState } from "react";
import { Button } from "../../ui/Button";
import { StyledForm } from "../../ui/Form";

// If this receive a step, it means we are updating not adding
function AddUpdateStepForm({ onSubmit, stepToUpdateObj }) {
  const { step: stepToUpdate } = stepToUpdateObj ? stepToUpdateObj : {};
  const [step, setStep] = useState(stepToUpdate ? stepToUpdate : "");
  function handleSubmit(e) {
    e.preventDefault();
    if (!step) return;
    onSubmit(step);
  }
  return (
    <StyledForm onSubmit={handleSubmit}>
      <h1>Add Step</h1>
      <textarea
        placeholder="Step"
        value={step}
        onChange={(e) => setStep(e.target.value)}
      />
      <Button variation="success">{stepToUpdate ? "Update" : "Add"}</Button>
    </StyledForm>
  );
}

export default AddUpdateStepForm;

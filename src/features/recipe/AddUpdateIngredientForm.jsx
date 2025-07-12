import { useState } from "react";
import { Button } from "../../ui/Button";
import { StyledForm } from "../../ui/Form";

// If this receive an ingredient it means we are updating not adding
function AddUpdateIngredientForm({ onSubmit, currIngredientObj }) {
  const { ingredient } = currIngredientObj ?? {};
  const [name, setName] = useState(ingredient ? ingredient.name : "");
  const [quantity, setQuantity] = useState(
    ingredient ? ingredient.quantity : ""
  );
  const [unit, setUnit] = useState(ingredient ? ingredient.unit : "");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !quantity || !unit) return;
    onSubmit({ name, quantity, unit });
  }
  return (
    <StyledForm onSubmit={handleSubmit}>
      <h1>Add Ingredient</h1>
      <input
        type="text"
        placeholder="Name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        required
        value={quantity}
        min={0}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <input
        type="text"
        placeholder="Unit"
        required
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      />
      <Button variation="success">{ingredient ? "Update" : "Add"}</Button>
    </StyledForm>
  );
}

export default AddUpdateIngredientForm;

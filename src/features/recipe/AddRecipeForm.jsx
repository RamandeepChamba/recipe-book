import styled from "styled-components";
import { Button } from "../../ui/Button";
import Modal from "../../ui/Modal";
import AddUpdateIngredientForm from "./AddUpdateIngredientForm";
import { useState } from "react";
import { StyledForm } from "../../ui/Form";
import FormIngredient from "./FormIngredient";
import AddUpdateStepForm from "./AddUpdateStepForm";
import FormStep from "./FormStep";
import { v4 as uuidv4 } from "uuid";
import { uploadRecipeImage } from "../../services/apiRecipeImages";
import { useRecipes } from "../../contexts/RecipesProvider";
import { useNavigate } from "react-router-dom";

const Form = styled(StyledForm)`
  margin-top: 10rem;

  .ingredients,
  .steps {
    max-height: 100px;
    overflow: auto;
  }

  .ingredients {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;
function AddRecipeForm() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [showIngredientForm, setShowIngredientForm] = useState(false);
  const [showStepForm, setShowStepForm] = useState(false);
  // used for updating the ingredient
  const [currentIngredient, setCurrentIngredient] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  // used for updating the step
  const [currentStep, setCurrentStep] = useState(null);
  const [steps, setSteps] = useState([]);
  const { dispatch } = useRecipes();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || ingredients.length === 0 || steps.length === 0) return;
    // Image url
    const recipe = {
      id: uuidv4(),
      name,
      ingredients,
      steps,
    };

    const imgUrl = await uploadRecipeImage(image);
    recipe.imgUrl = imgUrl;
    dispatch({ type: "addRecipe", payload: recipe });
    navigate(`/recipe/${recipe.id}`);
  }
  function handleAddIngredientBtn() {
    setCurrentIngredient(null);
    setShowIngredientForm(true);
  }
  function handleIngredientUpdateBtn(index) {
    setCurrentIngredient({ ingredient: ingredients[index], index });
    // Show update ingredient form
    setShowIngredientForm(true);
  }
  function handleDeleteIngredient(index) {
    setIngredients((ingrs) => ingrs.filter((ing, i) => i !== index));
  }
  function handleIngredient(ingredientToBeAdded) {
    // Updating
    if (currentIngredient) {
      setIngredients((ingredients) =>
        ingredients.map((ingredient, i) =>
          i === currentIngredient.index ? ingredientToBeAdded : ingredient
        )
      );
    } else {
      // Adding
      setIngredients((ingredients) => [...ingredients, ingredientToBeAdded]);
    }
    setShowIngredientForm(false);
  }
  function handleAddStepBtn() {
    setCurrentStep(null);
    setShowStepForm(true);
  }
  function handleStepUpdateBtn(index) {
    // set current step
    setCurrentStep({ step: steps[index], index });
    // show update step form
    setShowStepForm(true);
  }
  function handleStep(stepToBeAdded) {
    // Updating
    if (currentStep) {
      setSteps((s) =>
        s.map((step, i) => (i === currentStep.index ? stepToBeAdded : step))
      );
    } else {
      // Adding
      setSteps((s) => [...s, stepToBeAdded]);
    }
    setShowStepForm(false);
  }
  function handleDeleteStep(index) {
    setSteps((s) => s.filter((_, i) => i !== index));
  }
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h1>Add Recipe</h1>
        <input
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div>
          <label htmlFor="recipe-image">Finished Image</label>
          <input
            type="file"
            name="recipe-image"
            id="recipe-image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <Button type="button" variation="dark" onClick={handleAddIngredientBtn}>
          + Add Ingredient
        </Button>
        <div className="ingredients">
          {ingredients.map((ingredient, i) => (
            <FormIngredient
              key={i}
              ingredient={ingredient}
              index={i}
              onUpdate={handleIngredientUpdateBtn}
              onDelete={handleDeleteIngredient}
            />
          ))}
        </div>
        <Button type="button" variation="dark" onClick={handleAddStepBtn}>
          + Add Step
        </Button>
        <div className="steps">
          {steps.map((step, i) => (
            <FormStep
              step={step}
              key={`step-${i}`}
              index={i}
              onUpdate={handleStepUpdateBtn}
              onDelete={handleDeleteStep}
            />
          ))}
        </div>
        <Button type="submit" variation="success">
          Add
        </Button>
      </Form>
      {/* Add ingredient Form */}
      {showIngredientForm && (
        <Modal onClose={() => setShowIngredientForm(false)}>
          <AddUpdateIngredientForm
            onSubmit={handleIngredient}
            currIngredientObj={currentIngredient}
          />
        </Modal>
      )}
      {/* Add Step Form */}
      {showStepForm && (
        <Modal onClose={() => setShowStepForm(false)}>
          <AddUpdateStepForm
            onSubmit={handleStep}
            stepToUpdateObj={currentStep}
          />
        </Modal>
      )}
    </>
  );
}

export default AddRecipeForm;

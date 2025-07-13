import { createContext, useContext, useState } from "react";
import { RECIPES_PER_PAGE } from "../utils/constants";

const RecipesContext = createContext();

const recipesTemp = [
  {
    id: 1,
    name: "Mexican pizza",
    ingredients: [
      { name: "Salt", quantity: 2, unit: "tsp" },
      { name: "sugar", quantity: 2, unit: "tsp" },
      { name: "flour", quantity: 20, unit: "g" },
    ],
    steps: ["Chicken or something", "step #2"],
  },
  {
    id: 2,
    name: "Idli",
    ingredients: [
      { name: "Salt", quantity: 2, unit: "tsp" },
      { name: "flour", quantity: 20, unit: "g" },
    ],
    steps: ["step #1", "step #2"],
  },
  {
    id: 3,
    name: "Shake",
    ingredients: [
      { name: "Banana", quantity: 3, unit: "pieces" },
      { name: "Milk", quantity: 1, unit: "Litre" },
      { name: "Sugar", quantity: 2, unit: "tsp" },
    ],
    steps: ["step #1", "Pour water and chicken"],
  },
];

export function RecipesProvider({ children }) {
  // TODO: Load from local storage
  const [recipes, setRecipes] = useState(recipesTemp);
  // Using this in case user has searched previously and is only changing page
  // Avoids filtering again if only page is changed but query is same
  const [searchedRecipes, setSearchedRecipes] = useState({
    searchQuery: "",
    searchBy: "",
    filteredRecipes: [],
  });
  // Recipes to view
  const [recipesToView, setRecipesToView] = useState([]);

  function paginateRecipes(page, recipesToPaginate) {
    const startIndex = (page - 1) * RECIPES_PER_PAGE;
    const endIndex = startIndex + RECIPES_PER_PAGE;
    setRecipesToView(recipesToPaginate.slice(startIndex, endIndex));
  }

  // Will be used to view recipes based on search and pagination
  function provideRecipes({ searchQuery, searchBy, pageFromUrl }) {
    const page = pageFromUrl ? pageFromUrl : 1;
    if (!searchQuery) {
      // view recipes by paginating original recipes
      paginateRecipes(page, recipes);
    }
    // if searchQuery and searchBy are same as previous
    else if (
      searchedRecipes.searchQuery === searchQuery &&
      searchedRecipes.searchBy === searchBy
    ) {
      //   - paginate from searched recipes
      paginateRecipes(page, searchedRecipes.filteredRecipes);
    }
    // else
    else {
      //   const recipe = {
      //     id: 1,
      //     name: "Mexican pizza",
      //     ingredients: [
      //       { name: "Salt", quantity: 2, unit: "tsp" },
      //       { name: "sugar", quantity: 2, unit: "tsp" },
      //       { name: "flour", quantity: 20, unit: "g" },
      //     ],
      //     steps: ["step #1", "step #2"],
      //   };
      //   - Filter recipes
      let filteredRecipes;
      if (searchBy === "keyword") {
        filteredRecipes = recipes.filter((recipe) => {
          const keyword = searchQuery.toLowerCase();
          // filter in if name or steps include the keyword
          // if in name, no need to check furthur
          const inName = recipe.name.toLowerCase().includes(keyword);
          if (inName) return true;
          // not in name, check steps
          let match = false;
          let i = 0;
          while (i < recipe.steps.length && !match) {
            match = recipe.steps[i].toLowerCase().includes(keyword);
            i++;
          }
          return match;
        });
      }
      if (searchBy === "ingredients") {
        // searchQuery = 'tomato, onion, chicken' (match if any one is found)
        // searchQuery = 'tomato + onion + chicken' (match only if all are found)
        filteredRecipes = recipes.filter((recipe) => {
          const ingsLower = recipe.ingredients.map((ing) =>
            ing.name.toLowerCase()
          );
          // Determine if any or all
          // Match any
          if (searchQuery.includes(",")) {
            const searchQueryIngredients = searchQuery.split(",");
            let match = false;
            let i = 0;
            while (!match && i < searchQueryIngredients.length) {
              match = ingsLower.includes(
                searchQueryIngredients[i].toLowerCase().trim()
              );
              i++;
            }
            return match;
          } else if (searchQuery.includes("+")) {
            // Match all
            const searchQueryIngredients = searchQuery.split("+");
            let match = true;
            let i = 0;
            while (match && i < searchQueryIngredients.length) {
              match = ingsLower.includes(
                searchQueryIngredients[i].toLowerCase().trim()
              );
              i++;
            }
            return match;
          } else {
            // If just one ingredient
            return ingsLower.includes(searchQuery.toLowerCase());
          }
        });
      }
      //     -- store them in searched recipes
      setSearchedRecipes({ searchQuery, searchBy, filteredRecipes });
      //   - paginate filtered
      paginateRecipes(page, filteredRecipes);
    }
  }

  return (
    <RecipesContext.Provider value={{ recipesToView, provideRecipes }}>
      {children}
    </RecipesContext.Provider>
  );
}

export function useRecipes() {
  const value = useContext(RecipesContext);
  return value;
}

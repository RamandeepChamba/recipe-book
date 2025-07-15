import { createContext, useContext, useReducer } from "react";
import { RECIPES_PER_PAGE } from "../utils/constants";
import { useSearchParams } from "react-router-dom";

const RecipesContext = createContext();

const recipesTemp1 = Array.from({ length: 150 }, (_, i) => ({
  id: i,
  name: "Mexican pizza",
  ingredients: [
    { name: "Salt", quantity: 2, unit: "tsp" },
    { name: "sugar", quantity: 2, unit: "tsp" },
    { name: "flour", quantity: 20, unit: "g" },
  ],
  steps: ["Chicken or something", "step #2"],
}));

const recipesTemp2 = [
  {
    id: "s1",
    name: "pizza",
    ingredients: [
      { name: "Salt", quantity: 2, unit: "tsp" },
      { name: "sugar", quantity: 2, unit: "tsp" },
      { name: "flour", quantity: 20, unit: "g" },
    ],
    steps: ["Chicken or something", "step #2"],
  },
  {
    id: "s2",
    name: "Idli",
    ingredients: [
      { name: "Salt", quantity: 2, unit: "tsp" },
      { name: "flour", quantity: 20, unit: "g" },
    ],
    steps: ["step #1", "step #2"],
  },
  {
    id: "s3",
    name: "Shake",
    ingredients: [
      { name: "Banana", quantity: 3, unit: "pieces" },
      { name: "Milk", quantity: 1, unit: "Litre" },
      { name: "Sugar", quantity: 2, unit: "tsp" },
    ],
    steps: ["step #1", "Pour water and chicken"],
  },
];

const recipesTemp = [...recipesTemp1, ...recipesTemp2];

const initState = {
  // TODO: Load from local storage
  recipes: recipesTemp,
  // Using this in case user has searched previously and is only changing page
  // Avoids filtering again if only page is changed but query is same
  // For optimization
  searchedRecipes: {
    searchQuery: "",
    searchBy: "",
    filteredRecipes: [],
  },
  recipesToView: [],
};

// Helper
function paginateRecipes(page, recipesToPaginate) {
  const startIndex = (page - 1) * RECIPES_PER_PAGE;
  const endIndex = startIndex + RECIPES_PER_PAGE;
  return recipesToPaginate.slice(startIndex, endIndex);
}

function reducer(state, action) {
  switch (action.type) {
    // filter for search or pagination or both
    case "filterRecipes": {
      const { searchQuery, searchBy, pageFromUrl } = action.payload;
      const page = pageFromUrl ? pageFromUrl : 1;
      if (!searchQuery) {
        // view recipes by paginating original recipes
        const newRecipes = paginateRecipes(page, state.recipes);
        return { ...state, recipesToView: newRecipes };
      }
      // if searchQuery and searchBy are same as previous
      else if (
        state.searchedRecipes.searchQuery === searchQuery &&
        state.searchedRecipes.searchBy === searchBy
      ) {
        //   - paginate from searched recipes
        const newRecipes = paginateRecipes(
          page,
          state.searchedRecipes.filteredRecipes
        );
        return { ...state, recipesToView: newRecipes };
      }
      // else
      else {
        //   - Filter recipes
        let filteredRecipes;
        if (searchBy === "keyword") {
          filteredRecipes = state.recipes.filter((recipe) => {
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
          filteredRecipes = state.recipes.filter((recipe) => {
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
        //       -- paginate filtered
        const newRecipes = paginateRecipes(page, filteredRecipes);

        return {
          ...state,
          //     -- store them in searched recipes
          searchedRecipes: { searchQuery, searchBy, filteredRecipes },
          recipesToView: newRecipes,
        };
      }
    }
    // Add recipe
    default:
      return state;
  }
}

export function RecipesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState);

  const [searchParams, setSearchParams] = useSearchParams();
  // For pagination
  // If there's a search query in url pagination should get filtered recipe count
  // else all recipe count
  const searchQueryParam = searchParams.get("searchQuery");
  const recipesCount = searchQueryParam
    ? state.searchedRecipes.filteredRecipes.length
    : state.recipes.length;

  return (
    <RecipesContext.Provider value={{ state, dispatch, recipesCount }}>
      {children}
    </RecipesContext.Provider>
  );
}

export function useRecipes() {
  const value = useContext(RecipesContext);
  return value;
}

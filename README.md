# TODOS

- use state in recipeDetailed
- feature to add recipe
  - images for recipes
- link to go back to all recipes ('/')

# User stories

- as a user, i should be able to add a recipe
- as a user, i should be able to view all recipes
- as a user, i should be able to view single recipe details
- as a user, i should be able to search for recipes

# Features

- recipe

# Pages

- 'app/addRecipe'
- 'app/recipes'
- 'app/recipes/:query'
- 'app/recipe/:id'

# Search recipe

## By Keyword

- accepts a keyword
- looks for keyword in recipe's name and steps
- case insensitive

## By Ingredients

- accepts one or multiple ingredients and looks for them in recipe
- match all ingredients (recipe should have all ingredients)
  - Search Query: 'tomato + onion + sugar'
- match any
  - Search Query: 'tomato, onion, sugar'
- just one ingredient
  - Search Query: 'tomato'
- case insensitive

# How app works under the hood

- RecipeList component gets search params (searchQuery, searchBy and page)
  and filters recipes using provideRecipes function in RecipesProvider

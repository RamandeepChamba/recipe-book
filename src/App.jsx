import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import AddRecipe from "./pages/AddRecipe";
import Recipes from "./pages/Recipes";
import GlobalStyles from "./styles/GlobalStyles";
import Recipe from "./pages/Recipe";
import { RecipesProvider } from "./contexts/RecipesProvider";

function App() {
  return (
    <div>
      <GlobalStyles />
      <RecipesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="" element={<AppLayout />}>
              <Route path="/" element={<Recipes />} />
              <Route path="/addRecipe" element={<AddRecipe />} />
              <Route path="/recipe/:id" element={<Recipe />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </RecipesProvider>
    </div>
  );
}

export default App;

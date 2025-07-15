import { useSearchParams } from "react-router-dom";
import { useRecipes } from "../../contexts/RecipesProvider";
import Pagination from "../../ui/Pagination";
import { RECIPES_PER_PAGE } from "../../utils/constants";
import RecipeList from "./RecipeList";

function RecipesWithPagination() {
  const { state, recipesCount } = useRecipes();
  const { recipesToView } = state;
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("searchQuery");
  const searchBy = searchParams.get("searchBy");
  const page = searchParams.get("page");

  function handlePageChange(newPage) {
    if (!searchQuery) {
      setSearchParams({ page: newPage });
    } else {
      setSearchParams({ searchQuery, searchBy, page: newPage });
    }
  }

  return (
    <>
      <RecipeList />
      {recipesToView.length > 0 && (
        <Pagination
          totalCount={recipesCount}
          perPage={RECIPES_PER_PAGE}
          curPage={page ? parseInt(page) : 1}
          succeedingPreceedingPageNumCount={2}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}

export default RecipesWithPagination;

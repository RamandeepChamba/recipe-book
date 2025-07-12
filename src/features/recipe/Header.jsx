import styled from "styled-components";
import { Button } from "../../ui/Button";
import { Link } from "react-router-dom";
import { useState } from "react";

const StyledHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-light-3);
  padding: var(--space-7) 0;

  .addRecipeBtn {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .search {
    border: none;
    border-top-right-radius: 100px;
    border-bottom-right-radius: 100px;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
    padding: var(--space-4);
    transition: 0.2s all;
    font-size: inherit;

    &:focus {
      outline: 1px solid var(--color-primary-1);
      transition: 0.2s all;
    }
  }
`;

function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState("name");

  function handleSearch() {
    console.log(searchQuery);
    console.log(searchBy);
  }
  return (
    <StyledHeader>
      <Button
        as={Link}
        to="/addRecipe"
        variation="success"
        className="addRecipeBtn"
      >
        Add Recipe
      </Button>
      <input
        type="text"
        className="search"
        placeholder="Search Recipe"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div>
        <input
          type="radio"
          id="byName"
          name="searchBy"
          checked={searchBy === "name"}
          onChange={() => setSearchBy("name")}
        />
        <label htmlFor="byName">By name</label>
      </div>
      <div>
        <input
          type="radio"
          id="byIngredient"
          name="searchBy"
          checked={searchBy === "ingredient"}
          onChange={() => setSearchBy("ingredient")}
        />
        <label htmlFor="byIngredient">By ingredient</label>
      </div>
      <Button variation="dark" onClick={handleSearch}>
        Search
      </Button>
    </StyledHeader>
  );
}

export default Header;

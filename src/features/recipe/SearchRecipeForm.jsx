import { useState } from "react";
import { Button } from "../../ui/Button";
import styled, { css } from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { respond } from "../../styles/mixins";

const StyledSearchRecipeForm = styled.form`
  display: flex;
  align-items: center;
  gap: 1rem;

  ${respond.tabPort(css`
    align-items: flex-start;
  `)}

  .inputs {
    display: flex;
    align-items: center;
    gap: 1rem;

    ${respond.tabPort(css`
      flex-direction: column;
      align-items: flex-start;
    `)}
  }
  .search {
    border: none;
    border-radius: 100px;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
    padding: var(--space-4) var(--space-5);
    transition: 0.2s all;
    font-size: inherit;

    &:focus {
      outline: 1px solid var(--color-primary-1);
      transition: 0.2s all;

      & + .tooltip {
        visibility: visible;
      }
    }
  }
  .radios {
    display: flex;
    gap: 1rem;
  }
  .radio label {
    margin-left: 2px;
  }

  .tooltip {
    position: relative;
    visibility: hidden;

    &__text {
      position: absolute;
      background-color: var(--color-gray);
      color: var(--color-light);
      padding: 1rem;
      width: max-content;
      border-radius: 6px;
      top: 1rem;
      opacity: 0.9;

      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: calc(var(--space-5) - 0.5rem);
        width: 1rem;
        height: 1rem;
        transform: translateY(-50%) rotate(45deg);
        background-color: var(--color-gray);
      }
    }
  }
`;

function SearchRecipeForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQueryFromUrl = searchParams.get("searchQuery");
  const searchByFromUrl = searchParams.get("searchBy");
  const [searchQuery, setSearchQuery] = useState(searchQueryFromUrl ?? "");
  const [searchBy, setSearchBy] = useState(searchByFromUrl ?? "keyword");
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    if (!searchQuery || !searchBy) return;
    if (searchQuery.includes(",") && searchQuery.includes("+")) {
      alert(
        "Invalid syntax \n For any match: tomato,onion,garlic \n For all match: tomato+onion+garlic"
      );
      return;
    }
    // go to route with search params
    const url = `/?searchQuery=${encodeURIComponent(
      searchQuery
    )}&searchBy=${searchBy}`;
    navigate(url);
  }
  return (
    <StyledSearchRecipeForm onSubmit={handleSearch}>
      <div className="inputs">
        <div>
          <input
            type="text"
            className="search"
            placeholder="Search Recipe"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            required
          />
          {!searchQuery && searchBy === "ingredients" && (
            <div className="tooltip">
              <div className="tooltip__text">
                <p>Match any: tomato, onion, garlic</p>
                <p>Match all: tomato + onion + garlic</p>
              </div>
            </div>
          )}
        </div>
        <div className="radios">
          <div className="radio">
            <input
              type="radio"
              id="byKeyword"
              name="searchBy"
              checked={searchBy === "keyword"}
              onChange={() => setSearchBy("keyword")}
            />
            <label htmlFor="byKeyword">By keyword</label>
          </div>
          <div className="radio">
            <input
              type="radio"
              id="byIngredients"
              name="searchBy"
              checked={searchBy === "ingredients"}
              onChange={() => setSearchBy("ingredients")}
            />
            <label htmlFor="byIngredients">By ingredients</label>
          </div>
        </div>
      </div>
      <Button variation="dark">Search</Button>
    </StyledSearchRecipeForm>
  );
}

export default SearchRecipeForm;

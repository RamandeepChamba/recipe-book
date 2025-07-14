/*

- accepts succeedingPreceedingPageNumCount [sPPNC], which will determine how many page num buttons
will be before or after the current page
  e.g. if current page is 7, total pages is 12 and sPPNC is 2: 5,6 will come before and 8,9 will come after:
    1...5,6,7,8,9...12

- if the case is such: 1...3,4,5,6,7...9, instead of '...' it will show 1,2,3,4,5,6,7,8,9 as there's just one more page (2 and 8).
- sPPNC is 3, current page is 7 and total pages are 12 : 1...4,5,6,7,8,9,10,11,12. (not 7,8,9,10...12)
- more cases:
  1...8,9,10 (curPage = 10, sPPNC = 2)
  1,2,3...10 (curPage = 1, sPPNC = 2)
*/

import styled from "styled-components";
import { range } from "../utils/helpers";

const Container = styled.div`
  margin-top: 5rem;
  margin-bottom: 5rem;

  button {
    outline: none;
    border: none;
    padding: 1rem;
    cursor: pointer;
    transition: 0.2s all;

    &.non-number {
      background-color: var(--color-dark);
      color: var(--color-light);

      &:hover {
        background-color: var(--color-gray);
      }
    }
    &:not(.non-number):not(:disabled) {
      &:hover {
        background-color: var(--color-gray);
      }
    }
    &.active {
      background-color: var(--color-primary-2);
      color: var(--color-dark);
    }
    &:disabled {
      cursor: not-allowed;
    }
  }
`;

function Pagination({
  totalCount,
  perPage,
  curPage,
  succeedingPreceedingPageNumCount, // 1...5,6,7,8,9,...14 (let curPage = 7, totalPages = 14 and sPPNC = 2 [5,6 and 8,9])
  onPageChange,
}) {
  const totalPages = Math.ceil(totalCount / perPage);
  const hasPreceedingDots = curPage - succeedingPreceedingPageNumCount - 2 > 1;
  const hasSucceedingDots =
    curPage + succeedingPreceedingPageNumCount + 2 < totalPages;
  return (
    <Container>
      {totalPages <= 1 && null}
      {totalPages > 1 && (
        <div>
          {/* Previous button */}
          {curPage !== 1 && (
            <button
              onClick={() => onPageChange(curPage - 1)}
              className="non-number"
            >
              Prev
            </button>
          )}
          {/* Page 1 will always be there */}
          <button
            onClick={() => onPageChange(1)}
            className={curPage == 1 ? "active" : ""}
            disabled={curPage == 1}
          >
            1
          </button>
          {/* Preceeding dots */}
          {hasPreceedingDots && <span>...</span>}
          {/* Buttons for preceeding page numbers of current page and current page num itself */}
          {/* If curPage is 1 there will be nothing before */}
          {/* if no preceding dots count from 2 all the way to current */}
          {curPage > 1 &&
            range(
              hasPreceedingDots
                ? curPage - succeedingPreceedingPageNumCount
                : 2,
              curPage
            ).map((num) => (
              <button
                key={`pagination-btn-${num}`}
                className={curPage == num ? "active" : ""}
                disabled={curPage == num}
                onClick={() => onPageChange(num)}
              >
                {num}
              </button>
            ))}
          {/* Numbers after the current */}
          {/* If no succeeding dots, will count from (curPage + 1) to (lastPage - 1) */}
          {curPage < totalPages - 1 &&
            succeedingPreceedingPageNumCount > 0 &&
            range(
              curPage + 1,
              hasSucceedingDots
                ? curPage + succeedingPreceedingPageNumCount
                : totalPages - 1
            ).map((num) => (
              <button
                key={`pagination-btn-${num}`}
                className={curPage == num ? "active" : ""}
                disabled={curPage == num}
                onClick={() => onPageChange(num)}
              >
                {num}
              </button>
            ))}
          {/* Succeeding Dots */}
          {hasSucceedingDots && <span>...</span>}
          {/* Last page btn */}
          {/* If last is the current, it is already added above after preceeding dots */}
          {curPage != totalPages && (
            <button
              onClick={() => onPageChange(totalPages)}
              className={curPage == totalPages ? "active" : ""}
              disabled={curPage == totalPages}
            >
              {totalPages}
            </button>
          )}
          {/* Next button */}
          {curPage < totalPages && (
            <button
              onClick={() => onPageChange(curPage + 1)}
              className="non-number"
            >
              Next
            </button>
          )}
        </div>
      )}
    </Container>
  );
}

export default Pagination;

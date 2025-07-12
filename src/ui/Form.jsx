import styled from "styled-components";

export const StyledForm = styled.form`
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 3rem;
  max-width: 500px;
  margin: 0 auto;

  input,
  textarea {
    padding: 1rem;
    transition: 0.2s all;

    &:focus {
      outline: 1px solid var(--color-primary-1);
    }
  }
  textarea {
    font-family: inherit;
  }
`;

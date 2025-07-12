import styled from "styled-components";

const StyledModal = styled.div`
  @keyframes pop {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
  background-color: var(--color-light-3);
  padding: 4rem;
  border-radius: 5px;
  animation: pop 0.8s;
  animation-fill-mode: forwards;

  .close {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 1rem;
    right: 1rem;
    background-color: var(--color-danger);
    color: var(--color-light-3);
    border: none;
    outline: none;
    font-size: 3.5rem;
    padding: 1rem;
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    cursor: pointer;
    transition: 0.2s all;

    &:hover {
      background-color: var(--color-light-3);
      color: var(--color-danger);
    }
  }
  p {
    line-height: 2;
  }
`;

export default StyledModal;

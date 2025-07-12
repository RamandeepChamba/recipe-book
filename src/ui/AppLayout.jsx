import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../features/recipe/Header";

const StyledApp = styled.div`
  background: linear-gradient(to right, #56ab2f, #a8e063);
  min-height: 100vh;

  main {
    max-width: 1000px;
    margin: 0 auto;
    margin-top: 5rem;
    padding: 2rem;
  }
`;

function AppLayout() {
  return (
    <StyledApp>
      <header>
        <Header />
      </header>
      <main>{<Outlet />}</main>
    </StyledApp>
  );
}

export default AppLayout;

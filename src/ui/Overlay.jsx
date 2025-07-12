import styled from "styled-components";

const StyledOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  overflow: auto;
  z-index: 100;
`;
function Overlay({ children }) {
  return <StyledOverlay>{children}</StyledOverlay>;
}

export default Overlay;

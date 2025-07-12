/*

- Shows it's children in a modal
- have close button to close itself

*/

import Overlay from "./Overlay";
import StyledModal from "./StyledModal";
import { createPortal } from "react-dom";

function Modal({ children, onClose }) {
  return createPortal(
    <Overlay>
      <StyledModal>
        <button onClick={onClose} className="close">
          &times;
        </button>
        <div>{children}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

export default Modal;

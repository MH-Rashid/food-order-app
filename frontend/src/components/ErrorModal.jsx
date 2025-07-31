import { useRef, useEffect } from "react";

import { createPortal } from "react-dom";

export default function ErrorModal({ open, children, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;
    
    if (open) {
      modal.showModal();
    }

    return () => modal.close();
  }, [open]);

  return createPortal(
    <dialog className="error-modal" ref={dialog} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}

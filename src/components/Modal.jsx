import { forwardRef, useImperativeHandle, useRef, useState } from "react";

import { createPortal } from 'react-dom';

import Cart from "./Cart/Cart";
import CheckoutForm from "./Cart/CheckoutForm";
import OrderConfirmation from "./Cart/OrderConfirmation";

const Modal = forwardRef(function Modal(props, ref) {
  const [modalState, setModalState] = useState({
    showCart: undefined,
    showForm: undefined,
    showConf: undefined,
  });

  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
        setModalState({
          showCart: true,
          showForm: false,
          showConf: false,
        })
      },
    };
  });

  function handleCheckOut() {
    setModalState({
      showCart: false,
      showForm: true,
      showConf: false,
    })
  }

  function handleShowConf() {
    setModalState({
      showCart: false,
      showForm: false,
      showConf: true,
    })
  }

  function handleReset() {
    dialog.current.close();
  }

  let modalContent;

  if (modalState.showForm) {
    modalContent = <CheckoutForm onReset={handleReset} onShowConf={handleShowConf} />
  } else if (modalState.showCart) {
    modalContent = <Cart onCheckout={handleCheckOut} />
  } else if (modalState.showConf) {
    modalContent = <OrderConfirmation onConfirm={handleReset} />
  }

  return createPortal(
    <dialog ref={dialog} className="modal" onClose={handleReset}>
      {modalContent}
    </dialog>,
    document.getElementById('modal'),
  );
});

export default Modal;

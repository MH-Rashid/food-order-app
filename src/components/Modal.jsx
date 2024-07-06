import { forwardRef, useImperativeHandle, useRef, useState } from "react";

import { createPortal } from 'react-dom';

import Cart from "./modalCmps/Cart";
import CheckoutForm from "./modalCmps/CheckoutForm";
import OrderConfirmation from "./modalCmps/OrderConfirmation";
import Orders from "./modalCmps/Orders.jsx";

const Modal = forwardRef(function Modal(props, ref) {
  const [modalState, setModalState] = useState({
    showCart: undefined,
    showOrders: undefined,
    showForm: undefined,
    showConf: undefined,
  });

  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      openCart() {
        dialog.current.showModal();
        setModalState({
          showCart: true,
          showOrders: false,
          showForm: false,
          showConf: false,
        })
      },
      openOrders() {
        dialog.current.showModal();
        setModalState({
          showCart: false,
          showOrders: true,
          showForm: false,
          showConf: false,
        })
      }
    };
  });

  function handleCheckOut() {
    setModalState({
      showCart: false,
      showOrders: false,
      showForm: true,
      showConf: false,
    })
  }

  function handleShowConf() {
    setModalState({
      showCart: false,
      showOrders: false,
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
  } else if (modalState.showOrders) {
    modalContent = <Orders onReset={handleReset} />
  }

  return createPortal(
    <dialog ref={dialog} className="modal" onClose={handleReset}>
      {modalContent}
    </dialog>,
    document.getElementById('modal'),
  );
});

export default Modal;
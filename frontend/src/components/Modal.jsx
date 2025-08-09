import {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import Cart from "./modalCmps/Cart.jsx";
import CheckoutForm from "./modalCmps/CheckoutForm.jsx";
import OrderConfirmation from "./modalCmps/OrderConfirmation.jsx";
import Orders from "./modalCmps/Orders.jsx";
import AuthForm from "./modalCmps/AuthForm.jsx";
import LogoutConfirmation from "./modalCmps/LogoutConfirmation.jsx";
import { AppContext } from "../store/meal-cart-context.jsx";

const Modal = forwardRef(function Modal(props, ref) {
  const { setUser, user } = useContext(AppContext);

  console.log("user:", user)

  const [modalState, setModalState] = useState({
    showAuth: true,
    showLogout: undefined,
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
          showAuth: false,
          showLogout: false,
          showCart: true,
          showOrders: false,
          showForm: false,
          showConf: false,
        });
      },
      openOrders() {
        dialog.current.showModal();
        setModalState({
          showAuth: false,
          showLogout: false,
          showCart: false,
          showOrders: true,
          showForm: false,
          showConf: false,
        });
      },
      openLogout() {
        dialog.current.showModal();
        setModalState({
          showAuth: false,
          showLogout: true,
          showCart: false,
          showOrders: false,
          showForm: false,
          showConf: false,
        });
      },
    };
  });

  function handleLogout() {
    setUser("")
    setModalState({
      showAuth: true,
      showLogout: false,
      showCart: false,
      showOrders: false,
      showForm: false,
      showConf: false,
    });
  }

  function handleCheckOut() {
    setModalState({
      showAuth: false,
      showLogout: false,
      showCart: false,
      showOrders: false,
      showForm: true,
      showConf: false,
    });
  }

  function handleShowConf() {
    setModalState({
      showAuth: false,
      showLogout: false,
      showCart: false,
      showOrders: false,
      showForm: false,
      showConf: true,
    });
  }

  function handleCloseModal() {
    dialog.current.close();
  }

  let modalContent;

  if (modalState.showAuth) {
    modalContent = <AuthForm onClose={handleCloseModal} />;
  } else if (modalState.showLogout) {
    modalContent = (
      <LogoutConfirmation onClose={handleCloseModal} onLogout={handleLogout} />
    );
  } else if (modalState.showForm) {
    modalContent = (
      <CheckoutForm onClose={handleCloseModal} onShowConf={handleShowConf} />
    );
  } else if (modalState.showCart) {
    modalContent = <Cart onCheckout={handleCheckOut} />;
  } else if (modalState.showConf) {
    modalContent = <OrderConfirmation onConfirm={handleCloseModal} />;
  } else if (modalState.showOrders) {
    modalContent = <Orders onClose={handleCloseModal} />;
  }

  return createPortal(
    <>
      <div
        className="modal-overlay"
        onClick={!modalState.showAuth ? handleCloseModal : null}
      />
      <dialog
        ref={dialog}
        onClose={handleCloseModal}
        open
        className="modal-dialog"
      >
        <div className="modal">{modalContent}</div>
      </dialog>
    </>,
    document.getElementById("modal")
  );
});

export default Modal;

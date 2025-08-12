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
import DeleteOrderConfirmation from "./modalCmps/DeleteOrderConfirmation.jsx";
import { AppContext } from "../store/meal-cart-context.jsx";

const Modal = forwardRef(function Modal(props, ref) {
  const { setMeals, setUser, user } = useContext(AppContext);

  console.log("user:", user);

  const [modalState, setModalState] = useState({
    showAuth: true,
    showLogout: undefined,
    showDeleteOrder: undefined,
    showCart: undefined,
    showOrders: undefined,
    showForm: undefined,
    showConf: undefined,
  });
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      openCart() {
        dialog.current.showModal();
        setModalState({
          showAuth: false,
          showLogout: false,
          showDeleteOrder: false,
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
          showDeleteOrder: false,
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
          showDeleteOrder: false,
          showCart: false,
          showOrders: false,
          showForm: false,
          showConf: false,
        });
      },
    };
  });

  function handleLogout() {
    setUser({});
    setMeals([]);
    setModalState({
      showAuth: true,
      showLogout: false,
      showDeleteOrder: false,
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
      showDeleteOrder: false,
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
      showDeleteOrder: false,
      showCart: false,
      showOrders: false,
      showForm: false,
      showConf: true,
    });
  }

  function handleCancelDeleteOrder() {
    setModalState({
      showAuth: false,
      showLogout: false,
      showDeleteOrder: false,
      showCart: false,
      showOrders: true,
      showForm: false,
      showConf: false,
    });
  }

  function handleShowDeleteOrder(orderId) {
    setModalState({
      showAuth: false,
      showLogout: false,
      showDeleteOrder: true,
      showCart: false,
      showOrders: false,
      showForm: false,
      showConf: false,
    });
    setSelectedOrderId(orderId);
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
    modalContent = (
      <Orders
        key={Date.now()} // key prop forces re-mounting hence refetching of orders data
        onClose={handleCloseModal}
        onDelete={handleShowDeleteOrder}
      />
    );
  } else if (modalState.showDeleteOrder) {
    modalContent = (
      <DeleteOrderConfirmation
        onCancel={handleCancelDeleteOrder}
        onClose={handleCloseModal}
        orderId={selectedOrderId}
      />
    );
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

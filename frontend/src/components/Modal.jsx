import '../styles/modal.css'
import {
  forwardRef,
  useContext,
  useEffect,
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
import { AppContext } from "../store/app-context.jsx";

const isLoggedIn = Boolean(localStorage.getItem("accessToken"));

const Modal = forwardRef(function Modal(props, ref) {
  const { setMeals, setUser } = useContext(AppContext);
  const [showModal, setShowModal] = useState(true);
  const [activeModal, setActiveModal] = useState("auth");
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const dialog = useRef(null);

  useEffect(() => {
    if (showModal) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [showModal]); // prevent background scroll and shifting when modal active

  useEffect(() => {
    if (isLoggedIn) handleCloseModal();
  }, []);

  useImperativeHandle(ref, () => ({
    openCart() {
      dialog.current?.showModal();
      setShowModal(true);
      setActiveModal("cart");
    },
    openOrders() {
      dialog.current?.showModal();
      setShowModal(true);
      setActiveModal("orders");
    },
    openLogout() {
      dialog.current?.showModal();
      setShowModal(true);
      setActiveModal("logout");
    },
  }));

  function handleCloseModal() {
    if (dialog.current?.open) {
      dialog.current.close();
    }
    setShowModal(false);
    setActiveModal(null);
  }

  const handleLogout = () => {
    setUser({});
    setMeals([]);
    setActiveModal("auth");
  };

  const handleShowDeleteOrder = (orderId) => {
    setSelectedOrderId(orderId);
    setActiveModal("deleteOrder");
  };

  const modalMap = {
    auth: <AuthForm onClose={handleCloseModal} />,
    logout: (
      <LogoutConfirmation onClose={handleCloseModal} onLogout={handleLogout} />
    ),
    form: (
      <CheckoutForm
        onClose={handleCloseModal}
        onShowConf={() => setActiveModal("conf")}
        onShowCart={() => setActiveModal("cart")}
      />
    ),
    cart: <Cart onCheckout={() => setActiveModal("form")} />,
    conf: <OrderConfirmation onConfirm={handleCloseModal} />,
    orders: (
      <Orders
        isActive={activeModal === "orders"}
        onClose={handleCloseModal}
        onDelete={handleShowDeleteOrder}
      />
    ),
    deleteOrder: (
      <DeleteOrderConfirmation
        onCancel={() => setActiveModal("orders")}
        onClose={handleCloseModal}
        orderId={selectedOrderId}
      />
    ),
  };

  const modalContent = modalMap[activeModal];

  return (
    showModal &&
    createPortal(
      <div
        className="modal-overlay"
        onClick={(e) => {
          if (
            activeModal !== "auth" &&
            e.target.classList.contains("modal-overlay")
          ) {
            handleCloseModal();
          }
        }}
      >
        <dialog ref={dialog} onClose={handleCloseModal} open>
          <div className="modal">{modalContent}</div>
        </dialog>
      </div>,
      document.getElementById("modal")
    )
  );
});

export default Modal;

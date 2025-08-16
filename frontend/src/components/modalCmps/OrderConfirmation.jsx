import { useContext } from "react";

import { AppContext } from "../../store/app-context";
import Button from "../Button";

export default function OrderConfirmation({ onConfirm }) {
  const { resetCart } = useContext(AppContext);

  function handleConfirm() {
    resetCart();
    onConfirm();
  }

  return (
    <div>
      <h2>Success!</h2>
      <p>Your order was submitted successfully.</p>
      <p>
        We will keep you updated on the status of your order via email.
      </p>
      <div className="modal-actions">
        <Button
          styling="orange-button"
          clickFn={handleConfirm}
          btnText="Okay"
        />
      </div>
    </div>
  );
}

import { useContext } from "react";

import { AppContext } from "../../store/meal-cart-context";
import Button from "../../UI/Button";

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
        We will get back to you with more details via email within the next few
        minutes.
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

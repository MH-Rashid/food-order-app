import { useContext, useState } from "react";

import { AppContext } from "../../store/meal-cart-context.jsx";
import ErrorMessage from "./ErrorMessage.jsx";
import ErrorModal from "../ErrorModal.jsx";
import Button from "../../UI/Button.jsx";
import Input from "../../UI/Input.jsx";

import { orders } from "../../App.jsx";

export default function CheckoutForm({ onClose, onShowConf }) {
  const { items } = useContext(AppContext);

  const [inputIsEmpty, setInputIsEmpty] = useState(false);
  const [error, setError] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    if (
      data.email === null ||
      !data.email.includes("@") ||
      data.name === null ||
      data.name.trim() === "" ||
      data.street === null ||
      data.street.trim() === "" ||
      data.postcode === null ||
      data.postcode.trim() === "" ||
      data.city === null ||
      data.city.trim() === ""
    ) {
      setInputIsEmpty(true);
    } else {
      setIsSubmitting(true);
      const order = {
        items,
        customer: {
          name: data.name,
          email: data.email,
          street: data.street,
          ["postal-code"]: data.postcode,
          city: data.city,
        },
        id: (Math.random() * 1000).toString(),
      };
  
      orders.push(order);
      console.log(orders);
      localStorage.setItem("orders", JSON.stringify(orders));
      setIsSubmitting(false);
      onShowConf();
    }
  }

  function handleError() {
    setError(null);
  }

  return (
    <>
      <ErrorModal open={error} onClose={handleError}>
        {error && (
          <ErrorMessage
            title="An error occurred!"
            message={error.message}
            onConfirm={handleError}
          />
        )}
      </ErrorModal>
      <form method="dialog" onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {formattedTotalPrice}</p>

        <Input name="name" labelText="Full name" type="text" />
        <Input name="email" labelText="E-Mail Address" type="email" />
        <Input name="street" labelText="Street" type="text" />

        <div className="control-row">
          <Input name="postcode" labelText="Postal Code" type="text" />
          <Input name="city" labelText="City" type="text" />
        </div>
        {inputIsEmpty && (
          <p className="control-error">Fields cannot be empty or invalid.</p>
        )}

        <div className="modal-actions">
          <Button
            type="button"
            styling="text-button"
            clickFn={onClose}
            btnText="Close"
          />
          <Button
            type="submit"
            styling="orange-button"
            btnText={isSubmitting ? "Placing order..." : "Submit Order"}
          />
        </div>
      </form>
    </>
  );
}

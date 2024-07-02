import { useContext, useState } from "react";

import { CartContext } from "../../store/meal-cart-context";
import ErrorMessage from "./ErrorMessage";
import ErrorModal from "../ErrorModal";
import Button from "../../UI/Button";
import Input from "../../UI/Input";

export default function CheckoutForm({ onReset, onShowConf }) {
  const { items } = useContext(CartContext);

  const [inputIsEmpty, setInputIsEmpty] = useState(false);
  const [error, setError] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  async function createOrder(order) {
    setIsSubmitting(true);
    try {
      const response = await fetch("https://food-order-server-bulabso9b-mh-rashids-projects.vercel.app/orders", {
        method: "POST",
        body: JSON.stringify({ order }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error("Failed to send order. Please try again later.");
      }

      console.log(resData.message);
      onShowConf();
    } catch (error) {
      setError({ message: error.message });
    }
    setIsSubmitting(false);
  }
  
  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    if (
      data.name.trim() === "" ||
      data.street.trim() === "" ||
      data.postcode.trim() === "" ||
      data.city.trim() === ""
    ) {
      setInputIsEmpty(true);
      return;
    } else {
      setInputIsEmpty(false);
    }

    const order = {
      items,
      customer: {
        name: data.name,
        email: data.email,
        street: data.street,
        ["postal-code"]: data.postcode,
        city: data.city,
      },
    };

    createOrder(order);
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
          <p className="control-error">Fields cannot be empty</p>
        )}

        <div className="modal-actions">
          <Button
            type="button"
            styling="text-button"
            clickFn={onReset}
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

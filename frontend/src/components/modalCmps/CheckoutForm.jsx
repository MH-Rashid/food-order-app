import '../../styles/checkout.css'
import { useContext, useState } from "react";
import { AppContext } from "../../store/app-context.jsx";
import Button from "../Button.jsx";
import { toast } from "react-toastify";
import { createOrder } from "../../http.js";

function Input({ name, labelText, type, ...props }) {
  return (
    <div className="control" {...props}>
      <label style={{ fontWeight: "normal" }} htmlFor={name}>
        {labelText}
      </label>
      <input type={type} id={name} name={name} />
    </div>
  );
}

export default function CheckoutForm({ onClose, onShowConf, onShowCart }) {
  const { items, resetCart } = useContext(AppContext);

  const [inputIsEmpty, setInputIsEmpty] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  async function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    if (
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
          street: data.street,
          ["postal-code"]: data.postcode,
          city: data.city,
        },
      };

      try {
        const response = await createOrder(order);
        if (response._id) {
          toast.success("Order has been placed");
          resetCart();
          onShowConf();
        } else {
          toast.error(
            "Failed to place order: " + (response.message || "Unknown error")
          );
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred: " + (error.message || "Unknown error"));
      } finally {
        setIsSubmitting(false);
      }
    }
  }

  return (
    <form method="dialog" onSubmit={handleSubmit}>
      <h2>Checkout</h2>
      <ul style={{ paddingLeft: "1rem" }}>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} x {item.quantity} - £{item.price}
          </li>
        ))}
      </ul>
      <p style={{ fontWeight: "bold" }}>Total: {formattedTotalPrice}</p>

      <div className="checkout-form-row">
        <Input
          style={{ width: "50%" }}
          name="street"
          labelText="Street"
          type="text"
        />
        <Input
          style={{ width: "30%" }}
          name="postcode"
          labelText="Postal Code"
          type="text"
        />
        <Input name="city" labelText="City" type="text" />
      </div>

      {inputIsEmpty && (
        <p className="checkout-form-error">Fields cannot be empty or invalid.</p>
      )}

      <div className="modal-actions">
        <Button
          type="button"
          styling="text-button"
          clickFn={onClose}
          btnText="Close"
        />
        <Button
          type="button"
          styling="text-button"
          clickFn={onShowCart}
          btnText="Back to Cart"
        />
        <Button
          type="submit"
          styling="orange-button"
          btnText={isSubmitting ? "Placing order..." : "Submit Order"}
        />
      </div>
    </form>
  );
}

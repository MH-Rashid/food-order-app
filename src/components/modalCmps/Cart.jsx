import { useContext } from "react";

import { CartContext } from "../../store/meal-cart-context";
import Button from "../../UI/Button";

export default function Cart({ onCheckout }) {
  const { items, updateItem, resetCart } = useContext(CartContext);

  const totalPrice = items.reduce(
    (accumulator, item) => accumulator + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  const cartQuantity = items.length;

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartQuantity === 0 && <p>No items in cart</p>}
      {cartQuantity > 0 && (
        <ul>
          {items.map((item) => {
            const formattedPrice = `$${item.price.toFixed(2)}`;

            return (
              <li key={item.id} className="cart-item">
                <p>
                  {item.name} - {item.quantity} x {formattedPrice}
                </p>
                <div className="cart-item-actions">
                  <Button clickFn={() => updateItem(item.id, -1)} btnText="-" />
                  <span>{item.quantity}</span>
                  <Button clickFn={() => updateItem(item.id, 1)} btnText="+" />
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p className="cart-total">{formattedTotalPrice}</p>
      <form method="dialog">
        <div className="modal-actions">
          <Button styling="text-button" btnText="Close" />
          {cartQuantity > 0 && (
            <>
              <Button
                styling='text-button'
                btnText='Reset cart'
                clickFn={resetCart}
              />
              <Button
                styling="orange-button"
                clickFn={onCheckout}
                btnText="Go to Checkout"
              />
            </>
          )}
        </div>
      </form>
    </div>
  );
}

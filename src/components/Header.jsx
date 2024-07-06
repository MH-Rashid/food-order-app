import { useRef, useContext } from "react";

import logoImage from "/logo.jpg";
import Modal from "./Modal";
import Button from "../UI/Button";
import { CartContext } from "../store/meal-cart-context";

export default function Header() {
  const { items } = useContext(CartContext);

  const modal = useRef();

  const cartQuantity = items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity
  }, 0);

  function showCart() {
    modal.current.openCart();
  }

  function showOrders() {
    modal.current.openOrders();
  }

  return (
    <div id="main-header">
      <Modal ref={modal} />
      <div id="title">
        <img src={logoImage} />
        <h1>ReactFood</h1>
      </div>
      <Button
        styling='main-header-button'
        clickFn={showOrders}
        btnText='Orders'
      />
      <Button
        styling="main-header-button"
        clickFn={showCart}
        btnText={`Cart (${cartQuantity})`}
      />
    </div>
  );
}

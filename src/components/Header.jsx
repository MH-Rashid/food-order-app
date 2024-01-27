import { useRef, useContext } from "react";

import logoImage from "../assets/logo.jpg";
import Modal from "./Modal";
import Button from "../UI/Button";
import { CartContext } from "../store/meal-cart-context";

export default function Header() {
  const { items } = useContext(CartContext);

  const modal = useRef();

  const cartQuantity = items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity
  }, 0);

  function handleShowCart() {
    modal.current.open();
  }

  return (
    <div id="main-header">
      <Modal ref={modal} />
      <div id="title">
        <img src={logoImage} />
        <h1>ReactFood</h1>
      </div>
      <Button
        styling="main-header-button"
        clickFn={handleShowCart}
        btnText={`Cart (${cartQuantity})`}
      />
    </div>
  );
}

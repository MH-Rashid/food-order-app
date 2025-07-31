import { useContext } from "react";
import { CartContext } from "../store/meal-cart-context.jsx";

export default function OrderItem({ orderDetails }) {
  const { addItem } = useContext(CartContext);

  function handleReorder() {
    const { items } = orderDetails;
    items.forEach((item) => {
      addItem(item);
    });
  }

  return (
    <li className="order-item">
      <div>
        <p>{orderDetails.customer.name}</p>
        <p>Order {orderDetails.id}</p>
        <p>Items:</p>
        <ul>
          {orderDetails.items.map((item) => (
            <li key={item.id}>
              {item.name} x{item.quantity} - {item.price}
            </li>
          ))}
        </ul>
      </div>
      <button className="orange-button" onClick={handleReorder}>
        Reorder
      </button>
    </li>
  );
}

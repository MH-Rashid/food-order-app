import { useContext } from "react";
import { AppContext } from "../store/meal-cart-context.jsx";

export default function OrderItem({ orderDetails, onDelete }) {
  const { addItem, user } = useContext(AppContext);

  function handleReorder() {
    const { items } = orderDetails;
    items.forEach((item) => {
      addItem(item);
    });
  }

  return (
    <li className="order-item">
      <div>
        <p>
          {user.firstname} {user.lastname}
        </p>
        <p>Order {orderDetails._id}</p>
        <p>Items:</p>
        <ul>
          {orderDetails.items.map((item) => (
            <li key={item.id}>
              {item.name} x {item.quantity} - £{item.price}
            </li>
          ))}
        </ul>
      </div>
      <div className="order-item-actions">
        <button className="orange-button" onClick={handleReorder}>
          Reorder
        </button>
        <button
          className="red-button"
          onClick={() => onDelete(orderDetails._id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

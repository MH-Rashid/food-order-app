import '../styles/orders.css';
import { useContext } from "react";
import { AppContext } from "../store/app-context.jsx";
import { toast } from "react-toastify";

export default function OrderItem({ orderDetails, onDelete }) {
  const { addItems } = useContext(AppContext);

  function handleReorder() {
    addItems(orderDetails.items);
    toast.success("Items added to cart successfully!");
  }

  const { items } = orderDetails;
  const totalPrice = items.reduce(
    (accumulator, item) => accumulator + item.price * item.quantity,
    0
  );

  return (
    <li className="order-item">
      <div>
        <p style={{ marginTop: "3px" }}>
          Order {orderDetails._id}
        </p>
        <ul>
          {orderDetails.items.map((item) => (
            <li key={item.id}>
              {item.name} x {item.quantity} - £{item.price}
            </li>
          ))}
        </ul>
        <p style={{ fontWeight: "bold", marginBottom: "0" }}>Total: £{totalPrice}</p>
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

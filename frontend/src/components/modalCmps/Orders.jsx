import { useEffect, useState } from "react";
import { fetchOrders } from "../../http.js";
import Button from "../../UI/Button.jsx";
import { toast } from "react-toastify";
import OrderItem from "../OrderItem.jsx";

export default function Orders({ onClose, onDelete }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      try {
        const data = await fetchOrders();
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          toast.error(data.message || "No orders found.");
        }
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        toast.error('Failed to fetch orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, []);

  if (loading) {
    return <p>Loading orders...</p>;
  }

  let content;

  if (orders.length === 0) {
    content = (
      <>
        <p style={{ color: "black" }}>There are no previous orders</p>
        <div className="modal-actions">
          <Button styling="orange-button" clickFn={onClose} btnText="Okay" />
        </div>
      </>
    );
    return content;
  }

  content = (
    <>
      <ul id="orders">
        {orders.map((order) => (
          <OrderItem
            key={order._id}
            orderDetails={order}
            onDelete={onDelete}
          />
        ))}
      </ul>
      <div className="modal-actions">
        <Button styling="text-button" clickFn={onClose} btnText="Close" />
      </div>
    </>
  );

  return content;
}

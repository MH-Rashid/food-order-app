export default function OrderItem({ orderDetails }) {
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
      <button className="orange-button">Reorder</button>
    </li>
  );
}

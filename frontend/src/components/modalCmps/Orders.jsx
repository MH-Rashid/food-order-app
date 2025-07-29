import Button from "../../UI/Button.jsx";
import OrderItem from "../OrderItem.jsx";

export default function Orders({ onReset }) {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  console.log(orders);

  let content;

  if (orders.length === 0) {
    content = (
      <>
        <p style={{ color: "black" }}>There are no previous orders</p>
        <div className="modal-actions">
          <Button styling="orange-button" clickFn={onReset} btnText="Okay" />
        </div>
      </>
    );
    return content;
  }

  content = (
    <>
      <ul id="orders">
        {orders.map((order) => (
          <OrderItem key={order.id} orderDetails={order} />
        ))}
      </ul>
      <div className="modal-actions">
        <Button
          styling="text-button"
          clickFn={onReset}
          btnText="Close"
        />
      </div>
    </>
  );

  return content;
}

import { useFetch } from "../../hooks/useFetch.jsx";
import { fetchOrders } from "../../http.js";
import ErrorMessage from "./ErrorMessage.jsx";
import OrderItem from "../OrderItem.jsx";

export default function Orders() {
  const {
    fetchedData: fetchedOrders,
    isFetching,
    error,
  } = useFetch(fetchOrders, []);

  return (
    <>
      {error && (
        <ErrorMessage title="An error occurred!" message={error.message} />
      )}
      {!error && isFetching && (
        <p className="fallback-text">Fetching orders...</p>
      )}
      {!error && !isFetching && (
        <ul id="orders">
          {fetchedOrders.map((order) => (
            <OrderItem key={order.id} orderDetails={order} />
          ))}
        </ul>
      )}
    </>
  );
}

import { toast } from "react-toastify";
import Button from "../Button.jsx";
import { deleteOrder } from "../../http.js";

export default function DeleteOrderConfirmation({
  onCancel,
  onClose,
  orderId,
}) {
  async function handleDelete() {
    try {
      const response = await deleteOrder(orderId);
      if (response.ok) {
        toast.success("Order deleted successfully");
        onClose();
      } else {
        toast.error(`${response.message}. Please try again later.`);
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred: " + (err.message || "Unknown error"));
    }
  }

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>
        Are you sure you want to delete this order?
      </h2>
      <div className="confirmation-modal-actions">
        <Button styling="text-button" clickFn={onCancel} btnText="Cancel" />
        <Button styling="orange-button" clickFn={handleDelete} btnText="Yes" />
      </div>
    </div>
  );
}

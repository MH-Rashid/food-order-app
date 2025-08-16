import { toast } from "react-toastify";
import Button from "../Button.jsx";
import { logout } from "../../http.js";

export default function LogoutConfirmation({ onClose, onLogout }) {
  async function handleLogout() {
    const response = await logout();
    
    if (response.ok) {
      toast.success("Logout successful.");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      onLogout();
      return;
    } else {
      toast.error("Logout failed: " + (response.message || "Unknown error"));
    }
  }

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Are you sure you want to log out?</h2>
      <div className="confirmation-modal-actions">
        <Button styling="text-button" clickFn={onClose} btnText="Cancel" />
        <Button styling="orange-button" clickFn={handleLogout} btnText="Yes" />
      </div>
    </div>
  );
}

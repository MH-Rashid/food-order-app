import { toast } from "react-toastify";
import Button from "../../UI/Button.jsx";

export default function LogoutConfirmation({ onClose, onLogout }) {
  function handleLogout() {
    fetch("http://localhost:3100/api/logout", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // ensures cookies are sent
    })
      .then(async (response) => {
        if (response.status === 204) {
          toast.success("Logout successful.");
          localStorage.removeItem("accessToken");
          onLogout();
          return;
        }

        const data = await response.json();
        if (data.message) {
          toast.success(data.message);
          localStorage.removeItem("accessToken");
          onLogout();
        } else {
          toast.error("Logout failed: " + (data.message || "Unknown error"));
        }
      })
      .catch((error) => {
        toast.error("An error occurred: " + (error.message || "Unknown error"));
      });
  }

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Are you sure you want to log out?</h2>
      <div className="logout-modal-actions">
        <Button styling="text-button" clickFn={onClose} btnText="Cancel" />
        <Button styling="orange-button" clickFn={handleLogout} btnText="Yes" />
      </div>
    </div>
  );
}

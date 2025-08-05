import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

export default function AuthForm({onClose}) {
  const [formType, setFormType] = useState("login");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    // Reset form data when form type changes
    setFormData({
      email: "",
      password: "",
      confirmPassword: formType === "register" ? "" : "",
    });

    setErrorMessage("");
  }, [formType]);

  useEffect(() => {
    // Check if passwords match when form type is register
    if (formType === "register" && formData.confirmPassword) {
      if (formData.password !== formData.confirmPassword) {
        setErrorMessage("Passwords do not match.");
      } else {
        setErrorMessage("");
      }
    }
  }, [formData.confirmPassword, formData.password, formType]);

  console.log("errorMessage", errorMessage);

  const handleSubmit = (event) => {
    if (formType === "login") {
      event.preventDefault();
      console.log("Logging in with:", formData);

      fetch("http://localhost:3100/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: formData.email,
          pwd: formData.password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.accessToken) {
            toast.success("Login successful. Welcome back!");
            onClose();
          } else {
            toast.error("Login failed: " + (data.message || "Unknown error"));
          }
        })
        .catch((error) => {
          toast.error("An error occurred: " + (error.message || "Unknown error"));
        });
    } else {
      event.preventDefault();
      console.log("Registering with:", formData);

      fetch("http://localhost:3100/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: formData.email,
          pwd: formData.password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            toast.success("Registration successful. Please log in.");
            setFormType("login");
          } else {
            toast.error("Registration failed: " + (data.message || "Unknown error"));
          }
        })
        .catch((error) => {
          toast.error("An error occurred: " + (error.message || "Unknown error"));
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2 style={{marginTop: 0}}>{formType === "login" ? "Login" : "Register"}</h2>

      <div className="form-group">
        <label htmlFor="email">Your email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Your password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
          required
        />
      </div>

      {formType === "register" && (
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) => {
              setFormData({ ...formData, confirmPassword: e.target.value });
            }}
            required
          />
        </div>
      )}

      <button
        type="submit"
        className="auth-btn"
        disabled={!!errorMessage || !formData.email || !formData.password}
      >
        {formType === "login" ? "Login" : "Register"}
      </button>

      <p style={{ fontWeight: "bold" }}>
        <a
          href="#"
          onClick={() =>
            setFormType(formType === "login" ? "register" : "login")
          }
        >
          {formType === "login"
            ? "Create new account"
            : "Login with existing account"}
        </a>
      </p>

      {errorMessage && <p className="auth-error-message">{errorMessage}</p>}
    </form>
  );
}

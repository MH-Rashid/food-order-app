import '../../styles/authForm.css';
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../../store/app-context.jsx";
import { fetchAvailableMeals, login, registerUser } from "../../http.js";

export default function AuthForm({ onClose }) {
  const [formType, setFormType] = useState("login");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { setUser, setMeals } = useContext(AppContext);

  useEffect(() => {
    // Reset form data when form type changes
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
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

  const isDisabled = () => {
    if (formType === "login") {
      return !!errorMessage || !formData.email || !formData.password;
    }

    if (formType === "register") {
      return (
        !!errorMessage ||
        !formData.firstname ||
        !formData.lastname ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword
      );
    }

    return false;
  };

  const handleSubmit = async (event) => {
    if (formType === "login") {
      event.preventDefault();

      const userData = {
        user: formData.email,
        pwd: formData.password,
      };

      const result = await login(userData);
      if (result.accessToken) {
        localStorage.setItem("accessToken", result.accessToken);
        localStorage.setItem("user", JSON.stringify(result.user));
        toast.success(`Login successful. Welcome, ${result.user.firstname}`);
        setUser({
          accessToken: result.accessToken,
          firstname: result.user.firstname,
          lastname: result.user.lastname,
          username: result.user.username,
        });
        const response = await fetchAvailableMeals();
        if (Array.isArray(response)) {
          setMeals(response);
          onClose();
        } else {
          toast.error(response.message || "Failed to fetch meals.");
        }
      } else {
        toast.error("Login failed: " + (result.message || "Unknown error"));
      }
    } else {
      event.preventDefault();
      const userData = {
        first: formData.firstname,
        last: formData.lastname,
        user: formData.email,
        pwd: formData.password,
      };

      const result = await registerUser(userData);

      if (result.success) {
        toast.success("Registration successful. Please log in.");
        setFormType("login");
      } else {
        toast.error(
          "Registration failed: " + (result.message || "Unknown error")
        );
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2 style={{ marginTop: 0 }}>
        {formType === "login" ? "Login" : "Register"}
      </h2>

      {formType === "register" && (
        <>
          <div className="auth-form-group">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={(e) => {
                setFormData({ ...formData, firstname: e.target.value });
              }}
              required
            />
          </div>
          <div className="auth-form-group">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={(e) => {
                setFormData({ ...formData, lastname: e.target.value });
              }}
              required
            />
          </div>
        </>
      )}

      <div className="auth-form-group">
        <label htmlFor="email">Email</label>
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
      <div className="auth-form-group">
        <label htmlFor="password">Password</label>
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
        <div className="auth-form-group">
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

      <button type="submit" className="auth-btn" disabled={isDisabled()}>
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

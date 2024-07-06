import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import API_URL from "../Config/config";

const RegisterForm = ({ onClose, onRegisterSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        duration: 3000,
      });
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Invalid email format. Please enter a valid email.", {
        duration: 3000,
      });
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.", {
        duration: 3000,
      });
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/register`, {
        email,
        password,
        role: "USER",
        status: true,
        name,
      });
      onClose();
      onRegisterSuccess();
      toast.success("Registration successful", {
        duration: 3000,
      });
    } catch (error) {
      console.error("Registration failed:", error.response.data);
      toast.error("Registration failed. Please try again.", {
        duration: 3000,
      });
    }
  };

  return (
    <div className="LoginForm">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <div className="heading">Register</div>
          <button
            style={{
              border: "none",
              backgroundColor: "#f4f7fb",
              height: "100%",
            }}
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <div className="input-container">
            <input
              required
              className="input"
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-container">
            <input
              required
              className="input"
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-container position-relative">
            <input
              required
              className="input"
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="eye-icon-container">
              {!showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-eye-fill"
                  viewBox="0 0 16 16"
                  onClick={() => setShowPassword(!showPassword)}
                  cursor={"pointer"}
                >
                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-eye-slash-fill"
                  viewBox="0 0 16 16"
                  onClick={() => setShowPassword(!showPassword)}
                  cursor={"pointer"}
                >
                  <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
                  <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                </svg>
              )}
            </div>
          </div>
          <div className="input-container position-relative">
            <input
              required
              className="input"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="eye-icon-container">
              {!showConfirmPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  // className="position-absolute end-0 top-50 translate-middle-x"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-eye-fill"
                  viewBox="0 0 16 16"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  cursor={"pointer"}
                >
                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  // className="position-absolute end-0 top-50 translate-middle-x"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-eye-slash-fill"
                  viewBox="0 0 16 16"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  cursor={"pointer"}
                >
                  <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
                  <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                </svg>
              )}
            </div>
          </div>
          <input className="register-button" type="submit" value="Register" />
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

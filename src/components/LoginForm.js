import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const LoginForm = ({ onClose, setToken, onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:9292/login", {
        email,
        password,
      });
      const token = response.data.token;
      sessionStorage.setItem("token", token);
      window.dispatchEvent(new Event("storage"));
      setToken(token);
      onClose();
      toast.success("Login successful", {
        duration: 3000,
      });
    } catch (error) {
      // console.error('Login failed:', error.response.data);
      toast.error("Invalid email or password. Please try again.", {
        duration: 3000,
      });
    }
  };

  return (
    <div className="LoginForm">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <div className="heading">Log In</div>
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
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-container">
            <input
              required
              className="input"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input className="login-button" type="submit" value="Log In" />
          <span>OR</span>
          <input
            className="register-button"
            type="submit"
            value="Register"
            onClick={onRegister}
          />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

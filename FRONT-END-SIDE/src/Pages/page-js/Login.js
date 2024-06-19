import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../page-css/Login.css";
import { FaBackward } from "react-icons/fa";
import Header from "../../components/components-js/Header";

export default function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  async function loginHandler(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/user/login", {
        email: loginEmail,
        password: loginPassword
      });

      // Store JWT token in localStorage
      localStorage.setItem('token', response.data.token);

      setSuccessMessage("Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/MenuAndOrder");
      }, 2000);
    } catch (err) {
      setError(err.response.data.message);
      setTimeout(() => setError(""), 4000); // Clear error message after 4 seconds
    }
  }

  return (
    <>
      <Header />
      <div className="loginAndRegister">
        <form onSubmit={loginHandler}>
          <div className="registerLoginForm">
            <Link to="/UserRegister">
              <FaBackward />
            </Link>
            <h2>Login</h2>

            <label>Email Address:</label><br />
            <input
              className="loginEmail"
              type="text"
              placeholder="Enter Email Account"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <br />

            <label>Password:</label><br />
            <input
              className="loginPassword"
              type="password"
              placeholder="Enter password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <br />

            <button className="loginButton" type="submit">
              Login
            </button>

            {error && <p className="error">{error}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
          </div>
        </form>
      </div>
    </>
  );
}

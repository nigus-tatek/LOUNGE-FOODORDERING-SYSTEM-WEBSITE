import "../page-css/Admin.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const navigate = useNavigate();

  function loginHandler(e) {
    e.preventDefault(); // Prevent default form submission behavior

    // Validation check
    if (loginEmail === "n@gmail.com" && loginPassword === "12345") {
      setSuccess("Login successful!");
      setTimeout(() => {
        setSuccess("");
        navigate("/Orders"); // Redirect to Orders page upon successful login
      }, 3000); // Display success message for 3 seconds
    } else {
      setError("Invalid email or password. Please try again.");
      // Clear the error message after 3 seconds
      setTimeout(() => setError(""), 3000);
    }
  }

  const toggleLoginVisibility = () => {
    setIsLoginVisible(!isLoginVisible);
  };

  return (
    <>
      <div className="loginAndRegister">
        <button className="toggleLoginButton" onClick={toggleLoginVisibility}>
          {isLoginVisible ? "X" : " Login"}
        </button>
        {isLoginVisible && (
          <form onSubmit={loginHandler}>
            <div className="registerLoginForm">
              <h2>admin login Form</h2>
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
              <button type="submit" className="loginButton">Login</button>
              {error && <p className="error">{error}</p>}
              {success && <p className="success">{success}</p>}
            </div>
          </form>
        )}
      </div>
    </>
  );
}


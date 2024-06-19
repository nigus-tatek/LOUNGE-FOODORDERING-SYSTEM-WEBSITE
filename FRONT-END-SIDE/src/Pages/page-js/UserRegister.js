import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../page-css/UserRegister.css";
import { FaBackward } from "react-icons/fa";
import Header from '../../components/components-js/Header';

export default function UserRegister() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Function to handle form submission
  async function buttonHandler(e) {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match"); // Set error message if passwords don't match
      setTimeout(() => setError(""), 4000); // Clear error message after 4 seconds
      return; // Exit function if passwords don't match
    }

    try {
      const response = await axios.post("http://localhost:5000/api/user/register", {
        firstName,
        lastName,
        email,
        password,
        address
      });
      console.log(response.data);
      setSuccessMessage("Registration successful! Redirecting...");
      setTimeout(() => {
        navigate("/Login");
      }, 2000); // Navigate to Login page after 2 seconds
    } catch (err) {
      setError(err.response.data.message);
      setTimeout(() => setError(""), 4000); // Clear error message after 4 seconds
    }
  }

  return (
    <>
      <Header />
      <div className="fullUserRegister">
        <div className="loginAndRegister">
          <form onSubmit={buttonHandler}>
            <div className="registerForm">
              <Link to="/Menu">
                <FaBackward />
              </Link>
              <h2>User Registration Form</h2>

              <label>First Name:</label><br />
              <input
                className="registerFname"
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <br />

              <label>Last Name:</label><br />
              <input
                className="registerLname"
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <br />

              <label>Email Address:</label><br />
              <input
                className="registerEmail"
                type="email"
                placeholder="Enter Email Account"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />

              <label>Password:</label><br />
              <input
                className="registerPassword"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />

              <label>Confirm Password:</label><br />
              <input
                className="registerPassword"
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <br />

              <label>Address:</label><br />
              <input
                className="registerAddress"
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <br />

              <button className="registerButton" type="submit">
                Sign Up
              </button>

              {error && <p className="error">{error}</p>}
              {successMessage && <p className="success">{successMessage}</p>}

              <p className="if">If you have an account,</p>
              <Link to="/login" className="userRegisterLogin">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

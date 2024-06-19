import React, { useState } from "react";
import axios from "axios";
import "../page-css/UserAccount.css";

const UserAccount = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("http://localhost:5000/api/user/update", {
        email,
        firstName,
        lastName,
        password,
        address,
      });
      setMessage(response.data.message);
      setTimeout(() => setMessage(""), 4000); // Clear message after 4 seconds
    } catch (error) {
      console.error(error);
      setMessage("Error updating user");
      setTimeout(() => setMessage(""), 4000); // Clear message after 4 seconds
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete("http://localhost:5000/api/user/delete", { data: { email } });
      setMessage(response.data.message);
      setTimeout(() => setMessage(""), 4000); // Clear message after 4 seconds
    } catch (error) {
      console.error(error);
      setMessage("Error deleting user");
      setTimeout(() => setMessage(""), 4000); // Clear message after 4 seconds
    }
  };

  return (
    <div className="user-account-container">
      <h2>User Account</h2>
      <form onSubmit={handleUpdate} className="user-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="update-button">Update Account</button>
      </form>
      <button onClick={handleDelete} className="delete-button">Delete Account</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default UserAccount;

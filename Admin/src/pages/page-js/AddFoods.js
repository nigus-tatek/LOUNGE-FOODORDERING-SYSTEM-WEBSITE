import React, { useState } from "react";
import axios from "axios";
import "../page-css/AddFoods.css";
import AdminSidebar from '../../components/component-Js/AdminSidebar';

export default function AddFoods() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Add state for success message

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", image);

    try {
      const response = await axios.post("http://localhost:5000/api/items/add", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      setSuccessMessage("Food item added successfully!"); // Set success message
      setError(""); // Clear any existing error message
      setName("");
      setDescription("");
      setPrice("");
      setImage(null);
    } catch (err) {
      setError(err.response.data.message);
      setSuccessMessage(""); // Clear any existing success message
    }
  }

  return (
    <> 
      <AdminSidebar />
      <div className="AddFoodFull">
        <div className="addFood">
          <form onSubmit={handleSubmit}>
            <div className="addFoodForm">
              <h2>Add Food Item</h2>
              
              <label>Name:</label><br />
              <input
                className="foodName"
                type="text"
                placeholder="Enter food name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <br />
              
              <label>Description:</label><br />
              <input
                className="foodDescription"
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <br />
              
              <label>Price:</label><br />
              <input
                className="foodPrice"
                type="text"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <br />

              <label>Image:</label><br />
              <input
                className="foodImage"
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <br />
              
              <button className="addButton" type="submit">
                Add Food
              </button>

              {successMessage && <p className="success-message">{successMessage}</p>}
              {error && <p className="error">{error}</p>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

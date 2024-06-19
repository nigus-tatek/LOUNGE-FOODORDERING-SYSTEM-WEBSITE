
import React, { useState } from 'react';
import axios from 'axios';
import '../page-css/EditModal.css';

const EditModal = ({ item, onClose, onSave }) => {
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(item.price);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/items/edit/${item._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      setSuccessMessage("Item updated successfully!");
      setError("");
      onSave({ ...item, name, description, price, image: image ? response.data.image : item.image });
      setTimeout(() => {
        setSuccessMessage(""); // Clear the success message
        onClose();
      }, 2000); // Close modal after 2 seconds
    } catch (err) {
      const message = err.response?.data?.message || "An error occurred";
      setError(message);
      setSuccessMessage("");
    }
  };

  return (
    <div className="editModal-overlay">
      <div className="editModal">
        <h2>Edit Food Item</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:</label><br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          /><br />
          <label>Description:</label><br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          /><br />
          <label>Price:</label><br />
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          /><br />
          <label>Image:</label><br />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          /><br />
          <button type="submit">Update Item</button>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {error && <p className="error">{error}</p>}
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default EditModal;

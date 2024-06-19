import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from '../../components/component-Js/AdminSidebar';
import EditModal from '../page-js/EditModal';
import '../page-css/List.css';
import { FaEdit } from 'react-icons/fa';

const List = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [hiddenItems, setHiddenItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/items/fetch')
      .then(response => {
        setMenuItems(response.data.filter(item => item.isVisible));
        setHiddenItems(response.data.filter(item => !item.isVisible));
      })
      .catch(error => {
        console.error('Error fetching menu items:', error);
      });
  }, []);

  const removeItem = (id) => {
    axios.delete(`http://localhost:5000/api/items/a${id}`)
      .then(() => {
        setMenuItems(menuItems.filter(item => item._id !== id));
        setHiddenItems(hiddenItems.filter(item => item._id !== id));
      })
      .catch(error => {
        console.error('Error removing item:', error);
      });
  };

  const toggleVisibility = (id) => {
    axios.put(`http://localhost:5000/api/items/toggle-visibility/${id}`)
      .then(() => {
        setMenuItems(menuItems.map(item =>
          item._id === id ? { ...item, isVisible: !item.isVisible } : item
        ));
        setHiddenItems(hiddenItems.map(item =>
          item._id === id ? { ...item, isVisible: !item.isVisible } : item
        ));
      })
      .catch(error => {
        console.error('Error toggling visibility:', error);
      });
  };

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleSave = (updatedItem) => {
    axios.put(`http://localhost:5000/api/items/${updatedItem._id}`, updatedItem)
      .then(() => {
        setMenuItems(menuItems.map(item => item._id === updatedItem._id ? updatedItem : item));
        setHiddenItems(hiddenItems.map(item => item._id === updatedItem._id ? updatedItem : item));
        setEditingItem(null);
      })
      .catch(error => {
        console.error('Error saving item:', error);
      });
  };

  return (
    <>
      <AdminSidebar />
      <div className='ListFull'>
        <div className="adminMenu-page">
          <h1>Menu</h1>
          <div className="adminMenu-container">
            <h2>Visible Items</h2>
            <table className="adminMenu-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {menuItems.map(item => (
                  <tr key={item._id}>
                    <td><img src={`http://localhost:5000/uploads/${item.image}`} alt={item.name} className="adminMenu-image" /></td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.price} birr</td>
                    <td>
                      <button className="adminRemove-button" onClick={() => removeItem(item._id)}>Remove</button>
                      <button className="adminToggle-button" onClick={() => toggleVisibility(item._id)}>Hide</button>
                      <button className="adminEdit-button" onClick={() => handleEdit(item)}><FaEdit /> Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2>Hidden Items</h2>
            <table className="adminMenu-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {hiddenItems.map(item => (
                  <tr key={item._id}>
                    <td><img src={`http://localhost:5000/uploads/${item.image}`} alt={item.name} className="adminMenu-image" /></td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.price} birr</td>
                    <td>
                      <button className="adminRemove-button" onClick={() => removeItem(item._id)}>Remove</button>
                      <button className="adminToggle-button" onClick={() => toggleVisibility(item._id)}>Show</button>
                      <button className="adminEdit-button" onClick={() => handleEdit(item)}><FaEdit /> Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {editingItem && (
          <EditModal
            item={editingItem}
            onSave={handleSave}
            onClose={() => setEditingItem(null)}
          />
        )}
      </div>
    </>
  );
};

export default List;

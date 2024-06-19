import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../page-css/FakeMenu.css';
import { Link } from "react-router-dom";
import Header from '../../components/components-js/Header';

const FakeMenu = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/items/fetch');
      setMenuItems(response.data.filter(item => item.isVisible));
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  return (
  <>
  <Header/>
    <div className="menu-container">
      <h2>Explore our Menu</h2>
      <div className="menu-grid">
        {menuItems.map(item => (
          <div key={item._id} className="menu-card">
            <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.name} className="menu-image" />
            <div className="menu-details">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p className="menu-price">{item.price} Birr</p>
            </div>
          </div>
        ))}
      </div>
      <div className='DoYouWant'>
        <p className='TTT'>Do You Want to order? First Register</p>
        <div className="HomeTo">
          <Link to="/UserRegister">
            <h1>Register now</h1>
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default FakeMenu;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import MenuCard from '../page-js/MenuCard';
import '../page-css/Menu.css';
import Header from '../../components/components-js/Header2';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [rating, setRating] = useState({});
  const [message, setMessage] = useState(''); // State to store the message

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/items/fetch');
      // Filter out items based on isVisible property
      setMenuItems(response.data.filter(item => item.isVisible));
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const incrementQuantity = (id) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [id]: (prevQuantities[id] || 0) + 1,
    }));
  };

  const decrementQuantity = (id) => {
    setQuantities(prevQuantities => {
      const newQuantities = { ...prevQuantities };
      if (newQuantities[id] > 0) {
        newQuantities[id] -= 1;
      }
      return newQuantities;
    });
  };

  const addToCart = (item) => {
    const quantity = quantities[item._id] || 1;
    axios.post('http://localhost:5000/api/Cart/cart', {
      _id: item._id,
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
      quantity,
    })
    .then(response => {
      console.log('Item added to cart:', response.data);
      setMessage('Successfully added to cart.'); // Set success message
      setTimeout(() => {
        setMessage(''); // Clear message after 3 seconds
      }, 3000);
    })
    .catch(error => {
      console.error('Error adding item to cart:', error);
    });
  };

  const handleRating = (itemId, value) => {
    setRating(prevRating => ({
      ...prevRating,
      [itemId]: value,
    }));
    console.log('Rated:', value);
  };

  return (<>
  <Header/>
    <div className="userMenu-page">
 
      
      <h1>Explore Our Menu</h1>
      
      {message && <div className="success-message">{message}</div>} {/* Display success message */}
      
      <div className="userMenu-container">
        {menuItems.map(item => (
          <MenuCard
            key={item._id}
            item={item}
            quantity={quantities[item._id] || 0}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
            addToCart={addToCart}
            rating={rating[item._id] || 0}
            onRate={(value) => handleRating(item._id, value)}
          />
        ))}
      </div>
     
      <div className="GotoCartPage">
        <Link to="/Cart">
          <p>Goto Cart Page</p>
        </Link>
      </div>
    </div>
    </>
  );
};

export default Menu;

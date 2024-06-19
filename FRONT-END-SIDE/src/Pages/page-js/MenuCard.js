import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../page-css/MenuCard.css';
import { FaStar } from 'react-icons/fa';

const MenuCard = ({ item, quantity, incrementQuantity, decrementQuantity, addToCart }) => {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');

  const handleRating = (value) => {
    setRating(value);
    console.log('Rated:', value);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={i <= rating ? 'star rated' : 'star'}
          onClick={() => handleRating(i)}
        />
      );
    }
    return stars;
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    setMessage('Successfully added to cart.');
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  return (
    <div className="userMenu-card">
      <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.name} className="userMenu-image" />
      <div className="userMenu-details">
        <h2>{item.name}</h2>
        <p>{item.description}</p>
        <p>Price: {item.price} Birr</p>
        <div className="star-rating">
          {renderStars()}
        </div>
        <div className="userQuantity-controls">
          <button onClick={() => decrementQuantity(item._id)}>-</button>
          <span>{quantity}</span>
          <button onClick={() => incrementQuantity(item._id)}>+</button>
        </div>
        <button className="userAdd-to-cart" onClick={() => handleAddToCart(item)}>Add to Cart</button>
        {message && <p className="success-message">{message}</p>}
      </div>
    </div>
  );
};

MenuCard.propTypes = {
  item: PropTypes.object.isRequired,
  quantity: PropTypes.number.isRequired,
  incrementQuantity: PropTypes.func.isRequired,
  decrementQuantity: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default MenuCard;

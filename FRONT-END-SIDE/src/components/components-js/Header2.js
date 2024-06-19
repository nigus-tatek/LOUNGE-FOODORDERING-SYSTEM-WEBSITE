import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { TbSearch } from "react-icons/tb";
import axios from 'axios';
import '../components-css/Header.css';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [cartMessages, setCartMessages] = useState({});
  const [noResultsMessage, setNoResultsMessage] = useState("");

  const fetchSearchResults = useCallback(async () => {
    if (searchTerm.trim() !== "") {
      try {
        const response = await axios.get(`http://localhost:5000/api/items/getch?name=${searchTerm}`);
        if (response.data.length > 0) {
          setSearchResults(response.data);
          setNoResultsMessage("");
        } else {
          setSearchResults([]);
          setNoResultsMessage("Menu item does not exist.");
          setTimeout(() => {
            setNoResultsMessage("");
            setSearchTerm("");
          }, 4000);
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchSearchResults();
  };

  const handleIncrement = (index) => {
    const updatedResults = [...searchResults];
    updatedResults[index].quantity = (updatedResults[index].quantity || 0) + 1;
    setSearchResults(updatedResults);
  };

  const handleDecrement = (index) => {
    const updatedResults = [...searchResults];
    if (updatedResults[index].quantity > 0) {
      updatedResults[index].quantity -= 1;
      setSearchResults(updatedResults);
    }
  };

  const handleAddToCart = (item) => {
    const quantity = item.quantity || 1;
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
      setCartMessages(prev => ({ ...prev, [item._id]: "Successfully added to cart." }));
      setTimeout(() => {
        setCartMessages(prev => ({ ...prev, [item._id]: "" }));
      }, 4000);
    })
    .catch(error => {
      console.error('Error adding item to cart:', error);
      setCartMessages(prev => ({ ...prev, [item._id]: "Error adding item to cart." }));
      setTimeout(() => {
        setCartMessages(prev => ({ ...prev, [item._id]: "" }));
      }, 4000);
    });
  };

  return (
    <>
      <div className="headerAll">
        <div className="logo-and-search">
          <div className="logo">Lounge</div>
          <form onSubmit={handleSearch} className="search">
            <input
              className="searchInput"
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="searchButton">
              <TbSearch />
            </button>
          </form>
        </div>

        <nav className="navBar">
          <Link className="link" to="/MenuAndOrder">
            Menu
          </Link>
          
          <Link className="link" to="/UserRegister">
            <button>LogOut</button> 
          </Link>
        </nav>
      </div>

      {noResultsMessage && (
        <div className="noResultsMessage">
          <p>{noResultsMessage}</p>
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="searchResults">
          <h3>Search Results:</h3>
          <ul>
            {searchResults.map((item, index) => (
              <li key={item._id}>
                <div className="Menu-card">
                  <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.name} className="Menu-image" />
                  <div className="Menu-details">
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                    <p>Price: {item.price} Birr </p>
                    <div className="Quantity-control">
                      <button className="Quantity-btn" onClick={() => handleDecrement(index)}>-</button>
                      <span className="Quantity">{item.quantity || 0}</span>
                      <button className="Quantity-btn" onClick={() => handleIncrement(index)}>+</button>
                    </div>
                    <button className="Add-to-cart" onClick={() => handleAddToCart(item)}>Add to Cart</button>
                    {cartMessages[item._id] && <p className="cartMessage">{cartMessages[item._id]}</p>}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Header;



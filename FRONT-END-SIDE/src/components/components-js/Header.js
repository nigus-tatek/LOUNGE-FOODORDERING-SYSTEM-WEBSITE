import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TbSearch } from "react-icons/tb";
import axios from 'axios';
import '../components-css/Header.css';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noResultsMessage, setNoResultsMessage] = useState(""); // State for no results message

  const fetchSearchResults = () => {
    if (searchTerm.trim() !== "") {
      axios.get(`http://localhost:5000/api/items/getch?name=${searchTerm}`)
        .then(response => {
          if (response.data.length > 0) {
            setSearchResults(response.data);
            setNoResultsMessage(""); // Clear message if results are found
          } else {
            setSearchResults([]);
            setNoResultsMessage("Menu item does not exist."); // Set no results message
            setTimeout(() => {
              setNoResultsMessage(""); // Clear message after a few seconds
            }, 4000);
          }
        })
        .catch(error => {
          console.error('Error fetching search results:', error);
        });
    } else {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    fetchSearchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchSearchResults();
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
          <Link className="link" to="/">
            Home
          </Link>
          <Link className="link" to="/Menu">
            Menu
          </Link>
          <Link className="link" to="/About">
            About
          </Link>
          <Link className="link" to="/Contact">
            Contact
          </Link>
          <Link className="link" to="/UserRegister">
            <button>Sign Up</button>
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
            {searchResults.map((item) => (
              <li key={item._id}>
                <div className="Menu-card">
                  <img
                    src={`http://localhost:5000/uploads/${item.image}`}
                    alt={item.name}
                    className="Menu-image"
                  />
                  <div className="Menu-details">
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                    <p>Price: {item.price} Birr</p>
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

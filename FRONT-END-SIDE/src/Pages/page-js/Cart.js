import React, { useEffect, useState } from 'react';
import axios from 'axios';

import '../page-css/Cart.css';

import Header from '../../components/components-js/Header2';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [paymentData, setPaymentData] = useState({
    emailOrPhoneNumber: '',
    totalAmount: 0,
    paymentScreenshot: null
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [alertMessages, setAlertMessages] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cart/fetch');
        setCart(response.data);
        const total = response.data.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setPaymentData(prevState => ({ ...prevState, totalAmount: total }));
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCart();
    fetchOrderStatuses();
  }, []);

  const fetchOrderStatuses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/order-status/');
      if (response.data && response.data.length > 0) {
        const approvedStatuses = response.data.filter(status => status.status === 'approved').map(status => ({
          orderId: status.orderId,
          message: status.message
        }));
        const rejectedStatuses = response.data.filter(status => status.status === 'rejected').map(status => ({
          message: status.message
        }));
        setAlertMessages([...approvedStatuses, ...rejectedStatuses]);
      }
    } catch (error) {
      console.error('Error fetching order statuses:', error);
    }
  };

  const removeFromCart = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/m${id}`);
      const newCart = cart.filter(item => item._id !== id);
      setCart(newCart);
      const newTotal = newCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
      setPaymentData(prevState => ({ ...prevState, totalAmount: newTotal }));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setPaymentData(prevState => ({
      ...prevState,
      paymentScreenshot: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    if (paymentData.totalAmount !== cartTotal) {
      setErrorMessage('Total amount does not match cart total');
      return;
    }

    const formData = new FormData();
    formData.append('emailOrPhoneNumber', paymentData.emailOrPhoneNumber);
    formData.append('totalAmount', paymentData.totalAmount);
    formData.append('paymentScreenshot', paymentData.paymentScreenshot);
    formData.append('cart', JSON.stringify(cart));

    try {
      await axios.post('http://localhost:5000/api/orders/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Clear the cart on the backend
      await axios.delete('http://localhost:5000/api/cart/clear');

      setSuccessMessage('Order placed successfully!');
      setErrorMessage('');
      setCart([]);
      setPaymentData({
        emailOrPhoneNumber: '',
        totalAmount: 0,
        paymentScreenshot: null
      });
    } catch (error) {
      console.error('Error placing order:', error);
      setErrorMessage('Error placing order');
    }
  };

  const handleAlertOk = async () => {
    try {
      // Delete all order statuses from the database
      await axios.delete('http://localhost:5000/api/order-status/');
      setAlertMessages([]);
    } catch (error) {
      console.error('Error deleting order statuses:', error);
    }
  };

  return (
    <>
      <Header />
      <div className='allCartPageContainer'>
        <div className="fullCartPage">
          <div className="cart">
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              cart.map(item => (
                <div key={item._id} className="cart-item">
                  <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.name} className="cart-image" />
                  <div className="cart-details">
                    <h3>{item.name}</h3>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: {item.price * item.quantity} Birr</p>
                    <button className="remove-from-cart" onClick={() => removeFromCart(item._id)}>Remove</button>
                  </div>
                </div>
              ))
            )}
            <p>Total: {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)} Birr</p>
          </div>
          <div>
            <div className="paymentFormInformation">
              <h1>Account Numbers</h1>
              1, Comertial bank of Ethiopia 1000406776836<br />
              2, buna bank 123456789<br />
              3, awash bank 12345654234657
            </div>
            <div className="paymentForm">
              <h2>Payment Information</h2>
              <form onSubmit={handleSubmit}>
                <label htmlFor="emailOrPhoneNumber">Email or Phone Number</label>
                <input
                  type="text"
                  name="emailOrPhoneNumber"
                  placeholder="Enter your email or phone number"
                  value={paymentData.emailOrPhoneNumber}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="paymentScreenshot">Payment Screenshot</label>
                <input
                  type="file"
                  name="paymentScreenshot"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                />
                <button type="submit">Place Order</button>
              </form>
              {successMessage && <p className="success">{successMessage}</p>}
              {errorMessage && <p className="error">{errorMessage}</p>}
            </div>
          </div>
        </div>
      </div>
      {alertMessages.length > 0 && (
        <div className="alert">
          {alertMessages.map((alert, index) => (
            <div key={index}>
              {alert.orderId && <p>{`Order ID: ${alert.orderId}, Message: ${alert.message}`}</p>}
              {!alert.orderId && <p>{alert.message}</p>}
            </div>
          ))}
          <button onClick={handleAlertOk}>OK</button>
        </div>
      )}
    </>
  );
};

export default Cart;

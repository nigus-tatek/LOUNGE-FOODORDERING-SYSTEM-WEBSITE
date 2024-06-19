import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../page-css/FoodOrders.css';
import AdminSidebar from '../../components/component-Js/AdminSidebar';

const FoodOrder = () => {
  const [orders, setOrders] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [readyTime, setReadyTime] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orders/orders');
      setOrders(response.data.reverse()); // Reverse the order to show latest orders first
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const removeOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/orders/delete${id}`);
      setOrders(orders.filter(order => order._id !== id));
      showPopupMessage('Order removed successfully.');
    } catch (error) {
      console.error('Error removing order:', error);
      showPopupMessage('Error removing order.');
    }
  };

  const approveOrder = async (orderId, contactInfo) => {
    try {
      await axios.post('http://localhost:5000/api/order-status/approve', { orderId, readyTime, contactInfo });
      setModalVisible(false);
      showPopupMessage('Order approved and status saved.');
    } catch (error) {
      console.error('Error approving order:', error);
      showPopupMessage('Error approving order.');
    }
  };

  const rejectOrder = async (orderId, contactInfo) => {
    try {
      await axios.post('http://localhost:5000/api/order-status/reject', { orderId, contactInfo });
      showPopupMessage('Order rejected and status saved.');
    } catch (error) {
      console.error('Error rejecting order:', error);
      showPopupMessage('Error rejecting order.');
    }
  };

  const openApproveModal = (orderId, contactInfo) => {
    setModalContent({ orderId, contactInfo });
    setModalVisible(true);
  };

  const showPopupMessage = (message) => {
    setPopupMessage(message);
    setPopupVisible(true);
    setTimeout(() => {
      setPopupVisible(false);
    }, 4000); // Hide popup after 4 seconds
  };

  return (
    <>
      <AdminSidebar />
      <div className='FullOrderPage'>
        <div className="orderPage">
          <h1>Food Orders</h1>
          <div className="adminOrders-container">
            <table className="adminOrders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Order Date</th>
                  <th>Email/Phone</th>
                  <th>Total Amount</th>
                  <th>Items</th>
                  <th>Payment Screenshot</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                    <td>{order.emailOrPhoneNumber}</td>
                    <td>{order.totalAmount} Birr</td>
                    <td>
                      <ul>
                        {order.items.map(item => (
                          <li key={item._id}>
                            <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.name} className="orderItemImage" />
                            {item.name} - {item.quantity} x {item.price} Birr
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      {order.paymentScreenshot && (
                        <img src={`http://localhost:5000/uploads/${order.paymentScreenshot}`} alt="Payment Screenshot" className="paymentScreenshotImage" />
                      )}
                    </td>
                    <td>
                      <button className="adminRemove-button" onClick={() => removeOrder(order._id)}>Remove Order</button>
                      <button className="adminApprove-button" onClick={() => openApproveModal(order._id, order.emailOrPhoneNumber)}>Approve</button>
                      <button className="adminReject-button" onClick={() => rejectOrder(order._id, order.emailOrPhoneNumber)}>Reject</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <h2>Approve Order</h2>
            <p>Enter the ready time:</p>
            <input
              type="text"
              value={readyTime}
              onChange={(e) => setReadyTime(e.target.value)}
              placeholder="Ready time (e.g., 30 minutes)"
            />
            <button onClick={() => approveOrder(modalContent.orderId, modalContent.contactInfo)}>Approve</button>
            <button onClick={() => setModalVisible(false)}>Cancel</button>
          </div>
        </div>
      )}
      {popupVisible && (
        <div className="popup">
          <div className="popup-content">
            <p>{popupMessage}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default FoodOrder;

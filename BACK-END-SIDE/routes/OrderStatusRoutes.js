const express = require('express');
const router = express.Router();
const OrderStatus = require('../models/OrderStatus');

// Approve order
router.post('/approve', async (req, res) => {
  const { orderId, readyTime, contactInfo } = req.body;
  const message = `Your order is approved. It will be ready by ${readyTime}.`;

  try {
    const orderStatus = new OrderStatus({ orderId, status: 'approved', message, readyTime });
    await orderStatus.save();

    res.status(200).json({ message: 'Order approved and status saved.' });
  } catch (error) {
    res.status(500).json({ message: 'Error approving order', error });
  }
});

// Reject order
router.post('/reject', async (req, res) => {
  const { orderId, contactInfo } = req.body;
  const message = 'Your order is not approved.';

  try {
    const orderStatus = new OrderStatus({ orderId, status: 'rejected', message });
    await orderStatus.save();

    res.status(200).json({ message: 'Order rejected and status saved.' });
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting order', error });
  }
});

// Fetch all order statuses
router.get('/', async (req, res) => {
  try {
    const orderStatuses = await OrderStatus.find();
    res.status(200).json(orderStatuses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order statuses', error });
  }
});

// Delete all order statuses
router.delete('/', async (req, res) => {
  try {
    await OrderStatus.deleteMany({});
    res.status(200).json({ message: 'All order statuses deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order statuses', error });
  }
});

module.exports = router;

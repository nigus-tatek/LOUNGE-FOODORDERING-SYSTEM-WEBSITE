const express = require('express');
const multer = require('multer');
const path = require('path');
const Order = require('../models/order');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Route to handle order submissions
router.post('/submit', upload.single('paymentScreenshot'), async (req, res) => {
  const { cart, emailOrPhoneNumber, totalAmount } = req.body;
  const paymentScreenshot = req.file ? req.file.filename : null;

  try {
    const newOrder = new Order({
      emailOrPhoneNumber,
      totalAmount,
      paymentScreenshot,
      items: JSON.parse(cart)
    });
    await newOrder.save();
    res.status(200).send('Order and payment data saved successfully');
  } catch (error) {
    console.error('Error saving order and payment data:', error);
    res.status(500).send('Error saving order and payment data');
  }
});

// Route to fetch all orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).send('Error fetching orders');
  }
});

// Route to delete an order by ID
router.delete('/delete:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).send('Order not found');
    }
    res.status(200).send('Order deleted successfully');
  } catch (error) {
    res.status(500).send('Error deleting order');
  }
});

module.exports = router;

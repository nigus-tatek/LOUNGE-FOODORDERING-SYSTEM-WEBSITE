const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  emailOrPhoneNumber: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  paymentScreenshot: { type: String, required: true },
  items: [
    {
      name: { type: String, required: true },
      image: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

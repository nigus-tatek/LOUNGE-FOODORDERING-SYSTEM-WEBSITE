const mongoose = require('mongoose');

const orderStatusSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  status: { type: String, required: true }, // 'approved' or 'rejected'
  message: { type: String, required: true },
  readyTime: { type: String } // Optional field for ready time when approved
});

module.exports = mongoose.model('OrderStatus', orderStatusSchema);

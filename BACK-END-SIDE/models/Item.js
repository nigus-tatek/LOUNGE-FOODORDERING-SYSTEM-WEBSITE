// Item.js (Model)
const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
  },
  isVisible: {
    type: Boolean,
    default: true // Default to visible
  }
});

module.exports = mongoose.model('Item', ItemSchema);


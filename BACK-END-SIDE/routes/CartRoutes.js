const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Get all cart items
router.get('/fetch', async (req, res) => {
  try {
    const cartItems = await Cart.find();
    res.json(cartItems);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Add or update an item in the cart
router.post('/cart', async (req, res) => {
  const { _id, name, description, price, image, quantity } = req.body;

  try {
    let item = await Cart.findById(_id);
    if (item) {
      item.quantity += quantity;
      item = await item.save();
      return res.json(item);
    }

    item = new Cart({
      _id,
      name,
      description,
      price,
      image,
      quantity
    });

    item = await item.save();
    res.json(item);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Update item quantity
router.put('/:id', async (req, res) => {
  const { quantity } = req.body;

  try {
    let item = await Cart.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    item.quantity = quantity;
    item = await item.save();
    res.json(item);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Delete an item by ID

router.delete('/m:id', async (req, res) => {
  try {
    const item = await Cart.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }
    res.json({ msg: 'Item removed' });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Route to clear the cart
router.delete('/clear', async (req, res) => {
  try {
    await Cart.deleteMany(); // Delete all items from the cart collection
    res.status(200).send('Cart cleared');
  } catch (error) {
    res.status(500).send('Error clearing cart');
  }
});

module.exports = router;

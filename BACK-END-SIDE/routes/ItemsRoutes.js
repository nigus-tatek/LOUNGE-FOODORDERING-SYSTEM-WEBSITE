const express = require('express');
const multer = require('multer');
const path = require('path');
const Item = require('../models/Item');

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

// Delete an item by ID
router.delete('/a:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }
    res.json({ msg: 'Item removed' });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Route to add a new item
router.post('/add', upload.single('image'), async (req, res) => {
  const { name, description, price } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const item = new Item({ name, description, price, image });
    await item.save();
    res.status(201).send("Item added successfully");
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Route to get all items
router.get('/fetch', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Route to get all visible items
router.get('/fetch', async (req, res) => {
  try {
    const items = await Item.find({ isVisible: true });
    res.status(200).json(items);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});


// Route to get all items or search items by name
router.get('/getch', async (req, res) => {
  try {
    let items;
    if (req.query.name) {
      // Search items by name if query parameter is provided
      items = await Item.find({ name: { $regex: req.query.name, $options: 'i' } });
    } else {
      // Fetch all items if no query parameter is provided
      items = await Item.find();
    }
    res.status(200).json(items);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Route to edit an item by ID
router.put('/edit/:id', upload.single('image'), async (req, res) => {
  const { name, description, price } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    item.name = name || item.name;
    item.description = description || item.description;
    item.price = price || item.price;
    item.image = image || item.image;

    await item.save();
    res.json({ msg: 'Item updated successfully' });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
// Route to toggle item visibility
router.put('/toggle-visibility/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }
    item.isVisible = !item.isVisible;
    await item.save();
    res.json({ msg: 'Item visibility toggled successfully' });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;

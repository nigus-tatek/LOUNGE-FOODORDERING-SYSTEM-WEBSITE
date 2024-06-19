const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// Route to handle contact form submissions
router.post('/submit', async (req, res) => {
  const { name, email, subject, message } = req.body;

  const newContact = new Contact({ name, email, subject, message });

  try {
    await newContact.save();
    res.status(200).send('Contact data saved successfully');
  } catch (error) {
    res.status(500).send('Error saving contact data');
  }
});
// Route to get all contact messages
router.get('/messages', async (req, res) => {
  try {
    const messages = await Contact.find({});
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

module.exports = router;

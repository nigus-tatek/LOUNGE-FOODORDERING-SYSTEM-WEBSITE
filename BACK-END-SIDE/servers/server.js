const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
const dotenv = require('dotenv');
const multer = require('multer');
const userRoutes = require("../routes/userRoutes");
const itemsRoutes = require("../routes/ItemsRoutes");
const CartRoutes = require("../routes/CartRoutes");
const orderRoutes = require("../routes/orderRoutes");
const contactRoutes = require("../routes/ContactRoutes");
const OrderStatusRoutes= require("../routes/OrderStatusRoutes")
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/foodApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});



// Routes
app.use("/api/user", userRoutes);
app.use('/api/items', itemsRoutes);
app.use('/api/cart', CartRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/order-status', OrderStatusRoutes);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));










require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Define product schema and model
const productSchema = new mongoose.Schema({
  name: String,
  brand: String,
  weight: String,
  category: String,
  prices: [{
    platform: String,
    price: Number,
    lastUpdated: Date,
  }],
});

const Product = mongoose.model('Product', productSchema);

// API endpoint with search
app.get('/api/products', async (req, res) => {
  try {
    const { search } = req.query;
    let filter = {};
    if (search) {
      const regex = new RegExp(search, 'i');
      filter = {
        $or: [{ name: regex }, { brand: regex }, { category: regex }],
      };
    }
    const products = await Product.find(filter).limit(100);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

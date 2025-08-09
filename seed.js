require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

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

async function seed() {
  await Product.deleteMany({});
  await Product.insertMany([
    {
      name: 'Organic Bananas',
      brand: 'Fresh Farms',
      weight: '1 kg',
      category: 'Fruits',
      prices: [
        { platform: 'Instamart', price: 60, lastUpdated: new Date() },
        { platform: 'Zepto', price: 58, lastUpdated: new Date() },
        { platform: 'BigBasket', price: 62, lastUpdated: new Date() },
        { platform: 'Blinkit', price: 59, lastUpdated: new Date() },
      ],
    },
    {
      name: 'Brown Eggs',
      brand: 'Farm Fresh',
      weight: '12 pcs',
      category: 'Dairy & Eggs',
      prices: [
        { platform: 'Instamart', price: 120, lastUpdated: new Date() },
        { platform: 'Zepto', price: 115, lastUpdated: new Date() },
        { platform: 'BigBasket', price: 125, lastUpdated: new Date() },
        { platform: 'Blinkit', price: 118, lastUpdated: new Date() },
      ],
    },
    // Add more products here if you want
  ]);
  console.log('Database seeded!');
  mongoose.disconnect();
}

seed();

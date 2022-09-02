const mongoose = require('mongoose');

const Product = mongoose.model(
  'Product',
  new mongoose.Schema({
    name: String,
    desc: String,
    rating: String,
    price: Number,
    className: String,
    image: String,
    quantity: Number,
    shippingDays: Number,
    category: String,
    country: String,
    manuf: String,
    manufWeb: String,
    vendor: String,
    productCode: Array,
    comments: Array,
  })
);

module.exports = Product;

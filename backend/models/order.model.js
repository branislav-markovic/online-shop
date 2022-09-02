const mongoose = require('mongoose');

const Order = mongoose.model(
  'Order',
  new mongoose.Schema({
    userId : String,
    sifra : String,
    datum : String,
    status : String,
    proizvodi : String,
    vendorImg : String,
    listaProizvoda : Array,
  })
);

module.exports = Order;

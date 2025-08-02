const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  _id: { type: String, required: true },
  customer: { type: String, required: true },
  items: [{
    id: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    subtotal: { type: Number, required: true }
  }]
});

module.exports = mongoose.model('Order', orderSchema);
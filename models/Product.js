const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  amountAvailable: { type: Number, default: 0 },
  cost: { type: Number, required: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Product', productSchema);

const mongoose = require('mongoose');

const commissionElementSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, default: 0 },
  amount: { type: Number, default: 1 },
  childrenType: String,
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'commissionElement' }],
});

module.exports = mongoose.model('commissionElement', commissionElementSchema);

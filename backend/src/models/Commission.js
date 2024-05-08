const mongoose = require('mongoose');

const commissionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  progress: { type: Number, default: 0 },
  elements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'commissionElement' }],
});

module.exports = mongoose.model('Commission', commissionSchema);

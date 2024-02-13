const mongoose = require('mongoose');

const WasteSchema = new mongoose.Schema({
  uniqueID: { type: mongoose.Schema.Types.ObjectId, auto: true, index: true },
  description: { type: String },
  IDWasteCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'WasteCategory' }
});

const Waste = mongoose.model('Waste', WasteSchema);

module.exports = Waste;

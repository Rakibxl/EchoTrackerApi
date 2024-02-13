const mongoose = require('mongoose');

const WasteCategorySchema = new mongoose.Schema({
  uniqueID: { type: mongoose.Schema.Types.ObjectId, auto: true, index: true },
  description: { type: String }
});

const WasteCategory = mongoose.model('WasteCategory', WasteCategorySchema);

module.exports = WasteCategory;

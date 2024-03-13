const mongoose = require("mongoose");

const WasteCategorySchema = new mongoose.Schema({
  description: { type: String },
  title: { type: String },
  imageSrc: { type: String },
});

const WasteCategory = mongoose.model("WasteCategory", WasteCategorySchema);

module.exports = WasteCategory;

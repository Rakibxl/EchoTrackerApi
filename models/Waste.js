const mongoose = require("mongoose");

const WasteSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  wasteCategories: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "WasteCategory",
  },
  imageSrc: { type: String },
});

const Waste = mongoose.model("Waste", WasteSchema);

module.exports = Waste;

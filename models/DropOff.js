const mongoose = require("mongoose");

const DropOffSchema = new mongoose.Schema({
  description: { type: String, required: true },
  title: { type: String, required: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  address: { type: String, required: true },
});
const DropOff = mongoose.model("DropOff", DropOffSchema);

module.exports = DropOff;

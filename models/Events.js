const mongoose = require("mongoose");

const EventsSchema = new mongoose.Schema({
  description: { type: String },
  title: { type: String },
  date: { type: String },
  shortDescription: { type: String },
});

const Events = mongoose.model("Events", EventsSchema);

module.exports = Events;

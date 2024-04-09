const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
  description: { type: String },
  title: { type: String },
  imageSrc: { type: String },
});

const News = mongoose.model("News", NewsSchema);

module.exports = News;

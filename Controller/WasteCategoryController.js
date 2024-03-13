const WasteCategory = require("../models/WasteCategory");

const getAllWasteCategories = async (req, res) => {
  try {
    const wasteCategories = await WasteCategory.find({});
    res.json(wasteCategories);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const insertWasteCategory = async (req, res) => {
  try {
    let { title, description } = req.body;
    let img_src;
    if (req.file) {
      img_src =
        req.protocol +
        "://" +
        req.hostname +
        ":" +
        process.env.PORT +
        "/image/" +
        req.file.filename;
    }
    let wasteCategory = new WasteCategory({
      title,
      description,
      imageSrc: img_src,
    });
    await wasteCategory.save();
    res.status(200).send("Waste Category successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const getSingleWasteCategory = async (req, res) => {
  try {
    const wasteCategory = await WasteCategory.findById(req.params.id);
    if (!wasteCategory) {
      return res.status(404).send("WasteCategory not found");
    }
    res.json(wasteCategory);
  } catch (error) {
    // This checks if the error is because of an invalid ObjectId
    if (error.kind === "ObjectId") {
      return res.status(400).send("Invalid ID format");
    }
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllWasteCategories,
  getSingleWasteCategory,
  insertWasteCategory,
};

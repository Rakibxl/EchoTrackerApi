const Waste = require("../models/Waste");

const insertWaste = async (req, res) => {
  try {
    let { title, description, wasteCategoryID } = req.body;
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
    let waste = new Waste({
      wasteCategories: wasteCategoryID,
      title,
      description,
      imageSrc: img_src,
    });

    await waste.save();
    res.status(200).send("Waste created successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const getAllWastes = async (req, res) => {
  try {
    const wastes = await Waste.find();
    res.json(wastes);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getSingleWaste = async (req, res) => {
  try {
    const singleWaste = await Waste.findById(req.params.wasteid).populate(
      "wasteCategories"
    );
    if (!singleWaste) {
      return res.status(404).send("Waste not found");
    }
    res.json(singleWaste);
  } catch (error) {
    // This checks if the error is because of an invalid ObjectId
    if (error.kind === "ObjectId") {
      return res.status(400).send("Invalid ID format");
    }
    res.status(500).send(error.message);
  }
};

module.exports = { insertWaste, getAllWastes, getSingleWaste };

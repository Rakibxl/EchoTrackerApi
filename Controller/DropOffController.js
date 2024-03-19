const DropOff = require("../models/DropOff");

const insertDropOff = async (req, res) => {
  try {
    let { address, description, title, latitude, longitude } = req.body;

    let dropOff = new DropOff({
      title,
      description,
      latitude,
      longitude,
      address,
    });
    await dropOff.save();
    res.status(200).send({
      message: "Drop Off Location Created Successfully",
      data: dropOff,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getAllDropOff = async (req, res) => {
  try {
    const dropOffs = await DropOff.find();
    res.json(dropOffs);
  } catch (error) {
    res.status(500).send(err.message);
  }
};

const getSingleDropOff = async (req, res) => {
  try {
    const singleDropOff = await DropOff.findById(req.params.dropOffId);

    if (!singleDropOff) {
      return res.status(404).send("Drop Off Location Not Found");
    }
    res.status(200).send(singleDropOff);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).send("Invalid ID format");
    }
    res.status(500).send(error.message);
  }
};

module.exports = { insertDropOff, getAllDropOff, getSingleDropOff };

const Address = require("../models/Address");

const getSingleAddress = async (req, res) => {
  try {
    const singleAddress = await Address.findById(req.params.addressid);

    if (!singleAddress) {
      return res.status(404).send("Address Not Found");
    }
    res.status(200).send(singleAddress);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).send("Invalid ID format");
    }
    res.status(500).send(error.message);
  }
};

const getAllAddress = async (req, res) => {
  try {
    const address = await Address.find();
    res.json(address);
  } catch (error) {
    res.status(500).send(err.message);
  }
};

module.exports = { getSingleAddress, getAllAddress };

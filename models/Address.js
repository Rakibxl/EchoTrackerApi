const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  streetName: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  province: { type: String, required: true },
  aptNumber: { type: String, required: false },
  schedule: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Schedule",
      required: false,
    },
  ],
});

const Address = mongoose.model("Address", AddressSchema);

module.exports = Address;

const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
  ScheduleDate: { type: Date, required: true },
  UserID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  AddressId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    required: true,
  },
  IDWasteCategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WasteCategory",
      required: true,
    },
  ],
});

const Schedule = mongoose.model("Schedule", ScheduleSchema);

module.exports = Schedule;

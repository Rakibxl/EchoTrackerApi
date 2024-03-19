const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
  ScheduleDate: { type: Date, required: true },
  wastecategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WasteCategory",
      required: true,
    },
  ],
});

const Schedule = mongoose.model("Schedule", ScheduleSchema);

module.exports = Schedule;

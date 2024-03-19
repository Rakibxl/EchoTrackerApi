const Schedule = require("../models/Schedule");
const Address = require("../models/Address");
const WasteCategory = require("../models/WasteCategory");
const User = require("../models/User");

const getSchedulebyuser = (req, res) => {
  try {
    let { userId } = req.body;

    console.log(req.body);
    User.findById(userId).then((userVal) => {
      Address.findById(userVal.address)
        .populate({
          path: "schedule",
          populate: {
            path: "wastecategories",
            model: WasteCategory,
          },
        })
        .then((addressVal) => {
          res.status(200).send({ address: addressVal });
        });
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getAllSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.find();
    res.json(schedule);
  } catch (error) {
    res.status(500).send(err.message);
  }
};

const insertSchedule = (req, res) => {
  try {
    let { scheduleDate, addressId } = req.body;
    let schedule = new Schedule({
      ScheduleDate: scheduleDate,
    });
    let address = Address.findById(addressId);

    if (!address) {
      res.status(404).send("Address not found!");
    }
    schedule.save().then((response) => {
      Address.findByIdAndUpdate(
        { _id: addressId },
        {
          $push: { schedule: response },
        },
        { new: true }
      )
        .then(() => {
          res.status(200).send({
            message: "Schedule Inserted Successfully",
          });
        })
        .catch((error) => {
          res.status(500).send(error.message);
        });
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addWasteCategorytoSchedule = (req, res) => {
  try {
    let { wasteCategoryID, scheduleID } = req.body;
    let wasteCategory = WasteCategory.findById(wasteCategoryID);

    if (!wasteCategory) {
      res.status(404).send("Waste Category not found!");
    }
    Schedule.findByIdAndUpdate(
      { _id: scheduleID },
      { $push: { wastecategories: wasteCategoryID } },
      { new: true }
    )
      .then(() => {
        res.status(200).send({
          message: "Schedule Inserted Successfully",
        });
      })
      .catch((error) => {
        res.status(500).send(error.message);
      });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
module.exports = {
  getSchedulebyuser,
  insertSchedule,
  getAllSchedule,
  addWasteCategorytoSchedule,
};

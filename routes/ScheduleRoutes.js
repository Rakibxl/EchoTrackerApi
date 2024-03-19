const {
  getAllSchedule,
  insertSchedule,
  addWasteCategorytoSchedule,
  getSchedulebyuser,
} = require("../Controller/ScheduleController");

const router = require("express").Router();

router.get("/", getAllSchedule);
router.post("/", insertSchedule);
router.post("/addwastecategory", addWasteCategorytoSchedule);
router.post("/getbyuser", getSchedulebyuser);

module.exports = router;

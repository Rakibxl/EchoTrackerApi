const {
  getAllDropOff,
  getSingleDropOff,
  insertDropOff,
} = require("../Controller/DropOffController");

const router = require("express").Router();

router.get("/", getAllDropOff);
router.post("/", insertDropOff);
router.get("/:dropOffId", getSingleDropOff);

module.exports = router;

const {
  getSingleAddress,
  getAllAddress,
} = require("../Controller/AddressController");
const router = require("express").Router();
router.get("/:addressid", getSingleAddress);
router.get("/", getAllAddress);

module.exports = router;

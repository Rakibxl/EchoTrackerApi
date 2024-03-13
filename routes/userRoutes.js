const {
  getSingleProfile,
  editSingleProfile,
} = require("../Controller/UserController");

const router = require("express").Router();

router.get("/:userid", getSingleProfile);

router.patch("/:userid", editSingleProfile);

module.exports = router;

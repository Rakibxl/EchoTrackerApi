const {
  getAllWastes,
  getSingleWaste,
  insertWaste,
} = require("../Controller/WasteController");
const fileUpload = require("../misc/imageUpload");

const router = require("express").Router();

router.get("/", getAllWastes);
router.post("/", fileUpload.uploadImage, insertWaste);

router.get("/:wasteid", getSingleWaste);

module.exports = router;

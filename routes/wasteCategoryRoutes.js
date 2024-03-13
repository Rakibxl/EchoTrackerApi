const {
  getAllWasteCategories,
  getSingleWasteCategory,
  insertWasteCategory,
} = require("../Controller/WasteCategoryController");

const fileUpload = require("../misc/imageUpload");
const router = require("express").Router();

router.get("/", getAllWasteCategories);

router.post("/", fileUpload.uploadImage, insertWasteCategory);

router.patch("/:wastecategoryid", getSingleWasteCategory);

module.exports = router;

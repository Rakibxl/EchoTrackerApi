const {
  getAllNews,
  getSingleNews,
  insertNews,
} = require("../Controller/NewsController");
const fileUpload = require("../misc/imageUpload");

const router = require("express").Router();

router.get("/", getAllNews);
router.post("/", fileUpload.uploadImage, insertNews);

router.get("/:newsid", getSingleNews);

module.exports = router;

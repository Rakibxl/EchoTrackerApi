const News = require("../models/News");

const insertNews = async (req, res) => {
  try {
    let { title, description } = req.body;

    let img_src;

    if (req.file) {
      if (process.env.MODE === "DEV") {
        img_src =
          req.protocol +
          "://" +
          req.hostname +
          ":" +
          process.env.PORT +
          "/image/" +
          req.file.filename;
      }
      if (process.env.MODE === "LIVE") {
        img_src =
          req.protocol + "://" + req.hostname + "/image/" + req.file.filename;
      }
    }
    let news = new News({
      title,
      description,
      imageSrc: img_src,
    });
    await news.save();
    res.json({
      news: news,
      message: "news created successfully",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getSingleNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.newsid);

    if (!news) {
      return res.status(404).send("News not found");
    }
    res.json({
      message: "News found",
      news: news,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getAllNews = async (req, res) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
module.exports = { getAllNews, getSingleNews, insertNews };

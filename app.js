const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const PORT = process.env.PORT || 3000;

require("./passport-setup");
require("./models/WasteCategory");
require("./models/Waste");
require("./models/Address");
require("./models/Schedule");
require("./models/DropOff");
require("./models/News");
require("./models/Events");

require("dotenv").config({ path: ".env.development" });

const app = express();
app.use(cors());

// Middleware for body parsing
app.use(bodyParser.json());

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose
  .connect(
    process.env.MODE === "DEV"
      ? process.env.TESTMONGODB_URI
      : process.env.MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const wasteRoutes = require("./routes/wasteRoutes");
const wasteCategoryRoutes = require("./routes/wasteCategoryRoutes");
const dropOffRoutes = require("./routes/dropOffRoutes");
const schedule = require("./routes/ScheduleRoutes");
const address = require("./routes/addressRoutes");
const news = require("./routes/NewsRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/waste", wasteRoutes);
app.use("/api/wastecategory", wasteCategoryRoutes);
app.use("/api/schedule", schedule);
app.use("/api/dropoff", dropOffRoutes);
app.use("/api/address", address);
app.use("/api/news", news);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/image", express.static("image"));

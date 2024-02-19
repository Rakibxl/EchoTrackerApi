const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const WasteCategory = require("../models/WasteCategory");
const Waste = require("../models/Waste");

const router = express.Router();

require("dotenv").config({ path: ".env.development" });

// Register a new user
router.post("/register", async (req, res) => {
  try {
    let { username, password, email, phonenumber, address } = req.body;
    let user = new User({ username, password, email, phonenumber, address });
    await user.save();
    res.status(200).send("User created successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    let { username, password } = req.body;
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid password");
    }

    const token = jwt.sign({ id: user._id }, "your_jwt_secret", {
      expiresIn: "1h",
    });

    res.status(200).json({
      token,
      user: {
        username: user.username,
        userid: user._id,
      },
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/profile/:userid", async (req, res) => {
  try {
    const userId = req.params.userid;
    const user = await User.findById(
      userId,
      "username email phonenumber address"
    ).exec();

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).json({
      username: user.username,
      email: user.email,
      phonenumber: user.phonenumber,
      address: user.address,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("An error occurred while fetching user details.");
  }
});

router.patch("/profile/:userid", async (req, res) => {
  try {
    const { userid } = req.params;
    const { username, email, phonenumber, address } = req.body;
    let updateData = {};

    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (phonenumber) updateData.phonenumber = phonenumber;
    if (address) updateData.address = address;

    const user = await User.findByIdAndUpdate(userid, updateData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        username: user.username,
        email: user.email,
        phonenumber: user.phonenumber,
        address: user.address,
      },
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID); // or your hardcoded clientID
console.log("Google Client Secret:", process.env.GOOGLE_CLIENT_SECRET);

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      // Check if user already exists in your database
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        // If not, create a new user
        user = new User({
          googleId: profile.id,
          username: profile.displayName,
          // Add other fields as per your user model
        });
        await user.save();
      }
      done(null, user);
    }
  )
);

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

router.get("/homes", async (req, res) => {
  try {
    const wastes = await Waste.find().populate("IDWasteCategory");
    res.json(wastes);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/homes/:id", async (req, res) => {
  try {
    const Id = req.params.id;
    const waste = await Waste.findById(Id);
    if (!waste) {
      return res.status(404).send("Waste not found");
    }
    res.json(waste);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect("/home");
  }
);

module.exports = router;

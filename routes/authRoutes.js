const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

require('dotenv').config({ path: '.env.development' });


// Register a new user
router.post("/register", async (req, res) => {
  try {
    let { username, password } = req.body;
    let user = new User({ username, password });
    await user.save();
    res.status(201).send("User created successfully");
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
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID); // or your hardcoded clientID
console.log("Google Client Secret:", process.env.GOOGLE_CLIENT_SECRET);


const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    // Check if user already exists in your database
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      // If not, create a new user
      user = new User({
        googleId: profile.id,
        username: profile.displayName
        // Add other fields as per your user model
      });
      await user.save();
    }
    done(null, user);
  }
));

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


router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/home');
  });


  

module.exports = router;

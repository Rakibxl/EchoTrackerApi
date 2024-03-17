const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Address = require("../models/Address");

require("dotenv").config({ path: ".env.development" });

const registerUser = async (req, res) => {
  try {
    let {
      firstName,
      lastName,
      password,
      email,
      phonenumber,
      streetName,
      postalCode,
      city,
      province,
      aptNumber,
    } = req.body;

    let user = new User({
      firstName,
      password,
      email,
      phonenumber,
      lastName,
    });
    let address = new Address({
      aptNumber,
      city,
      province,
      postalCode,
      streetName,
    });
    await address.save().then((res) => {
      console.log(res._id);
      user.address = res._id;
      user.save();
    });
    // await user.save();
    res.status(200).send("User created successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email });
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
        username: user.firstName,
        userid: user._id,
      },
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  registerUser,
  loginUser,
};

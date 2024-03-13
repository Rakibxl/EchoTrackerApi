const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, unique: false, sparse: true },
  lastName: { type: String, unique: false, sparse: true },
  password: { type: String },
  googleId: { type: String, unique: false, sparse: true },
  email: { type: String, unique: true, sparse: true },
  phonenumber: { type: String, unique: true },
  // address: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Address",
  // },
  streetName: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  province: { type: String, required: true },
  aptNumber: { type: String },
});

// Password hashing middleware, only if password is provided
UserSchema.pre("save", async function (next) {
  if (this.isModified("password") && this.password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
  }
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;

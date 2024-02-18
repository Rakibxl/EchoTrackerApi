const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, sparse: true }, 
  password: { type: String }, 
  googleId: { type: String, unique: true, sparse: true }, 
  email: { type: String, unique: true, sparse: true },
  phonenumber: {type: String, default: ''},
  address: {type: String, default: ''} 
});

// Password hashing middleware, only if password is provided
UserSchema.pre('save', async function(next) {
  if (this.isModified('password') && this.password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
  }
  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;

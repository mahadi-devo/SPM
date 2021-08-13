const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    trim: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    select: false,
  },
  role: {
    type: String,
    enum: ['seller', 'buyer'],
    default: 'buyer',
  },
  cartItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'product',
    },
  ],
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.getJwtToken = async function () {
  return await jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.comparePass = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('user', UserSchema);

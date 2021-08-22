const UserModal = require('../models/user.model');
const ApiError = require('../utils/apiError');

const addUser = async (req, res) => {
  try {
    const { email, name, role, password, mobile, department } = req.body;
    const userExist = await UserModal.findOne({ email });
    if (userExist) {
      return next(new ApiError('User is exist with provided email', 400));
    }
    const user = await UserModal.create({
      email,
      name,
      role,
      password,
      mobile,
      department,
    });
    await sendToken(user, 200, res);
  } catch (e) {
    if (e.status) {
      console.log(e);
    }
    res.status(500).json({
      success: false,
      msg: e.message,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await UserModal.find();
    res.json(users);
  } catch (e) {
    if (e.status) {
      console.log(e);
    }
    res.status(500).json({
      success: false,
      msg: e.message,
    });
  }
};

module.exports = {
  addUser,
  getAllUser,
};

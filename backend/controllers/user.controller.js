const UserModal = require('../models/user.model');
const ApiError = require('../utils/apiError');

const addUser = async (req, res, next) => {
  console.log(req.body);

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
    res.json({
      user,
    });
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
    const users = await UserModal.find({ role: 2 });
    res.status(200).json({
      users,
      success: true,
    });
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

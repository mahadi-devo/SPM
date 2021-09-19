const UserModal = require('../models/user.model');
const ApiError = require('../utils/apiError');

const addUser = async (req, res, next) => {
  try {
    const { email, name, role, password, mobile, department } = req.body;

    //console.log('backend', req.body);
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
    res.status(200).json({
      success: true,
      user,
    });
  } catch (e) {
    if (e.status) {
      console.log(e);
    }
    return new ApiError(e.message, 500);
  }
};

const updateUser = async (req, res, next) => {
  console.log(req.body);

  try {
    const { _id, name, role, password, mobile, department } = req.body;
    const userExist = await UserModal.findOne({ _id });
    if (!userExist) {
      return next(new ApiError('!User does not exist in the system', 400));
    }
    const user = await UserModal.findByIdAndUpdate(
      _id,
      {
        $set: {
          name,
          role,
          password,
          mobile,
          department,
        },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      user,
    });
  } catch (e) {
    if (e.status) {
      console.log(e);
    }
    return new ApiError(e.message, 500);
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await UserModal.find({ role: 2 }).sort({ createdAt: -1 });
    res.status(200).json({
      users,
      success: true,
    });
  } catch (e) {
    if (e.status) {
      console.log(e);
    }
    return new ApiError(e.message, 500);
  }
};

const deleteUser = async (req, res) => {
  console.log('deleeeee');
  try {
    const { _id } = req.body;

    console.log(_id);

    const user = await UserModal.findByIdAndRemove(_id);
    res.status(200).json({
      success: 200,
      user,
    });
  } catch (e) {
    if (e.status) {
      console.log(e);
    }
    return new ApiError(e.message, 500);
  }
};

module.exports = {
  addUser,
  getAllUser,
  updateUser,
  deleteUser,
};

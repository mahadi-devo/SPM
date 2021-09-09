const User = require("../models/user.model");
const ApiError = require("../utils/apiError");

const registerController = async (req, res, next) => {
  try {
    const { email, name, role, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return next(new ApiError("User is exist with provided email", 400));
    }
    const user = await User.create({ email, name, role, password });
    await sendToken(user, 200, res);
  } catch (e) {
    if (e.status) {
      console.log(e);
    }
    return next(new ApiError(e.message, 500));
  }
};

const loginController = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userExist = await User.findOne({ email }).select("+password");
    if (!userExist) {
      return next(new ApiError("User is not exist", 400));
    }
    await sendToken(userExist, 200, res);
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

const getUserController = async (req, res) => {
  try {
    console.log(req);

    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

const logoutController = async (req, res, next) => {
  try {
    res.cookie("JwtToken", "none", {
      expires: new Date(Date.now() + 10 * 1000),
    });

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

const sendToken = async (user, statusCode, res) => {
  const token = await user.getJwtToken();

  res.status(statusCode).json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      role: user.role,
      email: user.email,
    },
    token,
  });
};

module.exports = {
  registerController,
  loginController,
  logoutController,
  getUserController,
};

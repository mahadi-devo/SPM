const UserModal = require('../models/user.model');
const ApiError = require('../utils/apiError');
const pdf = require('html-pdf');
const { userPdfTemplate } = require('../utils/userPdfTemplate');

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
    console.log(
      '🚀 ~ file: user.controller.js ~ line 38 ~ updateUser ~ _id',
      _id
    );
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
    const { keyword, sortby = '', orderby = -1 } = req.query;
    let quary;
    switch (sortby) {
      case 'name':
        quary = { name: orderby };
        break;
      case 'email':
        quary = { email: orderby };
        break;
      case 'department':
        quary = { department: orderby };
        break;
      default:
        quary = { createdAt: -1 };
        break;
    }
    let users;
    if (keyword) {
      var re = new RegExp(keyword, 'i');
      users = await UserModal.find({ role: 2, name: re })
        .sort(quary)
        .collation({ locale: 'en' });
    } else {
      users = await UserModal.find({ role: 2 })
        .sort(quary)
        .collation({ locale: 'en' });
    }
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
  try {
    const { _id } = req.body;

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

const generateReport = async (req, res) => {
  const user = await UserModal.find();
  pdf
    .create(userPdfTemplate({ user }), {})
    .toFile('allUserReport.pdf', (err, result) => {
      if (err) {
        res.send(Promise.reject());
      }
      // console.log(result);
      res.send(Promise.resolve());
    });
};

const fetchReport = (req, res) => {
  console.log('Fileee');
  res.sendFile(
    `F:/Year 3 Semester 2/Software Project Managment/spm_ticketing_project/SPM/allUserReport.pdf`
  );
};

module.exports = {
  addUser,
  getAllUser,
  updateUser,
  deleteUser,
  generateReport,
  fetchReport,
};

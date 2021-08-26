const Department = require('../models/department.model');
const ApiError = require('../utils/apiError');

const getDepartment = async (req, res) => {
  console.log('in');
  try {
    const department = await Department.find();
    res.status(200).json({
      department,
      success: true,
    });
  } catch (e) {
    if (e.status) {
      console.log(e);
    }
    return next(new ApiError(e.message, 500));
  }
};

const addDepartment = async (req, res) => {
  console.log('department :');
  try {
    const { departmentId, departmentName, manager, desctiption } = req.body;

    const departmentExist = await Department.findOne({ departmentId });

    if (departmentExist) {
      return new ApiError('department is exist with provided email', 400);
    }

    const department = await Department.create({
      departmentId,
      departmentName,
      manager,
      desctiption,
    });

    console.log('department :', department);
    res.status(200).json({
      success: true,
      department,
    });
  } catch (e) {
    if (e.status) {
      console.log(e);
    }
    console.log(e);
    return new ApiError(e.message, 500);
  }
};

module.exports = { getDepartment, addDepartment };

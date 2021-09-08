const Department = require('../models/department.model');
const ApiError = require('../utils/apiError');

const getDepartment = async (req, res) => {
  try {
    const { keyword, sortby='', orderby = -1 } = req.query;
    console.log("🚀 ~ file: department.controller.js ~ line 7 ~ getDepartment ~ sortby", sortby)
    console.log("🚀 ~ file: department.controller.js ~ line 7 ~ getDepartment ~ orderby", orderby)
    let quary;
    switch (sortby) {
      case 'departmentId':
        quary = { departmentId: orderby };
        break;
      case 'departmentName':
        quary = { departmentName: orderby };
        break;
      case 'manager':
        quary = { manager: orderby };
        break;
      default:
        quary = { createdAt: -1 };
        break;
    }
    let department;
    console.log("🚀 ~ file: department.controller.js ~ line 26 ~ getDepartment ~ keyword", keyword)
    if (keyword) {
      var re = new RegExp(keyword,"i");
      department = await Department.find({departmentName: re}).collation({locale:'en'}).sort(quary);
    } else {
      console.log("🚀 ~ file: department.controller.js ~ line 26 ~ getDepartment ~ quary", quary)
      department = await Department.find().collation({locale:'en'}).sort(quary);
    }
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

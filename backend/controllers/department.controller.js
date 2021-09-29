const Department = require('../models/department.model');
const Ticket = require('../models/ticket.model');
const ApiError = require('../utils/apiError');

const getDepartment = async (req, res) => {
  try {
    const { keyword, sortby = '', orderby = -1 } = req.query;
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
    if (keyword) {
      var re = new RegExp(keyword, 'i');
      department = await Department.find({ departmentName: re })
        .collation({ locale: 'en' })
        .sort(quary);
    } else {
      department = await Department.find()
        .collation({ locale: 'en' })
        .sort(quary);
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
  try {
    const { departmentId, departmentName, manager, description } = req.body;

    const departmentExist = await Department.findOne({ departmentId });

    if (departmentExist) {
      return new ApiError('department is exist with provided email', 400);
    }

    const department = await Department.create({
      departmentId,
      departmentName,
      manager,
      description,
    });

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

const updateDepartment = async (req, res) => {
  try {
    const { _id, departmentId, departmentName, manager, description } =
      req.body;

    const departmentExist = await Department.findById(_id);

    if (!departmentExist) {
      return new ApiError('department dose not exist in the system', 400);
    }

    const department = await Department.findByIdAndUpdate(
      _id,
      {
        $set: {
          departmentId,
          departmentName,
          manager,
          description,
        },
      },
      { new: true }
    );

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

const deleteDepartment = async (req, res) => {
  try {
    const { _id } = req.body;

    const department = await Department.findByIdAndRemove(_id);

    res.status(200).json({
      department,
      success: true,
    });
  } catch (e) {
    if (e.status) {
      console.log(e);
    }
    console.log(e);
    return new ApiError(e.message, 500);
  }
};

const getTicketOfDepartment = async (req, res) => {
  try {
    const {_id} = req.body;
    console.log("🚀 ~ file: department.controller.js ~ line 134 ~ getTicketOfDepartment ~ id", _id)
    const tickets = await Ticket.find({department: _id}).populate("department");
    res.status(200).json({ tickets });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getDepartment, addDepartment, updateDepartment, deleteDepartment, getTicketOfDepartment };

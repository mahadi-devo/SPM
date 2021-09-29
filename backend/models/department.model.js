const mongoose = require("mongoose");

const DepartmentSchema = mongoose.Schema({
  departmentId: {
    type: String,
    required: true,
  },
  departmentName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  manager: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  users: [
    { type: mongoose.Schema.Types.ObjectId, required: false, ref: "user" },
  ],
});

module.exports = mongoose.model("department", DepartmentSchema);

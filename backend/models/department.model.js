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
  manager: {
    type: String,
    required: true,
  },
  users: [
    { type: mongoose.Schema.Types.ObjectId, required: false, ref: "user" },
  ],
});

module.exports = mongoose.model("department", DepartmentSchema);

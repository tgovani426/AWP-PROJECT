const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
    employee_name: {
    type: String
  },
  email: {
    type: String
  },
  phone_no: {
    type: Number
  },
  employee_number: {
    type: String
  },
  department: {
    type: String
  },
  emp_salary: {
    type: Number
  },
  DOB: {
    type: Date,
    default: Date.now
  }
});

const staff = mongoose.model("Staff", staffSchema);
module.exports = staff;

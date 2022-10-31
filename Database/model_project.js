const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projname: {
    type: String,
  },
  clientmgr: {
    type: String,
  },
  clientcompanynm: {
    type: String,
  },
  email: {
    type: String,
  },
  projectid: {
    type: String,
  },
  projectmgr: {
    type: String,
  },
  department: {
    type: String,
  },
  budget: {
    type: String,
  },
  DOB: {
    type: Date,
    default: Date.now,
  }
});

const project = mongoose.model("Project", projectSchema);
module.exports = project;

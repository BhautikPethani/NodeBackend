const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const taskSchema = new Schema({
  taskName: String,
  description: String,
  startDate: String,
  endDate: String,
  participants: [Object],
  dependantID: String,
  workspaceID: String,
  status: Number,
});

module.exports = mongoose.model("Task", taskSchema);

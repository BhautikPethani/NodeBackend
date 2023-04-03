const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const workspaceSchema = new Schema({
  workspaceName: String,
  participants: [String],
  owner: String,
});

module.exports = mongoose.model("Workspace", workspaceSchema);

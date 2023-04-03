const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  userName: String,
  password: String,
  confirmPassword: String,
});

module.exports = mongoose.model("User", userSchema);

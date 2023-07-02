const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  status: {
    type: String,
    default: "active",
  },
  token: String
},{ timestamps: true });
const Users = mongoose.model("User", userSchema);

module.exports = Users;

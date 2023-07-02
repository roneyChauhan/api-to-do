const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  priority : {
    type: String,
    enum:['low','medium','high'],
    default: "low",
  },
  taskStatus : {
    type: String,
    enum:['pending','complete'],
    default: "pending",
  },
  status: {
    type: String,
    enum:['active','deleted'],
    default: "active",
  },
});
const Task = mongoose.model("task", taskSchema);

module.exports = Task;

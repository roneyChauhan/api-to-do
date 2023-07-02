const {mongoose, Schema} = require("mongoose");

const taskSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: String,
  description: String,
  dueDate:Date,
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

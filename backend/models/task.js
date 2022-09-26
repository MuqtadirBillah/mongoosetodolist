var mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    task: {
      type: String,
      unique: true,
      required: [true, 'Task name cannot be empty']
    },
    taskStatus: {
      type: String,
      default: "pending",
      required: [true, 'Status cannot be empty']
    },
    folder: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', required: true },
    creation_date: {
      type: String
    },
    updation_date: {
      type: String
    }
})

module.exports = mongoose.model('Task', taskSchema);

var mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
    name: {
      type: String,
      unique: true,
      required: [true, 'Folder name cannot be empty']
    },
    // task: [taskSchema],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    creation_date: {
      type: String
    },
    updation_date: {
      type: String
    }
})

module.exports = mongoose.model('Folder', folderSchema);

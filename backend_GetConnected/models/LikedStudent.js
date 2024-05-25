const mongoose = require('mongoose');

const LikedStudentSchema = new mongoose.Schema({
  User: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
}, { timestamps: true });

module.exports = mongoose.model('LikedStudent', LikedStudentSchema);
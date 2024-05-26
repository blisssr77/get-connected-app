const mongoose = require('mongoose');

const LikedStudentSchema = new mongoose.Schema({
  User: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
}, { timestamps: true });

module.exports = mongoose.model('LikedStudent', LikedStudentSchema);
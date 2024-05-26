const { default: mongoose } = require('mongoose');
const User = require('./User');


const likedStudentSchema = new mongoose.Schema({
  User: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student'},
}, { timestamps: true });

module.exports = mongoose.model('LikedStudent', likedStudentSchema);

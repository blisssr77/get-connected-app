const { default: mongoose } = require('mongoose');
const User = require('./User');
const Student = require('./Student');
const Freelancer = require('./Freelancer');

CommentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    User: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    Student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    Freelancer: { type: mongoose.Schema.Types.ObjectId, ref: 'Freelancer' },
});

module.exports = mongoose.model('Comment', CommentSchema);
    
const { default: mongoose } = require('mongoose');
const User = require('./User');
const Student = require('./Student');
const Freelancer = require('./Freelancer');

CommentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    User: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    S
    // Post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }
});

module.exports = mongoose.model('Comment', CommentSchema);
    
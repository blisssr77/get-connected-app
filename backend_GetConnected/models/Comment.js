const { default: mongoose } = require('mongoose');
const User = require('./User');

CommentSchema = new mongoose.Schema({
    comment: { type: String, required: true },
    User: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // Post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }
});

module.exports = mongoose.model('Comment', CommentSchema);
    
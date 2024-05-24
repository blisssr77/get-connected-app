const { default: mongoose } = require('mongoose');
const User = require('./User');

const studentSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    age: { type: Number, required: true },
    career: { type: String, required: true },
    hobby: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    photo: { type: String, required: false },
    User: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}

});

module.exports = mongoose.model('Student', studentSchema);


// User: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true},

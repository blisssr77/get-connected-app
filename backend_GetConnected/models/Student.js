const { default: mongoose } = require('mongoose');

const studentSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    age: { type: Number, required: true },
    career: { type: String, required: true },
    hobby: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    photo: { type: String, required: false },
});

module.exports = mongoose.model('Student', studentSchema);
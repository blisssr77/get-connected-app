const { default: mongoose } = require('mongoose');

const freelancerSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    age: { type: Number, required: true },
    career: { type: String, required: true },
    hobby: { type: String, required: true },
    degree: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    experience: { type: String, required: true },
});

module.exports = mongoose.model('Freelancer', freelancerSchema);
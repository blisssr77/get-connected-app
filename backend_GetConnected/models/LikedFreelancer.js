const { default: mongoose } = require('mongoose');
const User = require('./User');

const likedFreelancerSchema = new mongoose.Schema({
  User: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Freelancer'},
}, { timestamps: true });

module.exports = mongoose.model('LikedFreelancer', likedFreelancerSchema);
const LikedFreelancer = require('../models/LikedFreelancer');
const db = require('../models');

// Controller to fetch liked freelancers for a user
const getLikedFreelancers = async (req, res) => {
    const userId = req.user.id;
  
    try {
      const likedFreelancers = await LikedFreelancer.find({ User: userId }).populate('freelancerId');
      console.log(db.User, " <-- this is db.User FROM LIKEDFREELANCER")
      res.status(200).json(likedFreelancers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

// Controller to handle liking a freelancer
const likeFreelancer = async (req, res) => {
    const { freelancerId } = req.body;
    const userId = req.user.id;

    try {
      console.log(`User ${userId} is trying to like freelancer ${freelancerId}`);
  
      // Check if the freelancer is already liked by the user
      const existingLike = await LikedFreelancer.findOne({ User: userId, freelancerId });
      if (existingLike) {
        return res.status(400).json({ message: 'Freelancer already liked' });
      }

      const newLikedFreelancer = new LikedFreelancer({ freelancerId, User: userId });
      await newLikedFreelancer.save();

      // Populate the freelancer details in the response
      const populatedLikedFreelancer = await LikedFreelancer.findById(newLikedFreelancer._id).populate('freelancerId');
  
      res.status(201).json(populatedLikedFreelancer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

// Controller to delete a liked freelancer
const deleteLikedFreelancer = async (req, res) => {
  const { freelancerId } = req.params;

  try {
      const likedFreelancer = await LikedFreelancer.findOneAndDelete({ freelancerId });

      if (!likedFreelancer) {
          return res.status(404).json({ message: 'Liked freelancer not found' });
      }

      res.status(200).json({ message: 'Liked freelancer deleted successfully' });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

module.exports = {
    likeFreelancer,
    getLikedFreelancers,
    deleteLikedFreelancer,
};
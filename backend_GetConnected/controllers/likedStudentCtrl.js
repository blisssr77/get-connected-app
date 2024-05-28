const LikedStudent = require('../models/LikedStudent');
const db = require('../models');

// Controller to fetch liked students for a user
const getLikedStudents = async (req, res) => {
    const userId = req.user.id;
  
    try {
      const likedStudents = await LikedStudent.find({ User: userId }).populate('studentId');
      res.status(200).json(likedStudents);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

// Controller to handle liking a student
const likeStudent = async (req, res) => {
    const { studentId } = req.body;
    const userId = req.user.id;
    try {
      console.log(`User ${userId} is trying to like student ${studentId}`);
  
      // Check if the student is already liked by the user
      const existingLike = await LikedStudent.findOne({ User: userId, studentId });
      if (existingLike) {
        return res.status(400).json({ message: 'Student already liked' });
      }

      const newLikedStudent = new LikedStudent({ studentId, User: userId });
      await newLikedStudent.save();

      // Populate the student details in the response
      const populatedLikedStudent = await LikedStudent.findById(newLikedStudent._id).populate('studentId');
    
      res.status(201).json(existingLike);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};

// Controller to delete a liked student
const deleteLikedStudent = async (req, res) => {
  const { studentId } = req.params;

  try {
    const likedStudent = await LikedStudent.findOneAndDelete({ studentId });

    if (!likedStudent) {
      return res.status(404).json({ message: 'Liked student not found' });
    }

    res.status(200).json({ message: 'Liked student deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

  
  module.exports = {
    likeStudent,
    getLikedStudents,
    deleteLikedStudent,
  };